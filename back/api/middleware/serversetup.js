const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const pool = require("./dbConnect")

// routers

const bookRouter = require("../routes/book-router");
const cateRouter = require("../routes/cate-router");
const studentRouter = require("../routes/student-router");
// const countStudents = require('../routes/student-router');
// const countBooks = require('../routes/book-router');

// pool.connect(function(err){
//   if (err) throw err;
//   console.log("Connected!");

//   const countStudents = 'SELECT COUNT(*) FROM Students';
//   pool.query(countStudents, function (err, result){
//     if (err) throw err;
//     console.log(result);
//     result.send()
//   });

//   const countBooks = 'SELECT COUNT(*) FROM Books';
//   pool.query(countBooks, function (err, result){
//     if (err) throw err;
//     console.log(result);
//   });

  // const countBookRead = 'SELECT COUNT(*) FROM X';
  // pool.query(countBookRead, function (err, result){
  //   if (err) throw err;
  //   console.log(result);
  // });
// });

// server.get("/api/students-count", (req, res)=>{
//   res.send(countStudent, "<h2>Nombre deleves</h2>")

// });



// exports
module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(morgan("dev"));

  server.use("/api/bookrouter", bookRouter);
  server.use("/api/students", studentRouter);
  server.use("/api/categories", cateRouter);

  // catch 404 and forward to error handler


};

// module.exports = {countStudents, countBooks}