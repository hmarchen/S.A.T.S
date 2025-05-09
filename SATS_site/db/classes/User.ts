const validRoles = ["admin", "advisor"];

export default class User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    ics: string;

    constructor(email: string, firstName: string, lastName: string, password: string, role: string, ics: string = '') {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.ics = ics;

        // validation
        try {
            this.setEmail(email);
            this.setFirstName(firstName);
            this.setLastName(lastName);
            this.setPassword(password);
            this.setRole(role);
            this.setIcs(ics);
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        this.email = email;
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
        if (!validRoles.includes(role.toLowerCase())) {
            throw new Error(`Role must be one of the following: ${validRoles.join(", ")}.`);
        }
        this.role = role;
    }

    getIcs(): string {
        return this.ics;
    }

    setIcs(ics: string): void {
        if (ics) {
            const icsRegex = /^https:\/\/outlook\.office365\.com\/.+$/;
            if (!icsRegex.test(ics)) {
                throw new Error("ICS must be a valid outlook.office365.com link.");
            }
        }
        this.ics = ics;
    }

    toString(): string {
        return `User [Name=${this.firstName} ${this.lastName}, Email=${this.email}, Role=${this.role}, ICS=${this.ics}]`;
    }
}
