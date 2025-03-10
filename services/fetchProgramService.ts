import express, { Request, Response } from 'express';
import axios from 'axios';
import { JSDOM, VirtualConsole } from 'jsdom';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.FETCH_PROGRAM_SERVICE_PORT || 3000;

app.use(cors());

interface Advisor {
  advisor: string;
  email: string;
  programs: string;
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
  try{
  const data = await fs.readFile("./reasons.json", 'utf-8');
  const reasons = JSON.parse(data);
  res.json(reasons);
} catch (error) {
  console.error('Error fetching data:', error);
  res.status(500).send('Error fetching data');
}
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 