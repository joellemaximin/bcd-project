const express = require("express");
const router = express.Router();
const db = require("../models/bookborrowed_model");
const pool = require("../middleware/dbConnect")

router.use(express.json());


router.get("/", async (req, res) => {
  const getAllBooking = 'SELECT book_borrowed.*, students.`name`, books.`title` from book_borrowed INNER JOIN students ON `book_borrowed`.`student_id` = students.`id` INNER JOIN books ON `book_borrowed`.`book_id` = `books`.`bookID`';
  pool.query(getAllBooking, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
});


// post router
router.post("/", async (req, res) => {
  var postData  = req.body;
  console.log(req.body)
  pool.query('INSERT INTO book_borrowed SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  }); 
});


//sum quantity of books read by students every months in one year

router.get('/time-left-allbook', async (req, res)=>{

  var DateEmpruntCalcule = 'SELECT id, (UNIX_TIMESTAMP(DATE_ADD(start_date, INTERVAL numberOfdays DAY)) - UNIX_TIMESTAMP(NOW())) / 3600 / 24 timeleft FROM book_borrowed WHERE returned_at is null';
  pool.query(DateEmpruntCalcule, function (err, result){

    if (DateEmpruntCalcule <=  0) {
      statusEmprunt = 'Livre en retard'
      console.log(statusEmprunt)
      res.send(result)
    } 

    else if (DateEmpruntCalcule >= 3 ) {
      statusEmprunt = 'Le livre doit ëtre rendu dans moins de trois jours'
    }

    else if (DateEmpruntCalcule == 1){
      statusEmprunt = 'Le livre doit ëtre rendu demain'
    }

    else {
      statusEmprunt = "cool"
      console.log(statusEmprunt)
      res.send((result))

    }
  })
})

//display books read by one student
router.get("/student-books/:id", async (req, res) => {
  const getBooksByStudent = 'select books.title from book_borrowed JOIN books ON books.bookID = book_borrowed.book_id WHERE book_borrowed.student_id = ? ';
  pool.query(getBooksByStudent, [req.params.id],function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  })
}); 






module.exports = router;

