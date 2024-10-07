import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Create the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Set EJS as the templating engine
app.set('view engine', 'ejs'); // Set EJS as view engine
app.set('views', path.join(__dirname, 'views')); // Set the directory for views

// Basic route
app.get('/', async (req, res) => {
    try {
        const result = await axios.get('https://api.adviceslip.com/advice');
        const data = result.data; // Get the response data
        res.render("index.ejs", {
            advice: data,
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
