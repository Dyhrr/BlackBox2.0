# Copilot Instructions for BlackBox2.0

## Project Architecture
- **Backend:** Django (see `backend/`). Main entry: `manage.py`, config: `blackbox/settings.py`, API: `api/views.py`, URLs: `api/urls.py`.
- **Frontend:** React + Vite + Tailwind (see `frontend/`). Main entry: `src/main.jsx`, routing: `src/App.jsx`, navigation: `src/components/NavBar.jsx`.
- **Static Assets:** Served from `backend/static/` and `frontend/public/`.
- **Database:** SQLite for dev (`backend/db.sqlite3`).

## Developer Workflows
- **Backend:**
  - Install: `pip install -r requirements.txt` (in `backend/`)
  - Migrate: `python manage.py migrate`
  - Run: `python manage.py runserver`
- **Frontend:**
  - Install: `npm install` (in `frontend/`)
  - Run: `npm run dev`
- **Promo Codes:** Redeem via homepage (`src/pages/Home.jsx`).
- **Admin Panel:** Accessible only to whitelisted Discord IDs (see `NavBar.jsx`).

## Patterns & Conventions
- **React:**
  - Use functional components and hooks (`useState`, `useEffect`).
  - Navigation via React Router (`NavLink`, `Route`).
  - Mobile nav uses a drawer pattern (`NavBar.jsx`).
- **Django:**
  - API endpoints in `api/views.py`, registered in `api/urls.py`.
  - Settings in `blackbox/settings.py`.
- **Styling:**
  - Tailwind CSS for all UI. Custom tokens in `frontend/src/styles/tokens.css`.
  - Use semantic HTML and accessibility best practices.

## Integration Points
- **Frontend ↔ Backend:**
  - API requests from React to Django at `/api/*` endpoints.
  - Static files served via Django for production, Vite for dev.
- **Discord:**
  - Discord IDs used for admin access and promo eligibility.

## Key Files & Directories
- `backend/blackbox/settings.py`: Django config
- `backend/api/views.py`: API logic
- `frontend/src/App.jsx`: React app entry/routing
- `frontend/src/components/NavBar.jsx`: Navigation logic
- `frontend/src/pages/Home.jsx`: Promo code logic
- `frontend/src/styles/tokens.css`: Design tokens

## Example: Adding a Raffle
- Backend: Add logic to `api/views.py`, register endpoint in `api/urls.py`.
- Frontend: Add UI in `src/pages/Raffles.jsx`, update navigation in `NavBar.jsx`.

## Notes
- Always check Discord ID logic for admin features.
- Use Tailwind classes for all UI changes.
- Keep API endpoints RESTful and documented in code comments.

---

If any section is unclear or missing, please provide feedback for improvement.
