const express = require("express");
const configMiddleware = require("./middleware/serversetup");
// const pool = require("./dbConnect")
// const bookRouter = require("./routes/book-router");

const server = express();
configMiddleware(server);

server.get("/", (req, res) => {
  res.send("<h1>Hello its working</h1>");
});

// server.get("/all-books", (req, res)=>{
//   res.send(bookRouter, "<h2> ooook</h2>")
// });


const GET_ALL_BOOKS = 'SELECT * FROM books';
const INSERT_BOOK = 'INSERT * FROM books';

// server.get("/books", (req,res) => {
//     pool.query(GET_ALL_BOOKS, (err, results)=>{
//         if err thro
//     })
// })


module.exports = server;