//24 4 vakaraa changed draugs

require('dotenv').config();
console.log(process.env);

const express = require('express');
const cors = require('cors');
// const { Pool } = require('pg') // You don't seem to use Pool directly anymore
const { query } = require('./helpers/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

// ✅ Add this: Root route to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send('API is running! Try /tasks or POST to /new.');
});

// ✅ GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await query('SELECT * FROM task');
    res.status(200).json(result.rows || []);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create a new task
app.post('/new', async (req, res) => {
  try {
    const result = await query(
      'INSERT INTO task (description) VALUES ($1) RETURNING *',
      [req.body.description]
    );
    res.status(200).json({ id: result.rows[0].id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a task
app.delete('/delete/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await query('DELETE FROM task WHERE id = $1', [id]);
    res.status(200).json({ id: id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});