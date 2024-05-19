import express from "express";
import bodyParser from 'body-parser';
const app = express();
const PORT = 8080;
import "dotenv/config";
import { mentorsRouter } from "./routes/mentors.js";
// import usersRouter from './routes/users.js';
import cors from "cors";
// const { User } = require('./models/User');
import knex from 'knex';
import knexfile from './knexfile.js';
const myknex = knex(knexfile);

// const db = require('./db');

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/mentors/search', (req, res) => {
  const { name, specialty, industries } = req.query;
  let query = myknex.select('*').from('mentors');

  if (name) {
    query += ` AND name LIKE '%${name}%'`;
  }
  if (specialty) {
    query += ` AND specialty LIKE '%${specialty}%'`;
  }
  if (industries) {
    query += ` AND industries LIKE '%${industries}%'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error searching for mentors');
    } else {
      res.json(results);
    }
  });
});


app.get('/mentors/featured', (req, res) => {
  const sql = 'SELECT * FROM mentors WHERE is_featured = 1';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching featured mentors from database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Featured mentors not found' });
    }
    res.json(results);
  });
});


app.get('/mentors/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM mentors WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching mentor from database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    const mentor = results[0];
    res.json(mentor);
  });
});

app.post('/mentors', (req, res) => {
  const { name, specialty, industries, contact } = req.body;
  const sql = 'INSERT INTO mentors (name, specialty, industries, contact) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, specialty, industries.join(','), contact], (err, result) => {
    if (err) {
      console.error('Error inserting mentor into database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'Mentor added successfully' });
  });
});


app.use(express.json());
app.use('/mentors', mentorsRouter);
app.use('/users', usersRouter);

// app.use('/', featuredMentorsRouter);

// let posts = [];

// app.post('/api/posts', (req, res) => {
//   const { text, image, avatar } = req.body;
//   const newPost = { text, image, avatar };
//   posts.push(newPost);
//   res.status(201).json({ message: 'Post created successfully' });
// });

// app.post('/api/posts', upload.single('image'), (req, res) => {
//     const { text } = req.body;
//     const image = req.file.path; // Use the path to save or retrieve the image
//     const newPost = { text, image };
//     posts.push(newPost);
//     res.status(201).json({ message: 'Post created successfully' });
// });

app.post('/api/posts', async (req, res) => {
    try {
      const { text, image } = req.body;
      const userId = req.user.id; 
      const user = await User.findById(userId); 
      const newPost = { text, image, avatar: user.avatar };

      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Failed to create post' });
    }
});
  

app.post('/mentors/signup', (req, res) => {
  const { name, email, specialty, bio, password } = req.body;
  const sql = 'INSERT INTO mentors (name, email, specialty, bio, password) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [name, email, specialty, bio, password], (err, result) => {
    if (err) {
      console.error('Error signing up mentor:', err);
      res.status(500).json({ error: 'Error signing up mentor. Please try again later.' });
      return;
    }
    console.log('Mentor signed up:', result.insertId);
    res.status(200).json({ message: 'Mentor signed up successfully.' });
  });
});
  
app.post('/users/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error signing up user:', err);
      res.status(500).json({ error: 'Error signing up user. Please try again later.' });
      return;
    }
    console.log('User signed up:', result.insertId);
    res.status(200).json({ message: 'User signed up successfully.' });
  });
});


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
