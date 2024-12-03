let books = [
  { id: 1, title: "1984", authro: "George Orwell" },
  { id: 2, title: "The Great Gatsby", authro: "F. Scott Fitzgerald" },
  { id: 3, title: "Pride and Prejudice", authro: "Jane Austen" },
  { id: 4, title: "To Kill a Mockingbird", authro: "Harper Lee" },
];

let reviews = [{ id: 1, bookId: 1, content: "Great Writing!" }];

function getBooks() {
  return books;
}

function getBookById(id) {
  return books.find((book) => book.id === id);
}

function getReviews() {
  return reviews;
}

function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

module.exports = { getBooks, getBookById, getReviews, getReviewById };