const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const pool = require("./dbConnect")
const bodyParser = require('body-parser')
const path = require('path')
const config = require("./db.config.js");
require('dotenv').config();

// routers

const bookRouter = require("../routes/book-router");
const cateRouter = require("../routes/cate-router");
const studentRouter = require("../routes/student-router");
const book_borrowed = require("../routes/book_borrowed-router");
const userRouter = require("../routes/auth");



// exports
module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(morgan("dev"));
  server.use(express.urlencoded({ extended: true }));
  // if (server.get('env') === 'production') {
  //   server.set('trust proxy', 1) // trust first proxy
  //   config.secret.cookie.secure = true // serve secure cookies
  // }

console.log("env ", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'client', 'build'));
	});
}
if (process.env.NODE_ENV === 'development') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'client', 'build'));
	});
}

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));


  // server.use(express.static(path.join(__dirname, 'client', 'build')))

  server.use("/api/bookrouter", bookRouter);
  server.use("/api/students", studentRouter);
  server.use("/api/categories", cateRouter);
  server.use("/api/bookborrowed", book_borrowed);
  server.use("/auth-admin", userRouter);

  // catch 404 and forward to error handler


};

// module.exports = {countStudents, countBooks}