# Key changes:
# - Multi-stage build: build frontend, then Django app image.
# - Collect static and run with uvicorn.

# ---------- Frontend build ----------
FROM node:20-bullseye-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---------- Backend runtime ----------
FROM python:3.12-slim AS app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1
WORKDIR /app

# System deps (minimal)
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl \
 && rm -rf /var/lib/apt/lists/*

# Copy backend and requirements
COPY backend/ /app/backend/
WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend into repo layout so collectstatic can find it
COPY --from=frontend-builder /app/frontend/dist /app/backend/frontend/dist

# Collect static
RUN python manage.py collectstatic --noinput

# Expose and run
EXPOSE 8000
CMD ["sh", "-c", "python manage.py migrate --noinput && uvicorn blackbox.asgi:application --host 0.0.0.0 --port 8000"]
