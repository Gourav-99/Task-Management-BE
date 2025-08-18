import { Router } from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks.controller.js';

const router = Router();

// GET /tasks → Returns all tasks
router.get('/', getAllTasks);

// POST /tasks → Creates a new task
router.post('/', createTask);

// PUT /tasks/:id → Updates a task
router.put('/:id', updateTask);

// DELETE /tasks/:id → Deletes a task
router.delete('/:id', deleteTask);

export default router;