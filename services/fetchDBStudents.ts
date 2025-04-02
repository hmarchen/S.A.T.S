import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import DBStudents from '../db/dbStudents';
import Student from '../db/classes/Student';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3002; // You can change the port if needed
const dbStudents = new DBStudents();
const studentsFilePath = path.join(__dirname, '/data/students.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Helper function to save students to a JSON file
const saveStudentsToFile = async () => {
    try {
        const students = await dbStudents.getAllStudents();
        fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2), 'utf-8');
        console.log('Students saved to students.json');
    } catch (error) {
        console.error('Failed to save students to file:', error);
    }
};

// Routes

// Create a new student
app.post('/students', async (req: Request, res: Response) => {
    const { id, email, firstName, lastName, campus, program } = req.body;
    try {
        const student = await dbStudents.createStudent(id, email, firstName, lastName, campus, program);
        await saveStudentsToFile(); // Save students to file after creating a new student
        res.status(201).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create student' });
    }
});

// Get a student by ID
app.get('/students/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const student = await dbStudents.getStudentById(Number(id));
        if (!student) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

// Get all students
app.get('/students', async (_req: Request, res: Response) => {
    try {
        const students = await dbStudents.getAllStudents();
        await saveStudentsToFile();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Update a student
app.put('/students/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, firstName, lastName, campus, program } = req.body;
    try {
        const student = new Student(Number(id), email, firstName, lastName, campus, program);
        await dbStudents.updateStudent(student);
        await saveStudentsToFile(); // Save students to file after updating a student
        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update student' });
    }
});

// Delete a student by ID
app.delete('/students/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await dbStudents.deleteStudent(Number(id));
        await saveStudentsToFile(); // Save students to file after deleting a student
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});