const express = require("express");
const router = express.Router();
const db = require("../models/bookborrowed_model");
const pool = require("../middleware/dbConnect");
const verified = require('../middleware/verifymytoken')

router.use(express.json());


// //sum quantity of books read by students every months in one year

// router.get('/time-left-allbook/', async (req, res)=>{
// //Select id, (UNIX_TIMESTAMP(DATE_ADD(`start_date`, INTERVAL numberOfDays DAY)) - UNIX_TIMESTAMP(NOW())) / 3600 / 24 as time_before_returning from `book_borrowed`
//   var DateEmpruntCalcule = 'SELECT students.`name`, books.`title`, (UNIX_TIMESTAMP(DATE_ADD(`start_date`, INTERVAL numberOfDays DAY)) - UNIX_TIMESTAMP(NOW())) / 3600 / 24 as timeleft from `book_borrowed` INNER JOIN students ON `book_borrowed`.`student_id` = students.`id` INNER JOIN books ON `book_borrowed`.`book_id` = `books`.`bookID`';
//   // let DateEmpruntdateeCalcule = parseInt(DateEmpruntCalcule);
//   pool.query(DateEmpruntCalcule, function (err, result){
//   //  for(var i = 0; i < result.length; i++) {
//   //   console.log(parseInt(result[i].DateEmpruntCalcule));
//   //}

//   //console.log(isNaN(DateEmpruntCalcule))


//     if (DateEmpruntCalcule <=  0) {
//      // console.log(statusEmprunt)
//       statusEmprunt = 'Livre en retard';
//       // console.log(DateEmpruntCalcule, + 'eafaeienfain')
//       res.send(result);
//     } 

//     else if (DateEmpruntCalcule >= 3 ) {
//       //console.log(statusEmprunt)
//       statusEmprunt = 'Le livre doit ëtre rendu dans moins de trois jours';
//       res.send(result);
//     }

//     else if (DateEmpruntCalcule == 1){

//      console.log(statusEmprunt);
     
//       statusEmprunt = 'Le livre doit ëtre rendu demain'; 
//       res.send(result);
//     }

//     else {
//       statusEmprunt = "cool";
//       //console.log(statusEmprunt)
//       res.send(result);

//     }
//   });
// });

// //display books read by one student
// router.get("/student-books/:id", async (req, res) => {
//   const getBooksByStudent = 'select books.title from book_borrowed JOIN books ON books.bookID = book_borrowed.book_id WHERE book_borrowed.student_id = ? ';
//   pool.query(getBooksByStudent, [req.params.id],function (err, result){
//     if (err) throw err;
//     res.send(result);
//     console.log(result);
//   });
// }); 

// //delete books expired 0 and more
// router.delete("/delete/old-books/", async (req,res) =>{
//   pool.query('DELETE books.* FROM books LEFT JOIN `book_borrowed` ON `book_borrowed`.book_id = books.`bookID` and NOW() >= `book_borrowed`.start_date and NOW() <= `book_borrowed`.`returned_at` WHERE `book_borrowed`.id is null', [req.params.id], (error, results, fields) =>{
//     if (error) throw error;
//     console.log(error)
//     res.send(results);
//   });
// })

router.get("/", async (req, res) => {
  const getAllBooking = 'SELECT book_borrowed.*, students.`name`, books.`title` from book_borrowed INNER JOIN students ON `book_borrowed`.`student_id` = students.`id` INNER JOIN books ON `book_borrowed`.`book_id` = `books`.`bookID`';
  pool.query(getAllBooking, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
});


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

  var DateEmpruntCalcule = 'SELECT students.`name`, books.`title`, (UNIX_TIMESTAMP(DATE_ADD(`start_date`, INTERVAL numberOfDays DAY)) - UNIX_TIMESTAMP(NOW())) / 3600 / 24 as timeleft from `book_borrowed` INNER JOIN students ON `book_borrowed`.`student_id` = students.`id` INNER JOIN books ON `book_borrowed`.`book_id` = `books`.`bookID`';
    // let DateEmpruntdateeCalcule = parseInt(DateEmpruntCalcule);
    pool.query(DateEmpruntCalcule, function (err, result){
    //  for(var i = 0; i < result.length; i++) {
    //   console.log(parseInt(result[i].DateEmpruntCalcule));
    //}
  
    //console.log(isNaN(DateEmpruntCalcule))
  
  
      if (DateEmpruntCalcule <=  0) {
       // console.log(statusEmprunt)
        statusEmprunt = 'Livre en retard';
        // console.log(DateEmpruntCalcule, + 'eafaeienfain')
        res.send(result);
      } 
  
      else if (DateEmpruntCalcule >= 3 ) {
        //console.log(statusEmprunt)
        statusEmprunt = 'Le livre doit ëtre rendu dans moins de trois jours';
        res.send(result);
      }
  
      else if (DateEmpruntCalcule == 1){
  
       console.log(statusEmprunt);
       
        statusEmprunt = 'Le livre doit ëtre rendu demain'; 
        res.send(result);
      }
  
      else {
        statusEmprunt = "cool";
        //console.log(statusEmprunt)
        res.send(result);
  
      }
    });
});

//display books read by one student
router.get("/student-books/:id", async (req, res) => {
  const getBooksByStudent = 'select books.title from book_borrowed JOIN books ON books.bookID = book_borrowed.book_id WHERE book_borrowed.student_id = ? ';
  pool.query(getBooksByStudent, [req.params.id], function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
}); 

//delete books expired 0 and more
router.delete("/delete/old-books/", verified, async (req,res) =>{
  pool.query('DELETE books.* FROM books LEFT JOIN `book_borrowed` ON `book_borrowed`.book_id = books.`bookID` and NOW() >= `book_borrowed`.start_date and NOW() <= `book_borrowed`.`returned_at` WHERE `book_borrowed`.id is null', [req.params.id], (error, results, fields) =>{
    if (error) throw error;
    console.log(error)
    res.send(results);
  });
})

//delete book expired 0 and more
router.delete("/delete/this-book/:id",  verified, async (req,res) =>{
  pool.query('DELETE FROM book_borrowed WHERE id = ?', [req.params.id], (error, results, fields) =>{
    if (error) throw error;
    console.log(error)
    res.send(results);
  });
})

module.exports = router;

