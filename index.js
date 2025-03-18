const express = require('express');
const axios = require('axios');
const path = require('path');

require('dotenv').config();

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join('views')); // Point to the 'views' folder

// Serve static files (like CSS, images, etc.)
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

app.use(express.static('public'));



// Route to fetch data and render it in the tasks.ejs
app.get('/', async (req, res) => {
    try {
        // Fetch data from API with Bearer Token
        const statResp = await axios.get('https://momentum.redberryinternship.ge/api/statuses', {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        });

        const priorResp = await axios.get('https://momentum.redberryinternship.ge/api/priorities', {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        });

        const deparResp = await axios.get('https://momentum.redberryinternship.ge/api/departments', {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        });

        const tasksResp = await axios.get('https://momentum.redberryinternship.ge/api/tasks', {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        });

        const empResp = await axios.get('https://momentum.redberryinternship.ge/api/employees', {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        });

        // Pass the data to the EJS template
        res.render('tasks', { statuses: statResp.data, priorities: priorResp.data, departments: deparResp.data, tasks: tasksResp.data, employees: empResp.data, title: "Tasks" });
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

app.get('/task', async (req, res) => {
    try {
        // Pass the data to the EJS template
        res.render('insideTask', { title: "View task" });
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

app.get('/add', async (req, res) => {
    try {
        // Pass the data to the EJS template
        res.render('addTask', { title: "Add task" });
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
