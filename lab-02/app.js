const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

// Initialize database, create table, insert sample data, and start server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        price INTEGER,
        pages INTEGER
      );
    `);

    const books = await db.all("SELECT * FROM book;");

    if (books.length === 0) {
      await db.run(`
        INSERT INTO book (title, author, price, pages)
        VALUES
          ('Harry Potter', 'J.K. Rowling', 500, 350),
          ('The Hobbit', 'J.R.R. Tolkien', 400, 310),
          ('Wings of Fire', 'A.P.J. Abdul Kalam', 250, 180),
          ('The Alchemist', 'Paulo Coelho', 300, 200),
          ('Atomic Habits', 'James Clear', 450, 320),
          ('Rich Dad Poor Dad', 'Robert Kiyosaki', 350, 240),
          ('Think and Grow Rich', 'Napoleon Hill', 280, 260),
          ('Ikigai', 'Hector Garcia', 320, 190),
          ('Deep Work', 'Cal Newport', 400, 280),
          ('The Power of Habit', 'Charles Duhigg', 380, 290);
      `);
    }

    app.listen(3000, () => {
      console.log("Database initialized successfully!");
      console.log("Server running at http://localhost:3000/");
    });
  } catch (error) {
    console.error("Database or Server Error:", error.message);
    process.exit(1);
  }
};

// GET: Retrieve all books
app.get("/books/", async (request, response) => {
  try {
    const query = "SELECT * FROM book;";
    const books = await db.all(query);

    response.status(200).json(books);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// GET: Retrieve one book by ID
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const query = "SELECT * FROM book WHERE id = ?;";
    const book = await db.get(query, [bookId]);

    if (!book) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json(book);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// POST: Add a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    if (
      title === undefined ||
      author === undefined ||
      price === undefined ||
      pages === undefined
    ) {
      return response.status(400).json({
        error: "title, author, price and pages are required",
      });
    }

    const query = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;

    const result = await db.run(query, [
      title,
      author,
      price,
      pages,
    ]);

    response.status(201).json({
      message: "Book added successfully",
      bookId: result.lastID,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// PUT: Update a book by ID
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    if (
      title === undefined ||
      author === undefined ||
      price === undefined ||
      pages === undefined
    ) {
      return response.status(400).json({
        error: "title, author, price and pages are required",
      });
    }

    const query = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;

    const result = await db.run(query, [
      title,
      author,
      price,
      pages,
      bookId,
    ]);

    if (result.changes === 0) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a book by ID
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const query = "DELETE FROM book WHERE id = ?;";
    const result = await db.run(query, [bookId]);

    if (result.changes === 0) {
      return response.status(404).json({ error: "Book not found" });
    }

    response.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Start the application
initializeDBAndServer();