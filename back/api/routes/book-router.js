const express = require("express");
const router = express.Router();
const db = require("../models/book-model");

router.use(express.json());

// returns screenplays in order
router.get("/", async (req, res) => {
  try {
    const book = await db.find();

    book.sort(function(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// post router
router.post("/", async (req, res) => {
  try {
    const book = await db.add(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
});


// router.get('/books', booksController.all);
// router.post('/books', booksController.create);
// router.get('/book/:id', booksController.get);
// router.put('/book/:id', booksController.update);
// router.delete('/book/:id', booksController.destroy);





module.exports = router;