-- Drop the tables
DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
    UserID SERIAL PRIMARY KEY,  -- Use SERIAL for auto-incrementing UserID
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(20) NOT NULL
);

-- Reset UserID serial
-- ALTER SEQUENCE users_userid_seq RESTART WITH 1;