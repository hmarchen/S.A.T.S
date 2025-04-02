import { Pool } from 'pg';
import pool from './dbConfig';
import User from './classes/User';
import bcrypt from 'bcryptjs';

class DBUsers {
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

    async createUser(email: string, firstName: string, lastName: string, password: string, role: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const query = `
            INSERT INTO users (firstname, lastname, email, password, role)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await this.pool.query(query, [firstName, lastName, email, hashedPassword, role]);
        return new User(email, firstName, lastName, hashedPassword, role);
    }

    async getUserByEmail(emailId: string): Promise<User | null> {
        const query = `
            SELECT * FROM users
            WHERE email = $1
        `;
        const result = await this.pool.query(query, [emailId]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new User(row.email, row.firstname, row.lastname, row.password, row.role);
    }

    async getAllUsers(): Promise<User[]> {
        const query = `SELECT * FROM users`;
        const result = await this.pool.query(query);
        return result.rows.map(row => new User(row.email, row.firstname, row.lastname, row.password, row.role));
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword); // Compare passwords
    }

    async updateUser(user: User): Promise<void> {
        const query = `
            UPDATE users
            SET firstname = $2, lastname = $3, password = $4, role = $5
            WHERE email = $1
        `;
        await this.pool.query(query, [user.email, user.firstName, user.lastName, user.password, user.role]);
    }

    async deleteUser(email: string): Promise<void> {
        const query = `
            DELETE FROM users
            WHERE email = $1
        `;
        await this.pool.query(query, [email]);
    }
    
    async deleteAllUsers(): Promise<void> {
        const query = `
            DELETE FROM users
        `;
        await this.pool.query(query);
    }

    async closeConnection(): Promise<void> {
        await this.pool.end();
    }
}

export default DBUsers;
