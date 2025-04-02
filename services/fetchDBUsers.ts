import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import DBUsers from '../db/dbUsers';
import User from '../db/classes/User';

const app = express();
const port = 3000; // You can change the port if needed
const dbUsers = new DBUsers();
const usersFilePath = path.join(__dirname, '/data/users.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Helper function to save users to a JSON file
const saveUsersToFile = async () => {
    try {
        const users = await dbUsers.getAllUsers();
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
        console.log('Users saved to users.json');
    } catch (error) {
        console.error('Failed to save users to file:', error);
    }
};

// Routes

// Create a new user
app.post('/users', async (req: Request, res: Response) => {
    const { email, firstName, lastName, password, role } = req.body;
    try {
        const user = await dbUsers.createUser(email, firstName, lastName, password, role);
        await saveUsersToFile();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Get a user by email
app.get('/users/:email', async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const user = await dbUsers.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Get all users
app.get('/users', async (_req: Request, res: Response) => {
    try {
        const users = await dbUsers.getAllUsers();
        await saveUsersToFile();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Update a user
app.put('/users/:email', async (req: Request, res: Response) => {
    const { email } = req.params;
    const { firstName, lastName, password, role } = req.body;
    try {
        const user = new User(email, firstName, lastName, password, role);
        await dbUsers.updateUser(user);
        await saveUsersToFile();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete a user by email
app.delete('/users/:email', async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        await dbUsers.deleteUser(email);
        await saveUsersToFile();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Delete all users
app.delete('/users', async (_req: Request, res: Response) => {
    try {
        await dbUsers.deleteAllUsers();
        await saveUsersToFile();
        res.json({ message: 'All users deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete all users' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});