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

const addReviewToBook = async (book, newReview) => {
  await book.reviews.push(newReview);
};

const deleteReviewFromBook = async (book, reviewId) => {
  console.log("calling deleteReviewFromBook ----", reviewId);
  await book.reviews.push(reviewId);
};

router.get("/bookId/:isbn", function (req, res) {
  console.log("==========calling the isbn methods====", req.params.isbn);
  // Retrieve the email parameter from the request URL and send the corresponding friend's details
  const isbn = req.params.isbn;
  let book = books.find((book) => book.isbn == isbn);
  console.log("the book is ------", book);
  if (book) {
    res.json({ review: book.reviews });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

router.get("/title/:title", function (req, res) {
  console.log("==========calling the isbn methods====", req.params.title);
  const title = req.params.title;
  let book = books.find((book) => book.title == title);
  console.log("the book is ------", book);
  if (book) {
    res.json({ review: book.reviews });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

router.post("/:isbn", function (req, res) {
  // Check if email is provided in the request body
  if (req.body.isbn) {
    const isbn = req.body.isbn;

    let book = books.find((book) => book.isbn == isbn);
    console.log("the book is ------", book);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
    }
    // this is bad way of doing but usually we will get this id from databases
    const nextReviewId = book.reviews.length
      ? Math.max(...book.reviews.map((r) => r.reviewId)) + 1
      : 1;

    const reviewId = `${book.isbn}-${nextReviewId}`;

    const comment = req.body.comment;
    const userName = req.body.userName;

    const newReview = {
      reviewId: reviewId,
      userName: userName,
      comment: comment,
    };

    console.log("the book new review is ------", newReview);

    addReviewToBook(book, newReview);
    res.send("New review added to book");
  }
});

router.delete("bookId/:isbn/reviewId/:reviewId", async (req, res) => {
  // Extract email parameter from request URL
  const isbn = req.body.isbn;
  const reviewId = req.body.reviewId;

  let book = await books.find((book) => book.isbn == isbn);
  console.log("the book is ------", book);
  if (book) {
    let review = book.reviews.find((r) => r.id == reviewId);
    if (review) {
      const success = await deleteReviewFromBook(bookId, reviewId);
      success
        ? res.send(`Friend with the email ${email} deleted.`)
        : res.status(404).json({ error: "something went wrong" });
    } else {
      res.status(404).json({ error: "review not found" });
    }
  } else {
    res.status(404).json({ error: "Book not found" });
  }

  // Send response confirming deletion of friend
  res.send(`Friend with the email ${email} deleted.`);
});

module.exports = router;
