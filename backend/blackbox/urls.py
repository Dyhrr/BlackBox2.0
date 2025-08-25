from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from api.views import redeem

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/promo/redeem', redeem),
    re_path(r'^(?!api/).*$',
            TemplateView.as_view(template_name='index.html')),
]
