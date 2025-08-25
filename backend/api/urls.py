from django.urls import path
from .views import redeem

urlpatterns = [
    path('promo/redeem', redeem),
]
