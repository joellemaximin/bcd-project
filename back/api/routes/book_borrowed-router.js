const express = require("express");
const router = express.Router();
const db = require("../models/book-model");
const pool = require("../middleware/dbConnect")

router.use(express.json());


//filter books author
router.get('/order/author', async (req, res)=>{
    const author = 'SELECT DISTINCT author FROM Books ORDER BY author';
    pool.query(author, function (err, result){
      if (err) throw err;
      res.send(result);
      console.log(result);
  
    });
})
  




module.exports = router;