let { getBooks, getBookById, getReviews, getReviewById } = require("./book.js");
let express = require("express");
let app = express();
app.use(express.json());

app.get("/api/books", async (req, res) => {
  try {
    let books = await getBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "no books found." });
    }
    return res.json(books);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/books/:id", async (req, res) => {
  try {
    let book = await getBookById(parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "book not found." });
    return res.json(book);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    let reviews = await getReviews();
    if (reviews.length === 0)
      return res.status(404).json({ error: "no reviews found." });
    return res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/reviews/:id", async (req, res) => {
  try {
    let review = await getReviewById(req.params.id);
    if (!review) return res.status(404).json({ error: "review not found." });
    return res.json(review);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = { app };
