-- Drop the tables
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Emails;

CREATE TABLE Emails
(
    EmailId SERIAL PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Users
(
    Email VARCHAR(255) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50),
    Password VARCHAR(255) NOT NULL, -- will be hashed in dbUser.ts
    Role VARCHAR(20) NOT NULL,
    ICS VARCHAR(255) -- outlook calendar link
);

CREATE TABLE Students
(
    StudentId INT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50),
    Campus VARCHAR(20) NOT NULL,
    Program VARCHAR(50) NOT NULL
);

CREATE TABLE Appointments
(
    AppointmentId VARCHAR(255) PRIMARY KEY,
    Advisor VARCHAR(255) NOT NULL,
    StudentId INT NOT NULL,
    Reason VARCHAR(255) NOT NULL,
    Date VARCHAR(20) NOT NULL, -- maybe use a date type idk
    CONSTRAINT FK_Advisor
        FOREIGN KEY (Advisor) 
        REFERENCES Users(Email),
    CONSTRAINT FK_Student
        FOREIGN KEY (StudentId) 
        REFERENCES Students(StudentId)
);

