const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.listen(7000, () => {
    console.log("Server started on port 7000");
})
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://domik12560:Kuzka2001@cluster0.sju2l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
const tasks = [];  // Это массив для хранения задач

const taskSchema = new mongoose.Schema({
    task: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});
const Task = mongoose.model('Task', taskSchema);

app.post("/tasks", async(req, res) => {
    const {task} = req.body;
    const newTask = new Task({task});
     await newTask.save();
    res.json(newTask);
})
