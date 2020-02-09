const express = require("express");
const router = express.Router();
const db = require("../models/book-model");
const pool = require("../middleware/dbConnect")

router.use(express.json());

// returns book in order
router.get("/", async (req,res) => {

  const joinCategory = 'SELECT * FROM books INNER JOIN categories ON books.`category_id`=categories.`id`';
  pool.query(joinCategory, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  })
}); 

// post router
router.post("/", async (req, res) => {
  try {
    const book = await db.add(req.body);
    console.log(req.body)
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get one book
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
    try {
        const book = await db.update(req.params.id, req.body);
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
router.delete('/delete/:id', async (req, res) => {
    try {
        const book = await db.remove(req.params.id);
        if(book) {
            res.status(200).json({message: "Book deleted ."})
        } else {
            res.status(500).json({message: "Book is not found"})
        }
    } catch (error) {
      res.status(500).json({message: "Book is not deleted"});
    }
});
  

//display count books
router.get("/counter/countBooks", async (req,res) => {
  const countBooks = 'SELECT COUNT(*) FROM Books';
  pool.query(countBooks, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
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





// paginate router?

module.exports = router;