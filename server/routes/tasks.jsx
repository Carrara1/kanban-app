const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

// Get all tasks for a project
router.get('/project/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ msg: 'Project not found' });
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a task
router.post('/', async (req, res) => {
    try {
        const { title, description, status, project } = req.body;
        const newTask = new Task({
            title,
            description,
            status,
            project
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, status } },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        await Task.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;