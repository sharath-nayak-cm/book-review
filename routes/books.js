const express = require("express");

const router = express.Router();

const books = require("../db/books.json");

// GET request: Retrieve all books
router.get("/", (req, res) => {
  console.log("==========calling the get / methods====", req);
  // Send JSON response with formatted books data
  res.send(JSON.stringify(books, null, 4));
});

// GET by specific ID request: Retrieve a books based on  isbn
router.get("/isbn/:isbn", function (req, res) {
  console.log("==========calling the isbn methods====", req.params.isbn);
  // Retrieve the email parameter from the request URL and send the corresponding friend's details
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
  // Retrieve the email parameter from the request URL and send the corresponding friend's details
  const author = req.params.author;
  let book = books.find((book) => book.author == author);
  console.log("the book is ------", book);
  res.send(book);
});

router.get("/title/:title", function (req, res) {
  // Retrieve the email parameter from the request URL and send the corresponding friend's details
  const title = req.params.title;
  let book = books.find((book) => book.title == title);
  console.log("the book is ------", book);
  res.send(book);
});

router.post("/", function (req, res) {
  // Check if email is provided in the request body
  if (req.body.email) {
    // Create or update friend's details based on provided email
    books[req.body.email] = {
      firstName: req.body.firstName,
      // Add similarly for lastName
      // Add similarly for DOB
    };
  }
  // Send response indicating user addition
  res.send("The user" + " " + req.body.firstName + " Has been added!");
});

// PUT request: Update the details of a friend with email id
router.put("/:email", function (req, res) {
  // Extract email parameter from request URL
  const email = req.params.email;
  let friend = books[email]; // Retrieve friend object associated with email

  if (friend) {
    // Check if friend exists
    let DOB = req.body.DOB;
    // Add similarly for firstName
    // Add similarly for lastName

    // Update DOB if provided in request body
    if (DOB) {
      friend["DOB"] = DOB;
    }
    // Add similarly for firstName
    // Add similarly for lastName

    books[email] = friend; // Update friend details in 'books' object
    res.send(`Friend with the email ${email} updated.`);
  } else {
    // Respond if friend with specified email is not found
    res.send("Unable to find friend!");
  }
});

module.exports = router;
