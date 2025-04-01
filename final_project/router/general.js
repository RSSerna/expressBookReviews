const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});

let promiseTimeout = 2000;

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Promise done");
            resolve()
        }, promiseTimeout)
    })
    console.log("Get the book list available in the shop");
    booksPromise.then(() => {
        res.send(JSON.stringify(books, null, 4));
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Promise done");
            resolve()
        }, promiseTimeout)
    })
    console.log("Get book details based on ISBN");
    const isbn = req.params.isbn;
    booksPromise.then(() => {
        res.send(books[isbn]);
    });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Promise done");
            resolve()
        }, promiseTimeout)
    })
    console.log("Get book details based on author");
    let authorName = req.params.author;

    let foundBooks = [];
    for (let key in books) {
        if (books.hasOwnProperty(key)) {
            let book = books[key];
            if (book.author.toLowerCase() === authorName.toLowerCase()) {
                foundBooks.push(book);
            }
        }
    }
    booksPromise.then(() => {
        res.send(foundBooks);
    });
});

function stringHasSubstring(mainString, substring) {
    return mainString.indexOf(substring) !== -1;
}

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    let booksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Promise done");
            resolve()
        }, promiseTimeout)
    })
    console.log("Get all books based on title");
    let title = req.params.title;

    let foundBooks = [];
    for (let key in books) {
        if (books.hasOwnProperty(key)) {
            let book = books[key];
            if (stringHasSubstring(book.title.toLowerCase(), title.toLowerCase())
            ) {
                foundBooks.push(book);
            }
        }
    }
    booksPromise.then(() => {
        res.send(foundBooks);
    });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
