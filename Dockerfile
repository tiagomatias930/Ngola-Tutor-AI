# ─── Ngola Tutor - Google Cloud Run Dockerfile ───────────────────────────────
# Multi-stage build: builds frontend + backend, then creates a minimal image
# Deploy with: gcloud run deploy (see deploy.sh)

# Stage 1: Build the React frontend with Vite
FROM node:20-slim AS frontend-build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Build the backend (TypeScript → JavaScript) and prune dev deps
FROM node:20-slim AS backend-build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY server/ ./server/
RUN npm run build:server && npm prune --omit=dev

# Stage 3: Production image
FROM node:20-slim AS production
WORKDIR /app

COPY --from=backend-build /app/package.json ./package.json
COPY --from=backend-build /app/node_modules ./node_modules
COPY --from=backend-build /app/server/dist ./server/dist
COPY --from=frontend-build /app/dist ./dist

# Cloud Run sets PORT automatically (default 8080)
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

# Start the backend server (which also serves the frontend static files)
CMD ["node", "server/dist/index.js"]
