const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'announcements.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create announcements table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Announcements table created successfully');
    }
  });

  // Insert test announcements
  const testAnnouncements = [
    {
      title: "Welcome to Zeronia!",
      content: "We're excited to announce the launch of our new website! Join us for amazing minigames and community events.",
      author: "Zeronia Team"
    },
    {
      title: "New Minigame Release: Snowy Skirmish",
      content: "Test your snow-faring skills in our latest minigame!", 
      author: "Development Team"
    },
    {
      title: "Community Event: Discord Server Party",
      content: "Join our Discord server party, link to the server ison the home page.",
      author: "Event Coordinators"
    }
  ];

  // Clear existing test data and insert new ones
  db.run('DELETE FROM announcements', (err) => {
    if (err) {
      console.error('Error clearing existing data:', err.message);
    } else {
      console.log('Cleared existing announcements');
    }
  });

  const stmt = db.prepare('INSERT INTO announcements (title, content, author) VALUES (?, ?, ?)');
  
  testAnnouncements.forEach((announcement, index) => {
    stmt.run([announcement.title, announcement.content, announcement.author], function(err) {
      if (err) {
        console.error('Error inserting announcement:', err.message);
      } else {
        console.log(`Inserted announcement ${index + 1}: ${announcement.title}`);
      }
    });
  });

  stmt.finalize();
});

// Close database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed');
  }
});
