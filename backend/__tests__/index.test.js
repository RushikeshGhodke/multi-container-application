import request from 'supertest';
import { setupTestDB, teardownTestDB, clearTestDB } from './setup.js';
import { createApp } from '../app.js';
import Todo from '../todo.model.js';

describe('Todo API Tests', () => {
    let app;

    beforeAll(async () => {
        await setupTestDB();
        app = createApp(); // Use the same app factory as production!
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    beforeEach(async () => {
        await clearTestDB();
    });

    describe('POST /todos', () => {
        test('should create a new todo', async () => {
            const todoData = {
                title: 'Test Todo',
                description: 'Test Description'
            };

            const response = await request(app)
                .post('/todos')
                .send(todoData)
                .expect(201);

            expect(response.body.title).toBe(todoData.title);
            expect(response.body.description).toBe(todoData.description);
            expect(response.body.todo_id).toBeDefined();
        });

        test('should return 400 if title is missing', async () => {
            const response = await request(app)
                .post('/todos')
                .send({ description: 'Test Description' })
                .expect(400);

            expect(response.body.message).toBe('Title is required.');
        });
    });

    describe('GET /todos', () => {
        test('should fetch all todos and delete them', async () => {
            await Todo.create({ title: 'Todo 1', description: 'Desc 1' });
            await Todo.create({ title: 'Todo 2', description: 'Desc 2' });

            const response = await request(app)
                .get('/todos')
                .expect(200);

            expect(response.body).toHaveLength(2);

            const remainingTodos = await Todo.find();
            expect(remainingTodos).toHaveLength(0);
        });
    });

    describe('GET /todos/:id', () => {
        test('should fetch a todo by id', async () => {
            const todo = await Todo.create({ title: 'Test Todo', description: 'Test Desc' });

            const response = await request(app)
                .get(`/todos/${todo.todo_id}`)
                .expect(200);

            expect(response.body.title).toBe('Test Todo');
        });

        test('should return 404 if todo not found', async () => {
            const response = await request(app)
                .get('/todos/999')
                .expect(404);

            expect(response.body.message).toBe('Todo not found');
        });
    });

    describe('PUT /todos/:id', () => {
        test('should update a todo', async () => {
            const todo = await Todo.create({ title: 'Original', description: 'Original Desc' });

            const response = await request(app)
                .put(`/todos/${todo.todo_id}`)
                .send({ title: 'Updated', description: 'Updated Desc' })
                .expect(200);

            expect(response.body.title).toBe('Updated');
        });
    });

    describe('DELETE /todos/:id', () => {
        test('should delete a todo', async () => {
            const todo = await Todo.create({ title: 'To Delete', description: 'Will be deleted' });

            await request(app)
                .delete(`/todos/${todo.todo_id}`)
                .expect(200);

            const deletedTodo = await Todo.findOne({ todo_id: todo.todo_id });
            expect(deletedTodo).toBeNull();
        });
    });

    describe('Health Check', () => {
        test('should return health status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);

            expect(response.body.status).toBe('OK');
            expect(response.body.timestamp).toBeDefined();
        });
    });
});