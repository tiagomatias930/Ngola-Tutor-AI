import {Router} from 'express';
import {rateLimit} from 'express-rate-limit';
import type {RouteContext} from '../http/context.js';
import {asyncHandler} from '../http/errors.js';
import {studentSession, telemetryFrom} from '../http/request.js';
import {validateInput, validateOutput} from '../safety.js';
import {chatSchema, imageSchema, validateBody, voiceSchema} from '../schemas.js';
import {saveConversation, type StoredMessage} from '../data-store.js';
import {buildStudentProfileSupplement} from '../tutor-prompt.js';

export function chatRoutes({store, gemini, telemetry}: RouteContext): Router {
  const router = Router();
  const aiLimiter = rateLimit({
    windowMs: 60_000,
    limit: 30,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res) =>
      res.status(429).json({error: {code: 'RATE_LIMITED', message: 'AI request limit exceeded'}}),
  });

  router.post('/chat', aiLimiter, validateBody(chatSchema), asyncHandler(async (req, res) => {
    const started = Date.now();
    const sessionId = studentSession(req);
    const body = req.body as typeof chatSchema._output;
    const userText =
      body.message?.trim() ||
      (body.fileData ? `Analisa este ficheiro: ${body.fileData.name}` : 'Please analyze this image.');
    const safety = validateInput(userText);
    if (!safety.safe) {
      const response = safety.response ?? 'Request blocked by safety policy.';
      await saveConversation(store, sessionId, userText, response);
      telemetry.trackSession(sessionId, req, {
        tokensUsed: telemetry.estimateTokens(userText + response),
        ...telemetryFrom(body),
      });
      telemetry.recordRequest(Date.now() - started);
      res.json({sessionId, response, generatedImage: null, generatedImageMime: null, imageCaption: null});
      return;
    }

    const history = (await store.getRecentMessages(sessionId, 30)).map(message => ({
      role: message.role,
      text: message.text,
    }));
    const raw = await gemini.generateText({
      prompt: userText,
      imageBase64: body.image,
      history,
      fileData: body.fileData,
      instruction: buildStudentProfileSupplement(body.studentContext),
      search: body.search,
    });
    const response = validateOutput(raw, userText).response;
    let generatedImage = null;
    if (body.generateImage === true) {
      generatedImage = await gemini.generateImage(userText.slice(0, 500), response);
    }
    await saveConversation(store, sessionId, userText, response);
    const promptTokens = telemetry.estimateTokens(userText);
    const completionTokens = telemetry.estimateTokens(response);
    telemetry.trackSession(sessionId, req, {
      tokensUsed: promptTokens + completionTokens,
      promptTokens,
      completionTokens,
      ...telemetryFrom(body),
    });
    telemetry.recordRequest(Date.now() - started);
    res.json({
      sessionId,
      response,
      generatedImage: generatedImage?.imageBase64 ?? null,
      generatedImageMime: generatedImage?.mimeType ?? null,
      imageCaption: generatedImage?.caption ?? null,
    });
  }));

  router.post('/generate-image', aiLimiter, validateBody(imageSchema), asyncHandler(async (req, res) => {
    const sessionId = studentSession(req);
    const result = await gemini.generateImage(req.body.concept, req.body.context);
    telemetry.trackSession(sessionId, req, {...telemetryFrom(req.body), tokensUsed: 120});
    res.json({...result, sessionId});
  }));

  router.post('/save-voice', validateBody(voiceSchema), asyncHandler(async (req, res) => {
    const sessionId = studentSession(req);
    const timestamp = new Date().toISOString();
    const messages: StoredMessage[] = req.body.messages.map(
      (message: {role: 'user' | 'assistant'; text: string}) => ({...message, timestamp, source: 'voice'})
    );
    await store.appendMessages(sessionId, messages);
    telemetry.trackSession(sessionId, req, {
      tokensUsed: telemetry.estimateTokens(messages.map(message => message.text).join(' ')),
      ...telemetryFrom(req.body),
    });
    res.json({sessionId, saved: messages.length});
  }));

  return router;
}
