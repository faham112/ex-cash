-- Create tables for InvestRO platform

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    roi DECIMAL(5, 2) NOT NULL,
    duration_days INTEGER NOT NULL,
    min_investment DECIMAL(15, 2) NOT NULL,
    max_investment DECIMAL(15, 2),
    principal_return BOOLEAN DEFAULT TRUE,
    bonus BOOLEAN DEFAULT FALSE,
    popular BOOLEAN DEFAULT FALSE
);

-- Investments table
CREATE TABLE IF NOT EXISTS investments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    plan_id INTEGER REFERENCES plans(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    status TEXT DEFAULT 'active',
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    total_return DECIMAL(15, 2)
);

-- Insert default investment plans
INSERT INTO plans (name, roi, duration_days, min_investment, max_investment, principal_return, bonus, popular) VALUES
('Starter Plan', 1.5, 10, 50, 500, TRUE, FALSE, FALSE),
('Silver Plan', 2.2, 20, 500, 2000, TRUE, FALSE, FALSE),
('Gold Plan', 3.0, 30, 2000, 5000, TRUE, TRUE, TRUE),
('Platinum Plan', 3.8, 45, 5000, 10000, TRUE, TRUE, FALSE),
('Diamond Plan', 4.5, 60, 10000, 25000, TRUE, TRUE, FALSE),
('VIP Plan', 5.5, 90, 25000, NULL, TRUE, TRUE, FALSE)
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_investments_user_id ON investments(user_id);
CREATE INDEX IF NOT EXISTS idx_investments_plan_id ON investments(plan_id);
CREATE INDEX IF NOT EXISTS idx_investments_status ON investments(status);