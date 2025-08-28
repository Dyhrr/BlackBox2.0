from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
import os
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'unsafe-dev-key')
DEBUG = os.environ.get('DJANGO_DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'api',
    'blackbox',
]

INSTALLED_APPS += ['django_vite']

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
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

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DJANGO_VITE_DEV_MODE = True
DJANGO_VITE_DEV_SERVER_PROTOCOL = "http"
DJANGO_VITE_DEV_SERVER_HOST = "127.0.0.1"
DJANGO_VITE_DEV_SERVER_PORT = 5173

DJANGO_VITE_ASSETS_PATH = BASE_DIR.parent / "frontend" / "dist"
DJANGO_VITE_MANIFEST_PATH = DJANGO_VITE_ASSETS_PATH / ".vite" / "manifest.json"

DJANGO_VITE = {
    "default": {
        "dev_mode": True,
        "dev_server_protocol": "http",
        "dev_server_host": "127.0.0.1",
        "dev_server_port": 5173,
        "manifest_path": DJANGO_VITE_MANIFEST_PATH,
        "static_url_prefix": "../",
    }
}


LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [ BASE_DIR / 'static' ]
STATIC_ROOT = BASE_DIR / 'static_root'

CORS_ALLOW_ALL_ORIGINS = False
# Example: set allowed origins via env or here
CORS_ALLOWED_ORIGINS = os.environ.get('DJANGO_CORS_ALLOWED_ORIGINS', 'http://localhost:5173').split(',')
