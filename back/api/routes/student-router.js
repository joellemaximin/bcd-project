const express = require("express");
const router = express.Router();
const db = require("../models/student-model");
const countStudents = require("../middleware/serversetup")
const pool = require("../middleware/dbConnect")

router.use(express.json());

// returns student in order
router.get("/", async (req, res) => {
  try {
    const student = await db.find();

    // student.sort(function(a, b) {
    //   if (a.title < b.title) {
    //     return -1;
    //   }
    //   if (a.title > b.title) {
    //     return 1;
    //   }
    //   return 0;
    // });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// post router
router.post("/", async (req, res) => {
  try {
    const student = await db.add(req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get one student
router.get('/student/:id', async (req, res) => {
  try {
    const student = await db.findById(req.params.id);
    if(student) {
        res.status(200).json(student)
    } else {
        res.status(500).json(error.message)
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//display countStudents students
// router.get('/countStudents', async (req, res) => {
//   try {
//     res.status(200).json(countStudents);
//   } catch (error) {
//     res.status(500).json(error);
//   }

// })

router.get("/counter/countStudents", async (req,res) => {
    const countStudents = 'SELECT COUNT(*) FROM Students';
    pool.query(countStudents, function (err, result){
      if (err) throw err;
      res.send(result);
      console.log(result);

    });
})
//update a student
router.put('/student/:id', async (req, res) => {
    try {
        const student = await db.update(req.params.id, req.body);
        if(student) {
            res.status(200).json(student)
        } else {
            res.status(500).json({message: "Erreur, ne trouve pas l'Id"})
        }
    } catch (error) {
      res.status(500).json(error.message);
    }
});

//remove a student
router.delete('/student/delete/:id', async (req, res) => {
    try {
        const student = await db.remove(req.params.id);
        if(student) {
            res.status(200).json({message: "Student deleted ."})
        } else {
            res.status(500).json({message: "Student is not found"})
        }
    } catch (error) {
      res.status(500).json({message: "Student is not deleted"});
    }
});
  




module.exports = router;