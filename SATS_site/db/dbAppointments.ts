import { Pool } from 'pg';
import pool from './dbConfig';
import Appointment from './classes/Appointment';
import DBUsers from './dbUsers';
import DBStudents from './dbStudents';
import { v4 as uuidv4 } from 'uuid';

class DBAppointments {
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

    async createAppointment(
        advisor: string, studentId: number, 
        reason: string, date: string
    ): Promise<Appointment> {
        // validation
        const advisorExists = await new DBUsers().getUserByEmail(advisor);
        if (!advisorExists) {
            throw new Error(`Advisor with email ${advisor} does not exist.`);
        }

        const studentExists = await new DBStudents().getStudentById(studentId);
        if (!studentExists) {
            throw new Error(`Student with ID ${studentId} does not exist.`);
        }

        // create new appointment
        const newId = uuidv4();
        const query = `
            INSERT INTO appointments (appointmentid, advisor, studentid, reason, date)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await this.pool.query(query, [ newId, advisor, studentId, reason, date ]);
        return new Appointment(newId, advisor, studentId, reason, date);
    }

    async getAppointmentById(id: string): Promise<Appointment | null> {
        const query = `
            SELECT * FROM appointments 
            WHERE appointmentid = $1
        `;
        const result = await this.pool.query(query, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new Appointment(row.appointmentid, row.advisor, row.studentid, row.reason, row.date);
    }

    async getAllAppointments(): Promise<Appointment[]> {
        const query = `SELECT * FROM appointments`;
        const result = await this.pool.query(query);
        return result.rows.map(row => new Appointment(row.appointmentid, row.advisor, row.studentid, row.reason, row.date));
    }

    async updateAppointment(appointment: Appointment): Promise<void> {
        // validation
        const advisorExists = await new DBUsers().getUserByEmail(appointment.advisor);
        if (!advisorExists) {
            throw new Error(`Advisor with email ${appointment.advisor} does not exist.`);
        }

        const studentExists = await new DBStudents().getStudentById(appointment.studentId);
        if (!studentExists) {
            throw new Error(`Student with ID ${appointment.studentId} does not exist.`);
        }

        // update appointment
        const query = `
            UPDATE appointments
            SET advisor = $2, studentid = $3, reason = $4, date = $5
            WHERE appointmentid = $1
        `;
        const { id, advisor, studentId, reason, date } = appointment;
        await this.pool.query(query, [id, advisor, studentId, reason, date]);
    }

    async deleteAppointment(appointmentId: string): Promise<void> {
        const query = `
            DELETE FROM appointments
            WHERE appointmentid = $1
        `;
        await this.pool.query(query, [appointmentId]);
    }

    async closeConnection(): Promise<void> {
        await this.pool.end();
    }
}

export default DBAppointments;