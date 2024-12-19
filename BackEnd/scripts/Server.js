const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
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
const tasks = [];

const taskSchema = new mongoose.Schema({
    task: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});
const Task = mongoose.model('Task', taskSchema);


app.post("/tasks", async (req, res) => {
    const {task} = req.body;
    tasks.push({
        ...req.body,
    })
    const newTask = new Task({task});
    await newTask.save();
    res.json(newTask);
})
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})
app.delete('/tasks/:task', async (req, res) => {
    try {
        const taskId = +req.params.task;
        const task = await Task.deleteOne({task: taskId});
        res.json(task);
        console.log("good")
    } catch (error) {
        console.log(error);
    }

})
app.put('/tasks/:task', async (req, res) => {
    try {
        const taskId = req.params.task;
        const tasks = req.body;
        const updatedData = await Task.findOneAndUpdate(
            {task: taskId,} ,
            tasks,
            {new: true},
        );
        if (!updatedData) {
            res.status(404).json('Not Found');
        }
        res.json(updatedData);
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
})