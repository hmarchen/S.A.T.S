import { Pool } from 'pg';
import pool from './dbConfig';
import User from './classes/User';
import bcrypt from 'bcrypt';

class DBUsers {
    private pool: Pool;

    constructor() {
        try {
            this.pool = pool;
        } catch (error) {
            console.error('Error initializing database pool:', error);
            throw error;
        }
    }

    async createUser(firstName: string, lastName: string, emailId: string, password: string, role: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const query = `
            INSERT INTO users (firstname, lastname, email, password, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING userid
        `;
        const result = await this.pool.query(query, [firstName, lastName, emailId, hashedPassword, role]);
        const userId = result.rows[0].userid;
        return new User(userId, firstName, lastName, emailId, hashedPassword, role);
    }

    async getUserById(userId: number): Promise<User | null> {
        const query = `
            SELECT * FROM users
            WHERE userid = $1
        `;
        const result = await this.pool.query(query, [userId]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new User(row.userid, row.firstname, row.lastname, row.email, row.password, row.role);
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword); // Compare passwords
    }

    async updateUser(user: User): Promise<void> {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        const query = `
            UPDATE users
            SET firstname = $2, lastname = $3, email = $4, password = $5, role = $6
            WHERE userid = $1
        `;
        await this.pool.query(query, [user.userId, user.firstName, user.lastName, user.emailId, hashedPassword, user.role]);
    }

    async deleteUser(userId: number): Promise<void> {
        const query = `
            DELETE FROM users
            WHERE userid = $1
        `;
        await this.pool.query(query, [userId]);
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