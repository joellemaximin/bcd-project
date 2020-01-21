const express = require("express");
const router = express.Router();
const db = require("../models/cate-model");

router.use(express.json());

// returns cate in order
router.get("/", async (req, res) => {
  try {
    const cate = await db.find();

    // cate.sort(function(a, b) {
    //   if (a.title < b.title) {
    //     return -1;
    //   }
    //   if (a.title > b.title) {
    //     return 1;
    //   }
    //   return 0;
    // });
    res.status(200).json(cate);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// post router
router.post("/", async (req, res) => {
  try {
    const cate = await db.add(req.body);
    
    res.status(200).json(cate, {message: "New category add"});
  } catch (error) {
    res.status(500).json(error);
  }
});

//get one cate
router.get('/:id', async (req, res) => {
  try {
    const cate = await db.findById(req.params.id);
    if(cate) {
        res.status(200).json(cate)
    } else {
        res.status(500).json(error.message)
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//update a cate
router.put('/:id', async (req, res) => {
    try {
        const cate = await db.update(req.params.id, req.body);
        if(cate) {
            res.status(200).json(cate)
        } else {
            res.status(500).json({message: "Erreur, ne trouve pas l'Id"})
        }
    } catch (error) {
      res.status(500).json(error.message);
    }
});




module.exports = router;