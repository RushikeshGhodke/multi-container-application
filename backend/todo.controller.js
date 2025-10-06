import Todo from "./todo.model.js";
import asyncHandler from "./utils/asyncHandler.js"

export const getAllTodos = asyncHandler(async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).send(todos);
    } catch (error) {
        res.status(500).send({ message: "Error fetching todos", error });
    }
}
);

export const getTodoById = asyncHandler(async (req, res) => {
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

export const addTodo = asyncHandler(async (req, res) => {
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

export const updateTodo = asyncHandler(async (req, res) => {
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

export const deleteTodo = asyncHandler(async (req, res) => {
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