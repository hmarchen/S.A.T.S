-- Drop the tables
DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
    Email VARCHAR(255) PRIMARY KEY UNIQUE,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL, -- will be hashed in dbUser.ts
    Role VARCHAR(20) NOT NULL,
	ICS VARCHAR(255) -- outlook calendar link
);

-- Query the Email table
SELECT * FROM Users;