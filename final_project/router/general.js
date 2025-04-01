const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    // Send JSON response with formatted friends data
    res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
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
    res.send(foundBooks);
});

function stringHasSubstring(mainString, substring) {
    return mainString.indexOf(substring) !== -1;
}

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
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
    res.send(foundBooks);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
