<!--
Key changes:
- Rewritten README with concise ops doc for dev/prod, ENV, and commands.
-->
# BlackBox2.0

## Overview
Django 5 backend + React (Vite) frontend. Dev uses Vite on 5173 and Django on 8000. In production, Django serves the built assets with WhiteNoise.

## Prereqs
- Python 3.12+
- Node.js 20+
- Docker (for production run via compose)

## ENV
Copy `.env.example` to `.env` and set:
- `DJANGO_SECRET_KEY`: required in production
- `DJANGO_DEBUG`: `true` (dev) or `false` (prod)
- `DJANGO_ALLOWED_HOSTS`: comma-separated hostnames
- `CSRF_TRUSTED_ORIGINS`: comma-separated origins, e.g. `https://example.com`
- `DATABASE_URL`: e.g. `postgres://user:pass@host:5432/dbname` or `mysql://...`
- `ALLOW_ADMIN`: `true` to expose Django admin when not in DEBUG

Frontend dev toggles (optional):
- `VITE_SHOW_DEV_PANEL`, `VITE_ENABLE_DEV_ADMIN`, `VITE_ADMIN_IDS`

## Dev
Use two terminals.
- Terminal 1 (frontend):
  - `cd frontend && npm ci && npm run dev`
- Terminal 2 (backend):
  - `cd backend && pip install -r requirements.txt`
  - `python manage.py migrate` (optional for dev/sqlite)
  - `python manage.py runserver 0.0.0.0:8000`

The Django template loads Vite HMR in dev, so hitting `http://localhost:8000` shows the app.

## Prod
Build and run with Docker Compose (includes optional Postgres):
- `docker-compose up --build`
- App: `http://localhost:8000`

On boot, the container runs `migrate` and serves `blackbox.asgi:application` via uvicorn. Static files are built by Vite and collected to `backend/staticfiles`.

## Commands
- Frontend build: `cd frontend && npm run build`
- Collect static: `cd backend && python manage.py collectstatic --noinput`
- Django checks: `cd backend && python manage.py check`
- DB schema (PostgreSQL): `database/schema.sql`
- DB schema (MySQL): `database/schema.mysql.sql`

## Deployment Notes
- Set `DJANGO_DEBUG=false` and provide a valid `DATABASE_URL`.
- Configure `DJANGO_ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`.
- Static files are served by WhiteNoise from `/static/`.
- Admin is disabled unless `ALLOW_ADMIN=true` or `DJANGO_DEBUG=true`.
- Database URLs:
  - Postgres: `postgres://user:pass@host:5432/dbname`
  - MySQL: `mysql://user:pass@host:3306/dbname`
- Attaching to an existing DB: `python manage.py migrate --fake-initial`
