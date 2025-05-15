import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import DBAppointments from '../db/dbAppointments';
import Appointment from '../db/classes/Appointment';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3003; // You can change the port if needed
const dbAppointments = new DBAppointments();
const appointmentsFilePath = path.join(__dirname, '/data/appointments.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Helper function to save appointments to a JSON file
const saveAppointmentsToFile = async () => {
    try {
        const appointments = await dbAppointments.getAllAppointments();
        fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointments, null, 2), 'utf-8');
        console.log('Appointments saved to appointments.json');
    } catch (error) {
        console.error('Failed to save appointments to file:', error);
    }
};

// Routes

// Create a new appointment
app.post('/appointments', async (req: Request, res: Response) => {
    const { advisor, studentId, reason, date } = req.body;
    try {
        const appointment = await dbAppointments.createAppointment(advisor, studentId, reason, date);
        await saveAppointmentsToFile(); // Save all appointments to file
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// Get an appointment by ID
app.get('/appointments/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointment = await dbAppointments.getAppointmentById(id);
        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }
        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch appointment' });
    }
});

// Get all appointments
app.get('/appointments', async (_req: Request, res: Response) => {
    try {
        const appointments = await dbAppointments.getAllAppointments();
        await saveAppointmentsToFile();
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Update an appointment
app.put('/appointments/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { advisor, studentId, reason, date } = req.body;
    try {
        const appointment = new Appointment(id, advisor, studentId, reason, date);
        await dbAppointments.updateAppointment(appointment);
        await saveAppointmentsToFile(); // Save all appointments to file
        res.json({ message: 'Appointment updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update appointment' });
    }
});

// Delete an appointment by ID
app.delete('/appointments/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await dbAppointments.deleteAppointment(id);
        await saveAppointmentsToFile(); // Save all appointments to file
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});