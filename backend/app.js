import express from 'express';
import cors from 'cors';
import todoRoutes from './todo.routes.js';

const app = express();

console.log('app created');

app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Todo routes
app.use('/todos', todoRoutes);

export default app;
