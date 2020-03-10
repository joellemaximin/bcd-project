const express = require("express");
const router = express.Router();
const db = require("../models/book-model");
const pool = require("../middleware/dbConnect")

router.use(express.json());

// returns book in order by category and display only 15 books
router.get("/", async (req,res) => {
  const joinCategory = 'SELECT books.*, categories.`title_category`from books INNER JOIN categories ON books.`category_id` = categories.`id` LIMIT 0, 15';
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
});

//get one book
router.get('/show-book/:id', async (req, res) => {
  const selectBookId = 'SELECT books.*, categories.`title_category` FROM books INNER JOIN categories ON books.`category_id` = categories.`id` WHERE bookID = ?';
  pool.query(selectBookId, parseInt((req.params.id)), function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  })

});


router.put('/editbook/:id', async (req, res) => {
  const putData = req.body;
  pool.query('UPDATE books SET ? WHERE bookID = ?',[putData, req.params.id], function(error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

//  pool.query(`UPDATE books SET ? WHERE bookID= ? `, [title,author,category_id], function(error, results, fields) {
//  pool.query(`UPDATE books SET title="", author="", category_id="" WHERE bookID=?`, [title,author,category_id], function(error, results, fields) {

//remove a book
router.delete('/delete/book/:id', (req, res) => {
  pool.query('DELETE FROM books WHERE bookID = ?', [req.params.id], (err,rows, fields) =>{
    //console.log(req.params.id)
    if (!err) 
    res.send('deleted success')
    else 
    console.log(err)
  });
});


//display count books
router.get("/counter/countBooks", async (req,res) => {
  const countBooks = 'SELECT COUNT(*) as total FROM books ';
  pool.query(countBooks, function (err, result){
    if (err) throw err;
    res.json(result[0].total);


  });

})


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
  const asc_title = 'SELECT * FROM books ORDER BY title ASC, title DESC ';
  pool.query(asc_title, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})

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

//matched any characters from title column from a to z

router.get(`/search?`, async (req, res)=>{
  //const matched_character = 'select bookID, title from books where title like "%' + [req.params.title] + '%"';
  // console.log(query)
  const matched_character = 'select title from books where title LIKE "?%" ';
  pool.query(matched_character, function (err, result){
    if (err) throw err;
    
    JSON.stringify(result);
    res.send({ books: result });

  });
})


// paginate router?

module.exports = router;