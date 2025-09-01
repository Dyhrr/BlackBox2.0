-- Key changes:
-- - MySQL schema (utf8mb4, InnoDB). Idempotent creation.
-- - Adjust JSON types and timestamp defaults.

-- Ensure database/table defaults
SET NAMES utf8mb4;

-- promotions
CREATE TABLE IF NOT EXISTS promotions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(64) NOT NULL UNIQUE,
    description TEXT,
    credits INT NOT NULL DEFAULT 0,
    max_redemptions INT NULL,
    expires_at DATETIME NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- promo_redemptions
CREATE TABLE IF NOT EXISTS promo_redemptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    promotion_id BIGINT NOT NULL,
    user_identifier VARCHAR(64) NOT NULL,
    redeemed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uq_promo_user UNIQUE (promotion_id, user_identifier),
    KEY ix_promo_redemptions_user (user_identifier),
    CONSTRAINT fk_promo_redemptions_promo FOREIGN KEY (promotion_id) REFERENCES promotions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- raffles
CREATE TABLE IF NOT EXISTS raffles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    ticket_price DECIMAL(12,2) NOT NULL,
    status VARCHAR(16) NOT NULL DEFAULT 'draft',
    starts_at DATETIME NULL,
    ends_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- raffle_tickets
CREATE TABLE IF NOT EXISTS raffle_tickets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    raffle_id BIGINT NOT NULL,
    user_identifier VARCHAR(64) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY ix_raffle_tickets_ru (raffle_id, user_identifier),
    CONSTRAINT fk_raffle_tickets_raffle FOREIGN KEY (raffle_id) REFERENCES raffles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- raffle_winners
CREATE TABLE IF NOT EXISTS raffle_winners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    raffle_id BIGINT NOT NULL,
    user_identifier VARCHAR(64) NOT NULL,
    ticket_id BIGINT NULL,
    announced_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_raffle_winners_raffle FOREIGN KEY (raffle_id) REFERENCES raffles(id) ON DELETE CASCADE,
    CONSTRAINT fk_raffle_winners_ticket FOREIGN KEY (ticket_id) REFERENCES raffle_tickets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- instant wins
CREATE TABLE IF NOT EXISTS instant_wins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    odds DECIMAL(10,6) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS instant_win_claims (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    instant_win_id BIGINT NOT NULL,
    user_identifier VARCHAR(64) NOT NULL,
    won TINYINT(1) NOT NULL DEFAULT 0,
    attempted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY ix_iwc_win_user (instant_win_id, user_identifier),
    CONSTRAINT fk_iwc_win FOREIGN KEY (instant_win_id) REFERENCES instant_wins(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- deposits
CREATE TABLE IF NOT EXISTS deposits (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_identifier VARCHAR(64) NOT NULL,
    amount DECIMAL(16,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'CRD',
    reference VARCHAR(128),
    status VARCHAR(16) NOT NULL DEFAULT 'pending',
    confirmed_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY ix_deposits_user (user_identifier),
    KEY ix_deposits_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- transactions
CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_identifier VARCHAR(64) NOT NULL,
    tx_type VARCHAR(10) NOT NULL,
    amount DECIMAL(16,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'CRD',
    reference VARCHAR(128),
    meta JSON NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY ix_tx_user (user_identifier),
    KEY ix_tx_type (tx_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- games
CREATE TABLE IF NOT EXISTS games (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    game_type VARCHAR(50) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- game_rounds
CREATE TABLE IF NOT EXISTS game_rounds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    game_id BIGINT NOT NULL,
    user_identifier VARCHAR(64) NOT NULL,
    bet_amount DECIMAL(16,2) NOT NULL,
    result VARCHAR(50) NOT NULL,
    payout DECIMAL(16,2) NOT NULL DEFAULT 0,
    meta JSON NOT NULL,
    played_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY ix_rounds_game_user (game_id, user_identifier),
    CONSTRAINT fk_game_rounds_game FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
