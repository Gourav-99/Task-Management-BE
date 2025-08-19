import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/tasks.routes.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(ExpressMongoSanitize());

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
