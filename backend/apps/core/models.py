"""
Key changes:
- Core data models for raffles, promos, deposits, games, transactions.
- Tables align with database/schema.sql and schema.mysql.sql.
"""

from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Promotion(TimeStampedModel):
    code = models.CharField(max_length=64, unique=True)
    description = models.TextField(blank=True)
    credits = models.IntegerField(default=0)
    max_redemptions = models.IntegerField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    active = models.BooleanField(default=True)

    class Meta:
        db_table = 'promotions'


class PromoRedemption(TimeStampedModel):
    promotion = models.ForeignKey(Promotion, on_delete=models.CASCADE, related_name='redemptions')
    user_identifier = models.CharField(max_length=64)
    redeemed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'promo_redemptions'
        unique_together = (
            ('promotion', 'user_identifier'),
        )


class Raffle(TimeStampedModel):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('closed', 'Closed'),
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    ticket_price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='draft')
    starts_at = models.DateTimeField(null=True, blank=True)
    ends_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'raffles'


class RaffleTicket(TimeStampedModel):
    raffle = models.ForeignKey(Raffle, on_delete=models.CASCADE, related_name='tickets')
    user_identifier = models.CharField(max_length=64)
    # Optional sequential number per raffle can be derived if needed

    class Meta:
        db_table = 'raffle_tickets'
        indexes = [
            models.Index(fields=['raffle', 'user_identifier']),
        ]


class RaffleWinner(TimeStampedModel):
    raffle = models.ForeignKey(Raffle, on_delete=models.CASCADE, related_name='winners')
    user_identifier = models.CharField(max_length=64)
    ticket = models.ForeignKey(RaffleTicket, on_delete=models.SET_NULL, null=True, blank=True)
    announced_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'raffle_winners'


class InstantWin(TimeStampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    odds = models.DecimalField(max_digits=10, decimal_places=6)  # probability 0..1
    active = models.BooleanField(default=False)

    class Meta:
        db_table = 'instant_wins'


class InstantWinClaim(TimeStampedModel):
    instant_win = models.ForeignKey(InstantWin, on_delete=models.CASCADE, related_name='claims')
    user_identifier = models.CharField(max_length=64)
    won = models.BooleanField(default=False)
    attempted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'instant_win_claims'
        indexes = [
            models.Index(fields=['instant_win', 'user_identifier']),
        ]


class Deposit(TimeStampedModel):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('failed', 'Failed'),
    )
    user_identifier = models.CharField(max_length=64)
    amount = models.DecimalField(max_digits=16, decimal_places=2)
    currency = models.CharField(max_length=3, default='CRD')
    reference = models.CharField(max_length=128, blank=True)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='pending')
    confirmed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'deposits'
        indexes = [
            models.Index(fields=['user_identifier']),
            models.Index(fields=['status']),
        ]


class Transaction(TimeStampedModel):
    TYPE_CHOICES = (
        ('debit', 'Debit'),
        ('credit', 'Credit'),
    )
    user_identifier = models.CharField(max_length=64)
    tx_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=16, decimal_places=2)
    currency = models.CharField(max_length=3, default='CRD')
    reference = models.CharField(max_length=128, blank=True)
    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'transactions'
        indexes = [
            models.Index(fields=['user_identifier']),
            models.Index(fields=['tx_type']),
        ]


class Game(TimeStampedModel):
    name = models.CharField(max_length=100)
    game_type = models.CharField(max_length=50)
    active = models.BooleanField(default=True)

    class Meta:
        db_table = 'games'


class GameRound(TimeStampedModel):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='rounds')
    user_identifier = models.CharField(max_length=64)
    bet_amount = models.DecimalField(max_digits=16, decimal_places=2)
    result = models.CharField(max_length=50)
    payout = models.DecimalField(max_digits=16, decimal_places=2, default=0)
    meta = models.JSONField(default=dict, blank=True)
    played_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'game_rounds'
        indexes = [
            models.Index(fields=['game', 'user_identifier']),
        ]

