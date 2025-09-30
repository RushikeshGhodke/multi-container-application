import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import Todo from "./todo.model.js";

configDotenv();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// --- API ROUTES ---

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    await Todo.deleteMany({});
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ message: "Error fetching todos", error });
  }
});

// GET a single todo by its incremental 'todo_id'
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todoById = await Todo.findOne({ todo_id: id });

    if (!todoById) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.status(200).send(todoById);
  } catch (error) {
    res.status(500).send({ message: "Error fetching todo", error });
  }
});

// POST a new todo
app.post("/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).send({ message: "Title is required." });
    }

    const newTodo = await Todo.create({ title, description });

    res.status(201).send(newTodo);
  } catch (error) {
    res.status(500).send({ message: "Error creating todo", error });
  }
});

// UPDATE a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;

    const updatedTodo = await Todo.findOneAndUpdate(
      { todo_id: id },
      { title, description }
    );

    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(500).send({ message: "Error updating todo", error });
  }
});

// DELETE a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTodo = await Todo.deleteOne({ todo_id: id });

    if (!deletedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    res.status(200).send({ message: "Todo Deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error updating todo", error });
  }
});

// --- DATABASE CONNECTION AND SERVER START ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));
