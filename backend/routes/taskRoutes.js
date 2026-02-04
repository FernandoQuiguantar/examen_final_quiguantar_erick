const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

// GET /api/tasks - Listar todas
router.get('/', async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/tasks/:id - Obtener una por ID
router.get('/:id', async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/tasks - Crear
router.post('/', async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        // Captura el error 400 de la validación de descripción/DONE
        res.status(error.status || 400).json({ message: error.message });
    }
});

// PUT /api/tasks/:id - Editar
router.put('/:id', async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
});

// DELETE /api/tasks/:id - Eliminar
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await taskService.deleteTask(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;