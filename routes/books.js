const express = require("express");

const router = express.Router();

const books = [
  {
    isbn: "148410",
    author: "J.K. Rowling",
    title: "Harry Potter and the Philosopher's Stone",
    reviews: [
      {
        reviewId: 1,
        userName: "sam",
        comment: "This book is amazing! I loved it.",
      },
      {
        reviewId: 2,
        userName: "John",
        comment: "Great story, but a bit slow-paced.",
      },
    ],
  },
  {
    isbn: "7378",
    author: "J.R.R. Tolkien",
    title: "The Lord of the Rings",
    reviews: [
      {
        reviewId: 3,
        userName: "Mike",
        comment: "A classic! One of the best books I've ever read.",
      },
    ],
  },
  {
    isbn: "316",
    author: "George R.R. Martin",
    title: "A Game of Thrones",
    reviews: [],
  },
  {
    isbn: "21906",
    author: "Stephen King",
    title: "The Shining",
    reviews: [
      {
        reviewId: 4,
        userName: "sam",
        comment: "A chilling tale that will keep you up all night.",
      },
      {
        reviewId: 5,
        userName: "John",
        comment: "Great story, but a bit slow-paced.",
      },
    ],
  },
  {
    isbn: "28423",
    author: "George Orwell",
    title: "1984",
    reviews: [
      {
        reviewId: 6,
        userName: "min",
        comment: "A chilling and thought-provoking dystopian novel.",
      },
    ],
  },
];

// GET request: Retrieve all books
router.get("/", (req, res) => {
  console.log("==========calling the get / methods====");
  // Send JSON response with formatted books data
  res.send(books);
});

// GET by specific ID request: Retrieve a books based on  isbn
router.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let book = books.find((book) => book.isbn == isbn);
  console.log("the book is ------", book);
  if (book) {
    res.send(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

router.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let book = books.find((book) => book.author == author);
  console.log("the book is ------", book);
  res.send(book);
});

router.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let book = books.find((book) => book.title == title);
  console.log("the book is ------", book);
  res.send(book);
});

router.delete("/:isbn/:reviewId", async (req, res) => {
  const isbn = req.params.isbn;
  const reviewId = req.params.reviewId;

  let book = await books.find((book) => book.isbn == isbn);
  if (book) {
    book.reviews = book.reviews.filter((r) => r.reviewId != reviewId);
    console.log("-the book review after  is ------", book.reviews);
  } else {
    res.status(404).json({ error: "Book not found" });
  }

  // Send response confirming deletion of friend
  res.send(`Review for the book  ${book.title} deleted.`);
});

module.exports = router;
