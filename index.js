const express = require('express');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const moment = require('moment');
require('moment/locale/ka');

require('dotenv').config();

const app = express();

app.locals.moment = moment;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Fixed

// Serve static files
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist'))); // Fixed
app.use(express.static(path.join(__dirname, 'public'))); // Fixed

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON data

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'images')); // Fixed
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Example: 1234567890.png
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Route to fetch data and render it in tasks.ejs
app.get('/', async (req, res) => {
    try {
        const statResp = await axios.get('https://momentum.redberryinternship.ge/api/statuses', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const priorResp = await axios.get('https://momentum.redberryinternship.ge/api/priorities', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const deparResp = await axios.get('https://momentum.redberryinternship.ge/api/departments', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const tasksResp = await axios.get('https://momentum.redberryinternship.ge/api/tasks', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const empResp = await axios.get('https://momentum.redberryinternship.ge/api/employees', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        res.render('tasks', {
            statuses: statResp.data,
            priorities: priorResp.data,
            departments: deparResp.data,
            tasks: tasksResp.data,
            employees: empResp.data,
            title: "Tasks"
        });
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

app.get('/task/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const statResp = await axios.get('https://momentum.redberryinternship.ge/api/statuses', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const priorResp = await axios.get('https://momentum.redberryinternship.ge/api/priorities', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const deparResp = await axios.get('https://momentum.redberryinternship.ge/api/departments', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const taskResp = await axios.get(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        if (!taskResp) {
            return res.status(404).send('Task not found');
        }

        const empResp = await axios.get('https://momentum.redberryinternship.ge/api/employees', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const commentResp = await axios.get(`https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`, {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        res.render('task', {
            title: "View Task",
            task: taskResp.data,
            statuses: statResp.data,
            priorities: priorResp.data,
            departments: deparResp.data,
            employees: empResp.data,
            comments: commentResp.data
        });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send("API Error: " + error.response.data.message);
        } else if (error.request) {
            res.status(500).send("No response from API.");
        } else {
            res.status(500).send("Request setup error: " + error.message);
        }
    }
});

app.get('/add-task', async (req, res) => {
    try {
        const statResp = await axios.get('https://momentum.redberryinternship.ge/api/statuses', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const priorResp = await axios.get('https://momentum.redberryinternship.ge/api/priorities', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const deparResp = await axios.get('https://momentum.redberryinternship.ge/api/departments', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        const empResp = await axios.get('https://momentum.redberryinternship.ge/api/employees', {
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
        });

        res.render('addTask', {
            statuses: statResp.data,
            priorities: priorResp.data,
            departments: deparResp.data,
            employees: empResp.data,
            title: "Add Task"
        });
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

app.post("/add-employee", upload.single('avatar'), async (req, res) => {
    const { name, surname, department } = req.body;
    const department_id = parseInt(department);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('department_id', department_id);

    if (req.file) {
        formData.append('avatar', fs.createReadStream(req.file.path));
    } else {
        formData.append('avatar', fs.createReadStream(path.join(__dirname, 'public', 'images', 'default.jpg')));
    }

    try {
        await axios.post('https://momentum.redberryinternship.ge/api/employees', formData, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
                ...formData.getHeaders()
            }
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/add-task", async (req, res) => {
    const { name, department, description, date, employee, priority, status } = req.body;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('due_date', date);
    formData.append('status_id', parseInt(status));
    formData.append('priority_id', parseInt(priority));
    formData.append('department_id', parseInt(department));
    formData.append('employee_id', parseInt(employee));

    try {
        await axios.post('https://momentum.redberryinternship.ge/api/tasks', formData, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
                ...formData.getHeaders()
            }
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/add-comment", async (req, res) => {
    const { task_id, text } = req.body;

    const formData = new FormData();
    formData.append('text', text);
    formData.append('task_id', task_id);

    try {
        await axios.post('https://momentum.redberryinternship.ge/api/tasks/' + task_id + '/comments', formData, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
                ...formData.getHeaders()
            }
        });
        res.redirect('/task/' + task_id);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/add-reply", async (req, res) => {
    const { parent_id, task_id, text } = req.body;

    const formData = new FormData();
    formData.append('text', text);
    formData.append('task_id', task_id);
    formData.append('parent_id', parent_id);

    try {
        await axios.post('https://momentum.redberryinternship.ge/api/tasks/' + task_id + '/comments', formData, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
                ...formData.getHeaders()
            }
        });
        res.redirect('/task/' + task_id);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
