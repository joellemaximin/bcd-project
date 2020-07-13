const express = require("express");
const configMiddleware = require("./middleware/serversetup");
const pool = require("./middleware/dbConnect")
// const bookRouter = require("./routes/book-router");
const path = require('path')


const server = express();
configMiddleware(server);



// server.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

// server.get("/", (req, res) => {
//   res.send("<h1>Hello, its working</h1>");
// });



module.exports = server;