const express = require("express");
const router = express.Router();
const db = require("../models/book-model");
const pool = require("../middleware/dbConnect")

router.use(express.json());

// returns book in order by category and display only 15 books
// SELECT * FROM books INNER JOIN categories ON books.`category_id`=categories.`id` LIMIT 0, 15
router.get("/", async (req,res) => {
  // SELECT books.`bookID`, `categories`.`title_category` from books INNER JOIN categories ON books.`category_id`=categories.`id` LIMIT 0, 15
  const joinCategory = 'SELECT books.*, categories.`title_category` from books INNER JOIN categories ON books.`category_id` = categories.`id` LIMIT 0, 15';
  pool.query(joinCategory, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  })
}); 

// post router
router.post("/", async (req, res) => {
  var postData  = req.body;
  console.log(req.body)
  pool.query('INSERT INTO books SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
  // try {
  //   const book = await db.add(req.body);
  //   console.log(req.body)
  //   res.status(200).json(book);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
});

//get one book
router.get('/book/:id', async (req, res) => {
  try {
    const book = await db.findById(req.params.id);
    if(book) {
        res.status(200).json(book)
    } else {
        res.status(500).json(error.message)
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});


//update a book
router.put('/edit-book/:id', async (req, res) => {
    try {
        const book = await db.update(req.params.id);
        if(book) {
            res.status(200).json(book)
        } else {
            res.status(500).json({message: "Erreur, ne trouve pas l'Id"})
        }
    } catch (error) {
      res.status(500).json(error.message);
    }
});

//remove a book
router.delete('/delete/book/:id', (req, res) => {
  
  pool.query('DELETE FROM books WHERE bookID = ?', [req.params.id], (err,rows, fields) =>{
    //console.log(req.params.id)
    if (!err) 
    res.send('deleted success')
    else 
    console.log(err)

  }

  );

});


//display count books
router.get("/counter/countBooks", async (req,res) => {
  const countBooks = 'SELECT COUNT(*) as total FROM books ';
  pool.query(countBooks, function (err, result){
    if (err) throw err;
    res.json(result[0].total);


  });

})


/////        FILTERS      //////


//display books by authors or name or first letter from column oeuvre and author or by category
router.get('/order/oeuvres', async (req, res)=>{
  const oeuvre = 'SELECT * FROM books WHERE title oeuvre';
  pool.query(oeuvre, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})


//display books asc or desc of the title
router.get('/order/title', async (req, res)=>{
  const asc_title = 'SELECT title FROM Books ORDER BY title ASC AND ORDER BY title ASC ';
  pool.query(asc_title, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})

// router.get('/order/title-desc', async (req, res)=>{
//   const desc_title = 'SELECT title FROM Books ORDER BY title DESC';
//   pool.query(desc_title, function (err, result){
//     if (err) throw err;
//     res.send(result);
//     console.log(result);

//   });
// })

//filter books oeuvre
router.get('/order/oeuvres', async (req, res)=>{
  const oeuvre = 'SELECT DISTINCT oeuvre FROM Books ORDER BY oeuvre';
  pool.query(oeuvre, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})

//filter books author
router.get('/order/author', async (req, res)=>{
  const author = 'SELECT DISTINCT author FROM Books ORDER BY author';
  pool.query(author, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})

router.get('/books/category', async (req, res)=>{
  const title_categoryColumn = 'SELECT categories.`title_category`, categories.id from books inner join categories on books.`category_id` = categories.`id`';
  pool.query(title_categoryColumn, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result[0]);

  });
})

//matched any characters from title column from a to z

router.get('/search-by-letter/:title', async (req, res)=>{
  // const matched_character = 'select * from books where title like" %' + req.params.title + '% ";'
  const matched_character = 'select * from books where title like "%' + [req.params.title] + '%";'
  pool.query(matched_character, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})


// paginate router?

module.exports = router;