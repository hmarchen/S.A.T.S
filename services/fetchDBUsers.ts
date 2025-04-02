import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import DBUsers from '../db/dbUsers';
import User from '../db/classes/User';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001; // You can change the port if needed
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

const readUsersFile = async () => {
  try {
    const fileContent = await fs.promises.readFile(usersFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading reasons file:', error);
    return { reasons: [] };
  }
}

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
    const body = req.body;
    const data = await readUsersFile();

    try {
        const foundUser = await dbUsers.getUserByEmail(email);
        if (!foundUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const updatedUser = new User(body.email, body.firstName, body.lastName, body.password, body.role);

        console.log(body.email);
        console.log(updatedUser.email);

        // Find and update reason
        const index = data.findIndex(() => updatedUser.email === body.email);
        if (index === -1) {
            res.status(404).json({ error: 'Reason not found' });
        }

        data[index] = body;

        await dbUsers.updateUser(updatedUser);
        await saveUsersToFile();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update usera' });
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