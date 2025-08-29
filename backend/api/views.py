# TODO
# - Add endpoints for raffle creation and management
# - Implement user credit adjustment API
# - Add broadcast message API
# - Secure admin-only endpoints

from django.http import JsonResponse
import json

def redeem(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST only'}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
        code = (data.get('code') or '').strip()
    except Exception:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # Validate code: only allow alphanumeric and dashes, max length 32
    import re
    if not code or not re.fullmatch(r'[A-Za-z0-9\-]{1,32}', code):
        return JsonResponse({'error': 'Invalid promo code format.'}, status=400)
    code = code.upper()

    if code == 'INVALID':
        return JsonResponse({'error': 'Code not found.'}, status=404)
    if code == 'USED':
        return JsonResponse({'error': 'This code was already redeemed.'}, status=409)
    if code == 'EXPIRED':
        return JsonResponse({'error': 'This code has expired.'}, status=410)
    if code == 'NOTELIGIBLE':
        return JsonResponse({'error': 'Your Discord account isn’t eligible for this code.'}, status=403)

    # success: demo adds +10 credits
    return JsonResponse({'ok': True, 'tickets_added': 10})
