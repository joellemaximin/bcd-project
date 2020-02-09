const express = require("express");
const router = express.Router();
const db = require("../models/bookborrowed_model");
const pool = require("../middleware/dbConnect")

router.use(express.json());


//counter books read by students every 3 months
// router.get('/book-read-by-student/:id', async (req, res)=>{
//     const bookFrommstudent = 'SELECT title FROM books AND name FROM students INNER JOIN book_borrowed ON books.`category_id`=categories.`id`';
//     pool.query(bookFrommstudent, function (err, result){
//       if (err) throw err;
//       res.send(result);
//       console.log(result);
  
//     });
// })


router.get("/get-allbook", async (req, res) => {
  try {
    const book_borrowed = await db.find();
    res.status(200).json(book_borrowed);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/getdays/:id', async (req, res)=>{
  const days_left = "SELECT timeleft FROM book_borrowed  WHERE Id= "  + req.params.id;
  pool.query(days_left, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})


router.post("/add_bookborrowed", async (req, res) => {
  try {
    const book_borrowed = await db.add(req.body);
    console.log(req.body)
    res.status(200).json(book_borrowed);
  } catch (error) {
    res.status(500).json(error);
  }
});

//sum quantity of books read by students every months in one year

router.get('/time-left-allbook', async (req, res)=>{

  var DateEmpruntCalcule = 'SELECT id, ( UNIX_TIMESTAMP(DATE_ADD(start_date, INTERVAL numberOfdays DAY)) - UNIX_TIMESTAMP(NOW())) / 3600 / 24 timeleft FROM book_borrowed WHERE returned_at is null';
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






module.exports = router;