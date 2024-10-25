CREATE TABLE IF NOT EXISTS weather (
    id SERIAL PRIMARY KEY,
    city VARCHAR(50),
    temperature FLOAT,
    wind_speed FLOAT,
    humidity FLOAT,
    description VARCHAR(100),
    min_temperature FLOAT,
    max_temperature FLOAT,
    feels_like FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_alerts (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    temperature DECIMAL(5,2),
    condition VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    user_alert_id INTEGER REFERENCES user_alerts(id),
    city VARCHAR(100) NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    condition VARCHAR(100) NOT NULL,
    is_dismissed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
