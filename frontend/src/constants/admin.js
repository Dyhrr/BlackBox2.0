// Centralized admin-security configuration for the frontend
export const DEV_ADMIN = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEV_ADMIN === 'true'

// Comma-separated list of Discord IDs, e.g. VITE_ADMIN_IDS="123,456,789"
const fromEnv = (import.meta.env.VITE_ADMIN_IDS || '').split(',').map(s => s.trim()).filter(Boolean)
const defaults = ['344538646457876481','720053524620378134','303898072860065792']
export const ALLOWED_ADMIN_IDS = (fromEnv.length ? fromEnv : defaults)

