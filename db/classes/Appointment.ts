class Appointment {
    id: string;
    advisor: string;
    studentId: number;
    reason: string;
    date: string;

    constructor(id: string, advisor: string, studentId: number, reason: string, date: string) {
        this.id = id;
        this.advisor = advisor;
        this.studentId = studentId;
        this.reason = reason;
        this.date = date;

        // validation
        try {
            this.setId(id);
            this.setAdvisor(advisor);
            this.setStudentID(studentId);
            this.setReason(reason);
            this.setDate(date);
        }
        catch (error: any) {
            throw new Error(error.message);
        }
    }

    // Getters
    getId(): string {
        return this.id;
    }

    getAdvisor(): string {
        return this.advisor;
    }

    getStudentID(): number {
        return this.studentId;
    }

    getReason(): string {
        return this.reason;
    }

    getDate(): string {
        return this.date;
    }

    // Setters
    setId(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new Error("ID must be a non-empty string.");
        }
        this.id = id;
    }

    setAdvisor(advisor: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!advisor || !emailRegex.test(advisor)) {
            throw new Error("Invalid advisor email format.");
        }
        this.advisor = advisor;
    }

    setStudentID(studentId: number): void {
        if (studentId.toString().length != 9) {
            throw new Error("Student ID must be 9 digits long.");
        }
        this.studentId = studentId;
    }

    setReason(reason: string): void {
        if (!reason || reason.trim().length === 0) {
            throw new Error("Reason cannot be empty.");
        }
        this.reason = reason;
    }

    setDate(date: string): void {
        if (!Date.parse(date)) {
            throw new Error("Invalid date format.");
        }
        this.date = date;
    }
}

export default Appointment;