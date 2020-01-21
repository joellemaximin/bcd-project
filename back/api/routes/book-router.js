const express = require("express");
const router = express.Router();
const db = require("../models/book-model");

router.use(express.json());

// returns book in order
router.get("/", async (req, res) => {
  try {
    const book = await db.find();

    // book.sort(function(a, b) {
    //   if (a.title < b.title) {
    //     return -1;
    //   }
    //   if (a.title > b.title) {
    //     return 1;
    //   }
    //   return 0;
    // });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// post router
router.post("/", async (req, res) => {
  try {
    const book = await db.add(req.body);
    
    res.status(200).json(book, {message: "New book add"});
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

//display count books
router.get('/counter', async (req, res) => {
  try {
    const count = await db.count(books);
    res.status(200).json({message: "Number of books: ", count});
  } catch (error) {
    res.status(500).json(error);
  }

})

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
  
  

// router.get('/books', booksController.all);
// router.post('/books', booksController.create);
// router.get('/book/:id', booksController.get);
// router.put('/book/:id', booksController.update);
// router.delete('/book/:id', booksController.destroy);





module.exports = router;