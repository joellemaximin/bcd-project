const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const pool = require("./dbConnect")

// routers

const bookRouter = require("../routes/book-router");
const cateRouter = require("../routes/cate-router");
const studentRouter = require("../routes/student-router");
const book_borrowed = require("../routes/book_borrowed-router");


// exports
module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(morgan("dev"));
  // server.use(express.urlencoded({ extended: true }));

  server.use("/api/bookrouter", bookRouter);
  server.use("/api/students", studentRouter);
  server.use("/api/categories", cateRouter);
  server.use("/api/bookborrowed", book_borrowed);

  // catch 404 and forward to error handler


};

// module.exports = {countStudents, countBooks}