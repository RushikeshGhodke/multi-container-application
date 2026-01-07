import { Router } from "express";

import { getTodoById, getAllTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = Router();

router.route('/').get(getAllTodos);
router.route('/').post(addTodo);
router.route('/:id').get(getTodoById);
router.route('/:id').put(updateTodo);
router.route('/:id').delete(deleteTodo);

export default router;
