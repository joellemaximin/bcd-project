const express = require("express");
const cors = require("cors");

// rouuters

const bookRouter = require("../routes/book-router");

// exports
module.exports = server => {
  server.use(express.json());
  server.use(cors());
  server.use("/api/bookrouter", bookRouter)
};