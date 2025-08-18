import { v4 as uuid } from 'uuid';
import db from '../db/index.js';
import { validateTaskPayload } from '../utils/validate.js';

// GET /tasks
export const getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 5, filter = "all", sort = "asc" } = req.query;

    let tasks = await db.readTasks();

    // Filtering
    if (filter === "completed") {
      tasks = tasks.filter(t => t.completed === true);
    } else if (filter === "notcompleted") {
      tasks = tasks.filter(t => t.completed === false);
    }

    // Sorting
    tasks.sort((a, b) =>
      sort === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedTasks = tasks.slice(startIndex, startIndex + Number(limit));

    res.json({
      total: tasks.length,
      page: Number(page),
      limit: Number(limit),
      tasks: paginatedTasks,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
};
// POST /tasks
export async function createTask(req, res, next) {
  try {
    const { error } = validateTaskPayload(req.body, { partial: false });
    if (error) return res.status(400).json({ message: error });

    const tasks = await db.readTasks();

    const newTask = {
      id: uuid(),
      title: req.body.title.trim(),
      description: (req.body.description || '').trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await db.writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
}

// PUT /tasks/:id
export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { error } = validateTaskPayload(req.body, { partial: true });
    if (error) return res.status(400).json({ message: error });

    const tasks = await db.readTasks();
    const idx = tasks.findIndex(t => t.id === id);

    if (idx === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const existing = tasks[idx];

    const updated = {
      ...existing,
      ...(req.body.title !== undefined && { title: req.body.title.trim() }),
      ...(req.body.description !== undefined && { description: req.body.description.trim() }),
      ...(req.body.completed !== undefined && { completed: !!req.body.completed })
    };

    tasks[idx] = updated;
    await db.writeTasks(tasks);

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /tasks/:id
export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const tasks = await db.readTasks();
    const exists = tasks.some(t => t.id === id);

    if (!exists) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const nextTasks = tasks.filter(t => t.id !== id);
    await db.writeTasks(nextTasks);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}