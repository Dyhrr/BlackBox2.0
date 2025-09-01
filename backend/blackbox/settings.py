"""
Key changes:
- Env-driven settings (DATABASE_URL via dj_database_url).
- Static asset pipeline (Vite dist + WhiteNoise).
- Security baseline and host/CSRF config.
- Vite dev/prod integration variables.
- Conditional admin based on env.
"""
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
import os
from typing import List

# Robust env parsers
def env_bool(name: str, default: bool = False) -> bool:
    return os.getenv(name, str(default)).strip().lower() in {"1", "true", "yes", "y", "on"}

def env_list(name: str) -> List[str]:
    return [x.strip() for x in os.getenv(name, "").split(",") if x.strip()]

def env_required(name: str) -> str:
    v = os.getenv(name)
    if not v:
        raise RuntimeError(f"Missing required env: {name}")
    return v

# Core env
DEBUG = env_bool('DJANGO_DEBUG', False)
SECRET_KEY = env_required('DJANGO_SECRET_KEY') if not DEBUG else (os.getenv('DJANGO_SECRET_KEY') or 'dev-insecure-key')
ALLOWED_HOSTS = env_list('DJANGO_ALLOWED_HOSTS') or ['localhost', '127.0.0.1']
CSRF_TRUSTED_ORIGINS = env_list('CSRF_TRUSTED_ORIGINS')

# Admin toggle (disabled unless DEBUG or ALLOW_ADMIN=true)
ALLOW_ADMIN = env_bool('ALLOW_ADMIN', False) or DEBUG

INSTALLED_APPS = [
    'django.contrib.admin',  # will be conditionally exposed in urls
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'api',
    'blackbox',
    'apps.core',
]

# Template tags live under blackbox.templatetags (no extra app required)

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'blackbox.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'blackbox.wsgi.application'
ASGI_APPLICATION = 'blackbox.asgi.application'

import dj_database_url
DATABASES = {
    'default': dj_database_url.config(default=env_required('DATABASE_URL'), conn_max_age=600, ssl_require=not DEBUG)
}

# Vite integration (dev server + manifest for prod)
VITE_DEV_SERVER = os.environ.get('VITE_DEV_SERVER', 'http://127.0.0.1:5173')
VITE_MANIFEST_PATH = str((BASE_DIR / 'frontend' / 'dist' / 'manifest.json').resolve())


LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
# Serve built assets from frontend/dist via collectstatic
STATICFILES_DIRS = [
    BASE_DIR / 'frontend' / 'dist',
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

CORS_ALLOW_ALL_ORIGINS = False
# Example: set allowed origins via env or here
CORS_ALLOWED_ORIGINS = os.environ.get('DJANGO_CORS_ALLOWED_ORIGINS', 'http://localhost:5173').split(',')

# Security baseline
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
#TODO: tune HSTS after TLS proven
SECURE_HSTS_SECONDS = 0 if DEBUG else 60 * 60 * 24 * 30
SECURE_HSTS_INCLUDE_SUBDOMAINS = not DEBUG
SECURE_HSTS_PRELOAD = not DEBUG
#TODO: add proper CSP once domains finalized

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
