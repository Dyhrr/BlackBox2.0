from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def redeem(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST only'}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
        code = (data.get('code') or '').strip().upper()
    except Exception:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    if not code:
        return JsonResponse({'error': 'Enter a code from Discord.'}, status=400)
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
