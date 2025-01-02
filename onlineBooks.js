// Import Axios
const axios = require("axios");

// Set the base URL for the API
const apiBaseUrl = "http://localhost:3000";

// Set the authentication token (if required)
// const authToken = "your-auth-token";
// const token = localStorage.getItem("token");
// useing this for testing purpose
const userName = "john";
const password = "john";

// Create an Axios instance with the base URL and authentication token
const api = axios.create({
  baseURL: apiBaseUrl,
});

// Register a user
async function registerUser(username, password) {
  try {
    const response = await api.post("/register", {
      username,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Login a user
async function loginUser(username, password) {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });
    console.log(response.data);
    // Store the authentication token for future requests
    const token = response.data.accessToken;
    // localStorage.setItem("token", token);
    console.log("the token is ", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } catch (error) {
    console.error(error);
  }
}
// Call the GET /books API
async function getBooks() {
  try {
    const response = await api.get("/books");
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksByISBN() {
  try {
    const response = await api.get("/books/isbn/21906");
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksByTitle() {
  try {
    const response = await api.get("/books/title/The Shining");
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksByAuthor() {
  try {
    const response = await api.get("/books/author/Stephen King");
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
  }
}

// Call the GET /reviews API
async function getReviews(bookId) {
  try {
    const response = await api.get(`/reviews/${bookId}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function registerUserandLogin(userName, password) {
  try {
    await registerUser(userName, password);
    await loginUser(userName, password);
  } catch (error) {
    console.error(error);
  }
}

// Call the APIs
// registerUserandLogin(userName, password);
getBooks();

getBooksByAuthor();

getBooksByTitle();
