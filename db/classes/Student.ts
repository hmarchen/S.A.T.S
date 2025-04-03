export default class Student {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    campus: string;
    program: string;

    constructor(
        id: number,
        email: string,
        firstName: string,
        lastName: string,
        campus: string,
        program: string
    ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.campus = campus;
        this.program = program;
        
        // validation
        try {
            this.setId(id);
            this.setEmail(email);
            this.setFirstName(firstName);
            this.setLastName(lastName);
            this.setCampus(campus);
            this.setProgram(program);
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getCampus(): string {
        return this.campus;
    }

    getProgram(): string {
        return this.program;
    }

    // Setters
    setId(id: number): void {
        if (id.toString().length !== 9) {
            throw new Error("ID must be 9 digits long.");
        }
        this.id = id;
    }

    setEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        this.email = email;
    }

    setFirstName(firstName: string): void {
        if (!firstName.trim()) {
            throw new Error("First name cannot be empty.");
        }
        this.firstName = firstName;
    }

    setLastName(lastName: string): void {
        if (!lastName.trim()) {
            throw new Error("Last name cannot be empty.");
        }
        this.lastName = lastName;
    }

    setCampus(campus: string): void {
        if (!campus.trim()) {
            throw new Error("Campus cannot be empty.");
        }
        this.campus = campus;
    }

    setProgram(program: string): void {
        if (!program.trim()) {
            throw new Error("Program cannot be empty.");
        }
        this.program = program;
    }
}