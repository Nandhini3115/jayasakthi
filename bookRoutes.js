const express = require("express");

const router = express.Router();
const Book = require("../models/book");
// INSERT 7 SAMPLE BOOKS (CREATE)
router.get("/seed", async (req, res) => {
  try {
    await Book.insertMany([
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Programming",
        publishedYear: 2008,
        availableCopies: 5
      },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        category: "Computer Science",
        publishedYear: 2009,
        availableCopies: 3
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        publishedYear: 2016,
        availableCopies: 4
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        publishedYear: 2018,
        availableCopies: 6
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        category: "Self Help",
        publishedYear: 2017,
        availableCopies: 2
      },
      {
        title: "Data Science Handbook",
        author: "Jake VanderPlas",
        category: "Data Science",
        publishedYear: 2015,
        availableCopies: 1
      },
      {
        title: "Python Crash Course",
        author: "Eric Matthes",
        category: "Programming",
        publishedYear: 2019,
        availableCopies: 7
      }
    ]);

    res.json({ message: "7 books inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});
// GET books by category
router.get("/category/:category", async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category books" });
  }
});


router.post("/add", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: "Book added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});
router.get("/category/:cat", async (req, res) => {
  const books = await Book.find({ category: req.params.cat });
  res.json(books);
});
router.put("/copies/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.availableCopies + req.body.change < 0)
      return res.status(400).json({ error: "Negative stock not allowed" });

    book.availableCopies += req.body.change;
    await book.save();
    res.json({ message: "Copies updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  if (book.availableCopies !== 0)
    return res.status(400).json({ error: "Copies still available" });

  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});
module.exports = router;
