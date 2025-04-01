export default class User {
    userId: number;
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    role: string;

    constructor(userId: number, firstName: string, lastName: string, emailId: string, password: string, role: string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.password = password;
        this.role = role;
    }

    getUserId(): number {
        return this.userId;
    }

    setUserId(userId: number): void {
        if (userId <= 0) {
            throw new Error("User ID must be a positive number.");
        }
        this.userId = userId;
    }

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        if (!firstName || firstName.trim().length === 0) {
            throw new Error("First name cannot be empty.");
        }
        this.firstName = firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        if (!lastName || lastName.trim().length === 0) {
            throw new Error("Last name cannot be empty.");
        }
        this.lastName = lastName;
    }

    getEmailId(): string {
        return this.emailId;
    }

    setEmailId(emailId: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailId)) {
            throw new Error("Invalid email format.");
        }
        this.emailId = emailId;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        if (!password || password.length < 6) {
            throw new Error("Password must be at least 6 characters long.");
        }
        this.password = password;
    }

    getRole(): string {
        return this.role;
    }

    setRole(role: string): void {
        const validRoles = ["admin", "user", "guest"];
        if (!validRoles.includes(role.toLowerCase())) {
            throw new Error(`Role must be one of the following: ${validRoles.join(", ")}.`);
        }
        this.role = role;
    }

    toString(): string {
        return `User [ID=${this.userId}, Name=${this.firstName} ${this.lastName}, Email=${this.emailId}, Role=${this.role}]`;
    }
}