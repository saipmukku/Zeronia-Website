const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbPath = path.join(__dirname, 'database', 'announcements.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// API Routes

// Get all announcements
app.get('/api/announcements', (req, res) => {
  const sql = 'SELECT * FROM announcements ORDER BY created_at DESC';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching announcements:', err.message);
      res.status(500).json({ error: 'Failed to fetch announcements' });
    } else {
      res.json(rows);
    }
  });
});

// Get single announcement by ID
app.get('/api/announcements/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM announcements WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Error fetching announcement:', err.message);
      res.status(500).json({ error: 'Failed to fetch announcement' });
    } else if (!row) {
      res.status(404).json({ error: 'Announcement not found' });
    } else {
      res.json(row);
    }
  });
});

// Create new announcement
app.post('/api/announcements', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }
  
  const sql = 'INSERT INTO announcements (title, content, author) VALUES (?, ?, ?)';
  
  db.run(sql, [title, content, author], function(err) {
    if (err) {
      console.error('Error creating announcement:', err.message);
      res.status(500).json({ error: 'Failed to create announcement' });
    } else {
      res.json({ id: this.lastID, title, content, author });
    }
  });
});

// Update announcement
app.put('/api/announcements/:id', (req, res) => {
  const id = req.params.id;
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }
  
  const sql = 'UPDATE announcements SET title = ?, content = ?, author = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  
  db.run(sql, [title, content, author, id], function(err) {
    if (err) {
      console.error('Error updating announcement:', err.message);
      res.status(500).json({ error: 'Failed to update announcement' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Announcement not found' });
    } else {
      res.json({ id, title, content, author });
    }
  });
});

// Delete announcement
app.delete('/api/announcements/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM announcements WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error deleting announcement:', err.message);
      res.status(500).json({ error: 'Failed to delete announcement' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Announcement not found' });
    } else {
      res.json({ message: 'Announcement deleted successfully' });
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});
