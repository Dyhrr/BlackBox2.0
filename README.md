# BlackBox2.0

## Overview
BlackBox2.0 is a raffle and instant win platform built with Django (backend) and React (frontend).

## Setup

### Backend (Django)
1. Install Python 3.10+ and pip.
2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```
4. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)
1. Install Node.js (v18+ recommended).
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- Access the frontend at `http://localhost:5173` (or as shown in terminal)
- Backend API runs at `http://localhost:8000`
- Raffles, games, and winners are available via the navigation bar
- Promo codes can be redeemed on the homepage

## Contribution Guidelines
1. Fork the repository and create a new branch for your feature or bugfix.
2. Follow code style and naming conventions.
3. Write tests for new features.
4. Submit a pull request with a clear description of your changes.
5. For issues, use the GitHub Issues tab and provide detailed steps to reproduce.

## Security & Production
- Set environment variables for Django secrets:
  - `DJANGO_SECRET_KEY` (required)
  - `DJANGO_DEBUG` (set to `False` for production)
  - `DJANGO_ALLOWED_HOSTS` (comma-separated, e.g. `blackbox.com,www.blackbox.com`)
  - `DJANGO_CORS_ALLOWED_ORIGINS` (comma-separated, e.g. `https://blackbox.com`)
- Never use DEBUG=True or hardcoded secrets in production.
- Always use HTTPS and secure your server.

### Frontend admin controls
- `VITE_ENABLE_DEV_ADMIN` (default off in prod): when `true`, enables Admin route and simulated login for development.
- `VITE_ADMIN_IDS` (comma-separated Discord IDs): whitelist allowed to access Admin, e.g. `VITE_ADMIN_IDS=123,456,789`.
- Optional: `VITE_ADMIN_USERS` (JSON array for dev test login), e.g. `[{"username":"dev","password":"dev"}]`. Only used when dev admin is enabled.

## Accessibility & SEO
- The frontend is designed with accessibility and SEO in mind. Please report any issues or suggestions.
