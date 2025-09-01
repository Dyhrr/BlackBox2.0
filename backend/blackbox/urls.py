"""
Key changes:
- Add /healthz endpoint (plain text, no DB).
- Conditionally expose admin based on DEBUG or ALLOW_ADMIN.
- Safe SPA fallback that doesn't match api/admin/static.
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.conf import settings

urlpatterns = [
    path("healthz", lambda r: HttpResponse("ok", content_type="text/plain")),
]

if getattr(settings, 'DEBUG', False) or getattr(settings, 'ALLOW_ADMIN', False):
    urlpatterns += [path("admin/", admin.site.urls)]

urlpatterns += [
    path("api/", include("api.urls")),
    re_path(r"^(?!static/|admin/|api/).*$", TemplateView.as_view(template_name="index.html")),
]
