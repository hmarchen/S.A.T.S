import { Pool } from 'pg';
import pool from './dbConfig';
import Student from './classes/Student';

class DBStudents {
    private pool: Pool;

    constructor() {
        this.pool = pool;
    }

    async openConnection(): Promise<void> {
        if (!this.pool) {
            this.pool = pool;
            await this.pool.connect();
        }
    }

    async createStudent(
        id: number, email: string, firstName: string, 
        lastName: string, campus: string, program: string
    ): Promise<Student> {
        if (id.toString().length != 9) {
            throw new Error('ID must be at least 9 digits long');
        }
        const query = `
            INSERT INTO students (studentid, email, firstname, lastname, campus, program)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await this.pool.query(query, [ id, email, firstName, lastName, campus, program ]);
        return new Student(id, email, firstName, lastName, campus, program);
    }

    async getStudentById(id: number): Promise<Student | null> {
        const query = `
            SELECT * FROM students 
            WHERE studentid = $1
        `;
        const result = await this.pool.query(query, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new Student(row.studentid, row.email, row.firstname, row.lastname, row.campus, row.program);
    }

    async getAllStudents(): Promise<Student[]> {
        const query = `SELECT * FROM students`;
        const result = await this.pool.query(query);
        return result.rows.map(row => new Student(row.studentid, row.email, row.firstname, row.lastname, row.campus, row.program));
    }

    async updateStudent(student: Student): Promise<void> {
        if (student.id.toString().length != 9) {
            throw new Error('ID must be at least 9 digits long');
        }
        const query = `
            UPDATE students
            SET email = $2, firstname = $3, lastname = $4, campus = $5, program = $6
            WHERE studentid = $1
        `;
        const { id, email, firstName, lastName, campus, program } = student;
        await this.pool.query(query, [id, email, firstName, lastName, campus, program]);
    }

    async deleteStudent(studentId: number): Promise<void> {
        const query = `
            DELETE FROM students
            WHERE studentid = $1
        `;
        await this.pool.query(query, [studentId]);
    }

    async closeConnection(): Promise<void> {
        await this.pool.end();
    }
}

export default DBStudents;