// Production-ready Express server
// Deploy this to your web server alongside your React build

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Database connection
const dbPath = path.join(__dirname, 'database', 'announcements.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert sample data if empty
  db.get("SELECT COUNT(*) as count FROM announcements", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare('INSERT INTO announcements (title, content, author) VALUES (?, ?, ?)');
      stmt.run(['Welcome to Zeronia!', 'We\'re excited to announce the launch of our new website!', 'Zeronia Team']);
      stmt.run(['New Minigame Release', 'Test your building skills in our latest minigame!', 'Development Team']);
      stmt.run(['Community Event', 'Join our monthly build competition starting next week!', 'Event Coordinators']);
      stmt.finalize();
    }
  });
});

// API Routes
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

app.put('/api/announcements', (req, res) => {
  const { id, title, content, author } = req.body;
  
  if (!id || !title || !content || !author) {
    return res.status(400).json({ error: 'ID, title, content, and author are required' });
  }
  
  const sql = 'UPDATE announcements SET title = ?, content = ?, author = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  
  db.run(sql, [title, content, author, id], function(err) {
    if (err) {
      console.error('Error updating announcement:', err.message);
      res.status(500).json({ error: 'Failed to update announcement' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Announcement not found' });
    } else {
      res.json({ message: 'Announcement updated successfully' });
    }
  });
});

app.delete('/api/announcements', (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  
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

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/announcements`);
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
