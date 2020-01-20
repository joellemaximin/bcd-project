const express = require("express");
const cors = require("cors");
// rouuters

const bookRouter = require("../routes/book-router");

// exports
module.exports = server => {
  server.use(express.json());
  server.use(cors());
  server.use("/api/bookrouter", bookRouter)
  // catch 404 and forward to error handler

// error handler
  // server.use(function(err, req, res, next) {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   //res.locals.error = req.server.get('env') === 'development' ? err : {};

  //   // render the error page
  //   res.status(err.status || 500);
  //   res.render('error');
  // });
};