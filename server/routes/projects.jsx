const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a project
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const newProject = new Project({ name });
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a project
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });
        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: { name } },
            { new: true }
        );
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });
        await Project.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;