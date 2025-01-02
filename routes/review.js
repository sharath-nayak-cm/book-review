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

router.get("/bookId/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let book = books.find((book) => book.isbn == isbn);
  if (book) {
    res.json({ review: book.reviews });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

router.post("/:isbn", async (req, res) => {
  try {
    const { isbn, comment, userName } = req.body;

    // Ensure that ISBN, comment, and userName are provided
    if (!isbn || !comment || !userName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the book by ISBN
    const book = books.find((book) => book.isbn === isbn);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Generate the next review ID (based on the book's reviews)
    const nextReviewId = book.reviews.length
      ? Math.max(...book.reviews.map((r) => r.reviewId)) + 1
      : 1;

    const reviewId = `${book.isbn}-${nextReviewId}`;

    // Create a new review object
    const newReview = {
      reviewId: reviewId,
      userName: userName,
      comment: comment,
    };

    // Push the new review to the book's reviews array
    book.reviews.push(newReview);

    // Respond with a success message
    return res
      .status(200)
      .json({ message: "New review added to book", review: newReview });
  } catch (error) {
    // Catch unexpected errors and return a 500 server error
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
});

router.put("/:isbn/:reviewId", function (req, res) {
  try {
    const isbn = parseInt(req.params.isbn); // Get bookId from URL params
    const reviewId = parseInt(req.params.reviewId); // Get reviewId from URL params
    const newComment = req.body.comment; // Get new comment from the request body

    // Validate if comment is provided
    if (!newComment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    // Find the book by its ID
    const book = books.find((b) => b.isbn == isbn);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Find the review by reviewId within the book's reviews
    const review = book.reviews.find((r) => r.reviewId == reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review's comment
    review.comment = newComment;

    // Respond with the updated review
    return res.status(200).json({
      reviewId: review.id,
      comment: review.comment,
    });
  } catch (error) {
    // Catch any unexpected errors and send a 500 Internal Server Error
    console.error(error);
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
