import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";
import db from "../db/index.js";

jest.mock("../db/index.js", () => ({
  readTasks: jest.fn(),
  writeTasks: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("Tasks Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllTasks should return all tasks with pagination", async () => {
    const req = { query: { page: 1, limit: 2, filter: "all", sort: "asc", search: "" } };
    const res = mockResponse();

    const mockTasks = [
      { id: "1", title: "Task A", description: "desc", completed: false, createdAt: "2025-08-01" },
      { id: "2", title: "Task B", description: "desc", completed: true, createdAt: "2025-08-02" },
    ];

    db.readTasks.mockResolvedValue(mockTasks);

    await getAllTasks(req, res);

    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 2,
      tasks: mockTasks,
    });
  });

  test("createTask should create a new task", async () => {
    const req = { body: { title: "New Task", description: "Test Desc" } };
    const res = mockResponse();

    db.readTasks.mockResolvedValue([]);
    db.writeTasks.mockResolvedValue();

    await createTask(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.any(String),
      title: "New Task",
      description: "Test Desc",
      completed: false,
      createdAt: expect.any(String),
    }));
  });

  test("updateTask should update existing task", async () => {
    const req = { params: { id: "1" }, body: { title: "Updated Title" } };
    const res = mockResponse();

    const existingTasks = [
      { id: "1", title: "Old Title", description: "Desc", completed: false },
    ];

    db.readTasks.mockResolvedValue(existingTasks);
    db.writeTasks.mockResolvedValue();

    await updateTask(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: "1",
      title: "Updated Title",
    }));
  });

  test("deleteTask should delete a task", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    const existingTasks = [
      { id: "1", title: "Task 1", description: "desc", completed: false },
    ];

    db.readTasks.mockResolvedValue(existingTasks);
    db.writeTasks.mockResolvedValue();

    await deleteTask(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
