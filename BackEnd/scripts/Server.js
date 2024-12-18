const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());

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
