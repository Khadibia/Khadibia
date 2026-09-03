# Build static frontend
FROM node:20-slim AS frontend-builder

WORKDIR /build

COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm install --no-audit --no-fund

COPY content ./content
COPY frontend ./frontend

RUN cd frontend && node scripts/sync-content.mjs && npm run build

# Runtime: FastAPI + static UI
FROM python:3.11-slim

WORKDIR /app

COPY agent/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY agent/ ./agent/
COPY content/ ./content/
COPY --from=frontend-builder /build/frontend/out ./static

ENV CONTENT_DIR=/app/content
ENV STATIC_DIR=/app/static
ENV PORT=8080

WORKDIR /app/agent

EXPOSE 8080

CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT:-8080}"]
