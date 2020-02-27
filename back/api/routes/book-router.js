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
  pool.query('INSERT INTO books SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
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



// SELECT * FROM books INNER JOIN categories ON (book_id = categories.`category_id`);
//SELECT * FROM categories LEFT JOIN books ON book_id = category_id'
// SELECT books.`category_id`, books.`editor`, books.`collection`, books.`title`, books.`oeuvre` FROM books RIGHT JOIN categories ON (books.`category_id` = `category_id`;


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
  // var bookID = req.params.id
  // const deleteBook = ;
  // console.log("bookID: ", req.params.bookID);
  pool.query('DELETE FROM books WHERE bookID = ?', [req.params.id], (err,rows, fields) =>{
    console.log(req.params.id, 'EEeeeeeeee')
    if (!err) 
    res.send('deleted success')
    else 
    console.log(err)

  }

  );

});
   // try {
    //     const book = await db.remove(req.params.id);
    //     if(book) {
    //         res.status(200).json({message: "Book deleted ."})
    //     } else {
    //         res.status(500).json({message: "Book is not found"})
    //     }
    // } catch (error) {
    //   res.status(500).json({message: "Book is not deleted"});
    // }

//display count books
router.get("/counter/countBooks", async (req,res) => {
  const countBooks = 'SELECT COUNT(*) FROM Books';
  pool.query(countBooks, function (err, result){
    if (err) throw err;
    res.json(result);


  });
  req.flash('success', 'Project Deleted');
  res.location('/admin');
  res.redirect('/admin');
  console.log(result);
})

//get book inner join or join category here

// router.get("/", async (req,res) => {
//   function cate(book) {
//     Object.keys(book).forEach(function(bookk){
//         const category = 'SELECT * FROM categories WHERE id = ' + book._id;
//         pool.query(category, function (err, result){
//             if (err) throw err;
//             console.log("Book name: + ‘bookk.title‘+ categoryname; {category.category_title}")
  
//     })
//     return;
//             //     res.send(result);
//     //   console.log(result);

//     // 
//   })};



/////        FILTERS      //////


//display books by authors or name or first letter from column oeuvre and author or by category
router.get('/order/oeuvres', async (req, res)=>{
  const oeuvre = 'SELECT * FROM books WHERE title  oeuvre';
  pool.query(oeuvre, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})


//display books asc or desc of the title
router.get('/order/title-asc', async (req, res)=>{
  const asc_title = 'SELECT title FROM Books ORDER BY title ASC';
  pool.query(asc_title, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})

router.get('/order/title-desc', async (req, res)=>{
  const desc_title = 'SELECT title FROM Books ORDER BY title DESC';
  pool.query(desc_title, function (err, result){
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

router.get('/books/category', async (req, res)=>{
  const title_categoryColumn = 'SELECT categories.`title_category` from books INNER JOIN categories ON books.`category_id` = categories.`id` ';
  pool.query(title_categoryColumn, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})
//matched any characters from title column from a to z

router.get('/ok/search-by-letter/?', async (req, res)=>{
  const matched_character = "SELECT title FROM Books WHERE title REGEXP '^[^abcd]' ";
  pool.query(matched_character, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
})


// paginate router?

module.exports = router;