import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.routes.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send(`Server is running at ${PORT}`);
});
app.use("/tasks", taskRoutes);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
