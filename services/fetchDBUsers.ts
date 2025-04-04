import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import DBUsers from '../db/dbUsers';
import User from '../db/classes/User';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const app = express();
const port = 3002; // You can change the port if needed
const dbUsers = new DBUsers();
const usersFilePath = path.join(__dirname, '/data/users.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Helper function to save users to a JSON file
const saveUsersToFile = async (): Promise<any> => {
    try {
        const users = await dbUsers.getAllUsers();
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
        console.log('Users saved to users.json');
    } catch (error) {
        console.error('Failed to save users to file:', error);
    }
};

const readUsersFile = async (): Promise<any> => {
    try {
        const fileContent = await fs.promises.readFile(usersFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading reasons file:', error);
        return { reasons: [] };
    }
};

// Routes

// Create a new user
app.post('/users', async (req: Request, res: Response): Promise<any> => {
    const { email, firstName, lastName, password, role, ics } = req.body;
    try {
        const user = await dbUsers.createUser(email, firstName, lastName, password, role, ics);
        await saveUsersToFile();
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create user' });
    }
});

// Get a user by email
app.get('/users/:email', async (req: Request, res: Response): Promise<any> => {
    const { email } = req.params;
    try {
        const user = await dbUsers.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Get all users
app.get('/users', async (_req: Request, res: Response): Promise<any> => {
    try {
        const users = await dbUsers.getAllUsers();
        await saveUsersToFile();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Update a user
app.put('/users/:email', async (req: Request, res: Response): Promise<any> => {
    const { email } = req.params;
    const body = req.body;
    const data = await readUsersFile();

    try {
        const foundUser = await dbUsers.getUserByEmail(email);
        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = new User(body.email, body.firstName, body.lastName, body.password, body.role, body.ics);

        console.log(body.email);
        console.log(updatedUser.email);

        // Find and update user
        const index = data.findIndex(() => updatedUser.email === body.email);
        if (index === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        data[index] = body;

        await dbUsers.updateUser(updatedUser);
        await saveUsersToFile();
        return res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete a user by email
app.delete('/users/:email', async (req: Request, res: Response): Promise<any> => {
    const { email } = req.params;
    try {
        await dbUsers.deleteUser(email);
        await saveUsersToFile();
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Delete all users
app.delete('/users', async (_req: Request, res: Response): Promise<any> => {
    try {
        await dbUsers.deleteAllUsers();
        await saveUsersToFile();
        return res.json({ message: 'All users deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete all users' });
    }
});

// Login a user
app.post('/login', async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    try {
        console.log(body.email);
        const user = await dbUsers.getUserByEmail(body.email);

        console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passMatches = await dbUsers.comparePassword(body.password, user.password);
        console.log(passMatches);

        if (!passMatches) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        return res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to login' });
    }
});

// Route to hash a password
app.post('/hash-password', async (req: Request, res: Response): Promise<any> => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return res.json({ hashedPassword });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to hash password' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
