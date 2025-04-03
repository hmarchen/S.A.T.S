import express, { RequestHandler } from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import { JSDOM, VirtualConsole } from 'jsdom';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = process.env.FETCH_PROGRAM_SERVICE_PORT || 3001;

app.use(cors());
app.use(express.json());

interface Advisor {
  advisor: string;
  email: string;
  programs: string;
}

interface Reason {
  id: number;
  category: string;
  details: string;
  redirect: boolean;
}

const REASONS_FILE_PATH = path.join(__dirname, '/data/reasons.json');

// Helper function to read reasons file
async function readReasonsFile() {
  try {
    const fileContent = await fs.readFile(REASONS_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading reasons file:', error);
    return { reasons: [] };
  }
}

// Helper function to write reasons file
async function writeReasonsFile(data: any) {
  try {
    await fs.writeFile(REASONS_FILE_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing reasons file:', error);
    return false;
  }
}

app.get('/advisors', async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get('https://durhamcollege.ca/student-life/student-services/student-advisors');
    const dom = new JSDOM(data, {
      virtualConsole: new VirtualConsole(),
      runScripts: "outside-only",
      resources: "usable"
    });
    const document = dom.window.document;

    const advisorData: Advisor[] = [];
    const tables = document.querySelectorAll('table');
    
    // Convert NodeList to Array and remove last two tables
    const relevantTables = Array.from(tables).slice(0, -2);
    
    relevantTables.forEach(table => {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row, index) => {
        if (index === 0) return;
        const emailRegex = /E: \s*(.*?\.ca)/i;
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          let advisorNameRaw = cells[0].textContent?.trim() || 'No name found';  
          const emailMatch = advisorNameRaw.match(emailRegex);
          const email = emailMatch ? emailMatch[1] : 'No email found';
          const programs = cells[1]?.textContent?.trim() || 'No programs found';
          let advisorName = advisorNameRaw.replace(/\nE:.*?\.ca/, '').trim();
          if (advisorName !== 'No name found') {
            advisorData.push({ advisor: advisorName, email, programs });
          }
        }
      });
    });

    res.json(advisorData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.get('/reasons', async (req: Request, res: Response) => {
  try {
    const data = await readReasonsFile();
    res.json(data);
  } catch (error) {
    console.error('Error fetching reasons:', error);
    res.status(500).json({ error: 'Failed to fetch reasons' });
  }
});

app.post('/reasons', (async (req, res) => {
  try {
    const body = req.body;
    const data = await readReasonsFile();
    
    // Validate input
    if (!body.category || !body.details) {
      return res.status(400).json({ error: 'Category and details are required' });
    }

    console.log(body.redirect);

    // Create new reason
    const newReason: Reason = {
      id: Math.max(...data.reasons.map((r: Reason) => r.id), 0) + 1,
      category: body.category,
      details: body.details,
      redirect: body.redirect
    };

    data.reasons.push(newReason);
    const success = await writeReasonsFile(data);

    if (!success) {
      return res.status(500).json({ error: 'Failed to save reason' });
    }

    res.json(newReason);
  } catch (error) {
    console.error('Error creating reason:', error);
    res.status(500).json({ error: 'Failed to create reason' });
  }
}) as RequestHandler);

app.put('/reasons', (async (req, res) => {
  try {
    const body = req.body;
    const data = await readReasonsFile();

    // Validate input
    if (!body.id || !body.category || !body.details) {
      return res.status(400).json({ error: 'ID, category, and details are required' });
    }

    // Find and update reason
    const index = data.reasons.findIndex((r: Reason) => r.id === body.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Reason not found' });
    }

    data.reasons[index] = body;
    const success = await writeReasonsFile(data);

    if (!success) {
      return res.status(500).json({ error: 'Failed to update reason' });
    }

    res.json(body);
  } catch (error) {
    console.error('Error updating reason:', error);
    res.status(500).json({ error: 'Failed to update reason' });
  }
}) as RequestHandler);

app.delete('/reasons/:id', (async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await readReasonsFile();

    // Find and remove reason
    const index = data.reasons.findIndex((r: Reason) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Reason not found' });
    }

    data.reasons.splice(index, 1);
    const success = await writeReasonsFile(data);

    if (!success) {
      return res.status(500).json({ error: 'Failed to delete reason' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting reason:', error);
    res.status(500).json({ error: 'Failed to delete reason' });
  }
}) as RequestHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});