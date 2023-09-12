const express = require('express');
const cors = require('cors');
const Redis = require('ioredis'); 

const app = express();
const PORT = process.env.PORT || 3000;

const allowedHeaders = ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'];
app.use(cors({
    origin: '*',
    allowedHeaders,
}));

app.use(express.json());

 const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

let todos = [];

const loadTodosFromRedis = async () => {
    try {
        const todosData = await redis.get('todos');
        if (todosData) {
            todos = JSON.parse(todosData);
        }
    } catch (error) {
        console.error('Error loading todos from Redis:', error);
    }
};

loadTodosFromRedis();

const saveTodosToRedis = () => {
    try {
        redis.set('todos', JSON.stringify(todos));
    } catch (error) {
        console.error('Error saving todos to Redis:', error);
    }
};

app.post('/todos', (req, res) => {
    const { title } = req.body;
    const id = todos.length + 1;
    const newTodo = { id, title, isDone: false };
    todos.push(newTodo);

    saveTodosToRedis();

    res.status(201).json(newTodo);
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
        todos[index] = { ...todos[index], ...updatedTodo };

        saveTodosToRedis();

        res.json(todos[index]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1)[0];

        saveTodosToRedis();

        res.json(deletedTodo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
