-- Key changes:
-- - PostgreSQL schema for raffles/casino site. Idempotent creation.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- promotions
CREATE TABLE IF NOT EXISTS promotions (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(64) UNIQUE NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL DEFAULT 0,
    max_redemptions INTEGER,
    expires_at TIMESTAMPTZ,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- promo_redemptions
CREATE TABLE IF NOT EXISTS promo_redemptions (
    id BIGSERIAL PRIMARY KEY,
    promotion_id BIGINT NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
    user_identifier VARCHAR(64) NOT NULL,
    redeemed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_promo_user UNIQUE (promotion_id, user_identifier)
);
CREATE INDEX IF NOT EXISTS ix_promo_redemptions_user ON promo_redemptions(user_identifier);

-- raffles
CREATE TABLE IF NOT EXISTS raffles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    ticket_price NUMERIC(12,2) NOT NULL,
    status VARCHAR(16) NOT NULL DEFAULT 'draft',
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- raffle_tickets
CREATE TABLE IF NOT EXISTS raffle_tickets (
    id BIGSERIAL PRIMARY KEY,
    raffle_id BIGINT NOT NULL REFERENCES raffles(id) ON DELETE CASCADE,
    user_identifier VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_raffle_tickets_raffle_user ON raffle_tickets(raffle_id, user_identifier);
CREATE INDEX IF NOT EXISTS ix_raffle_tickets_user ON raffle_tickets(user_identifier);

-- raffle_winners
CREATE TABLE IF NOT EXISTS raffle_winners (
    id BIGSERIAL PRIMARY KEY,
    raffle_id BIGINT NOT NULL REFERENCES raffles(id) ON DELETE CASCADE,
    user_identifier VARCHAR(64) NOT NULL,
    ticket_id BIGINT REFERENCES raffle_tickets(id) ON DELETE SET NULL,
    announced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- instant wins
CREATE TABLE IF NOT EXISTS instant_wins (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    odds NUMERIC(10,6) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS instant_win_claims (
    id BIGSERIAL PRIMARY KEY,
    instant_win_id BIGINT NOT NULL REFERENCES instant_wins(id) ON DELETE CASCADE,
    user_identifier VARCHAR(64) NOT NULL,
    won BOOLEAN NOT NULL DEFAULT FALSE,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_instant_claims_win_user ON instant_win_claims(instant_win_id, user_identifier);
CREATE INDEX IF NOT EXISTS ix_instant_claims_user ON instant_win_claims(user_identifier);

-- deposits
CREATE TABLE IF NOT EXISTS deposits (
    id BIGSERIAL PRIMARY KEY,
    user_identifier VARCHAR(64) NOT NULL,
    amount NUMERIC(16,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'CRD',
    reference VARCHAR(128),
    status VARCHAR(16) NOT NULL DEFAULT 'pending',
    confirmed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_deposits_user ON deposits(user_identifier);
CREATE INDEX IF NOT EXISTS ix_deposits_status ON deposits(status);

-- transactions
CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,
    user_identifier VARCHAR(64) NOT NULL,
    tx_type VARCHAR(10) NOT NULL,
    amount NUMERIC(16,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'CRD',
    reference VARCHAR(128),
    meta JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_tx_user ON transactions(user_identifier);
CREATE INDEX IF NOT EXISTS ix_tx_type ON transactions(tx_type);

-- games
CREATE TABLE IF NOT EXISTS games (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    game_type VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- game_rounds
CREATE TABLE IF NOT EXISTS game_rounds (
    id BIGSERIAL PRIMARY KEY,
    game_id BIGINT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    user_identifier VARCHAR(64) NOT NULL,
    bet_amount NUMERIC(16,2) NOT NULL,
    result VARCHAR(50) NOT NULL,
    payout NUMERIC(16,2) NOT NULL DEFAULT 0,
    meta JSONB NOT NULL DEFAULT '{}'::jsonb,
    played_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_rounds_game_user ON game_rounds(game_id, user_identifier);
CREATE INDEX IF NOT EXISTS ix_rounds_user ON game_rounds(user_identifier);
