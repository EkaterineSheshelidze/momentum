const express = require('express');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

require('dotenv').config();

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join('views')); // Point to the 'views' folder

// Serve static files (like CSS, images, etc.)
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON data

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Store files in 'public/images'
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Example: 1234567890.png
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

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
        res.status(500).send('Error fetching data ' + error.message);
    }
});

app.get('/task', async (req, res) => {
    try {
        // Pass the data to the EJS template
        res.render('task', { title: "View task" });
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

app.get('/add-task', async (req, res) => {
    try {
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

        const empResp = await axios.get('https://momentum.redberryinternship.ge/api/employees', {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        });

        // Pass the data to the EJS template
        res.render('addTask', { statuses: statResp.data, priorities: priorResp.data, departments: deparResp.data, employees: empResp.data, title: "Add task" });
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

 app.post("/add-employee", upload.single('avatar'), async (req, res) => {
     const name = req.body.name;
     const surname = req.body.surname;
     const department_id = parseInt(req.body.department);

     const formData = new FormData();
     formData.append('name', name);
     formData.append('surname', surname);
     formData.append('department_id', department_id);

     // Append file correctly if it exists
     if (req.file) {
         formData.append('avatar', fs.createReadStream(req.file.path));
     } else {
         // Handle case where no file is uploaded if necessary
         formData.append('avatar', fs.createReadStream('images/default.jpg'));
     }

     try {
         const response = await axios.post('https://momentum.redberryinternship.ge/api/employees', formData, {
             headers: {
                 Authorization: `Bearer ${process.env.API_TOKEN}`,
                 ...formData.getHeaders() // Proper multipart headers
             }
         });

         res.redirect('/'); // Redirect on success
     } catch (error) {
         if (error.response) {
             console.error("API Response Error:", error.response.data);
             res.status(error.response.status).send("API Error: " + error.response.data.message);
         } else if (error.request) {
             console.error("No response received:", error.request);
             res.status(500).send("No response from API.");
         } else {
             console.error("Axios setup error:", error.message);
             res.status(500).send("Request setup error: " + error.message);
         }
     }
});

app.post("/add-task", async (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const department_id = parseInt(req.body.department);
    const description = req.body.description;
    const date = req.body.date;

    const employee_id = parseInt(req.body.employee);
    const priority_id = parseInt(req.body.priority);
    const status_id = parseInt(req.body.status);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('due_date', date);


    formData.append('status_id', status_id);
    formData.append('priority_id', priority_id);
    formData.append('department_id', department_id);
    formData.append('employee_id', employee_id);

    try {
        const response = await axios.post('https://momentum.redberryinternship.ge/api/tasks', formData, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
                ...formData.getHeaders() // Proper multipart headers
            }
        });

        res.redirect('/'); // Redirect on success
    } catch (error) {
        if (error.response) {
            console.error("API Response Error:", error.response.data);
            res.status(error.response.status).send("API Error: " + error.response.data.message);
        } else if (error.request) {
            console.error("No response received:", error.request);
            res.status(500).send("No response from API.");
        } else {
            console.error("Axios setup error:", error.message);
            res.status(500).send("Request setup error: " + error.message);
        }
    }
});


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
