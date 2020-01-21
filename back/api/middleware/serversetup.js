const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// routers

const bookRouter = require("../routes/book-router");
const cateRouter = require("../routes/cate-router");

// exports
module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(morgan("dev"));

  server.use("/api/bookrouter", bookRouter);
  server.use("/api/category", cateRouter);

  // catch 404 and forward to error handler


};