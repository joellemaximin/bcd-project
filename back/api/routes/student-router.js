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
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//display only 8



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
  const selectBookId = 'SELECT * FROM students WHERE id = ?';
  pool.query(selectBookId, [req.params.id], function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  })
});

router.get('/show-student/:id', async (req, res) => {
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


//update a student
router.put('/edit-student/:id', async (req, res) => {
    pool.query('UPDATE `students` SET `name`=?,`grade`=?,`age`=? where `id`=?', [req.body.name, req.body.grade, req.body.age, req.body.id], function (error, results, fields) {
      if (err) throw err;
      res.send(results);
      console.log(results);
    })
  // try {
  //   const student = await db.update(req.params.id, req.body);
  //   if(student) {
  //       res.status(200).json(student)
  //   } else {
  //       res.status(500).json({message: "Erreur, ne trouve pas l'Id"})
  //   }
  // } catch (error) {
  //   res.status(500).json(error.message);
  // }
});

//remove a student
router.delete('/delete/:id', async (req, res, next) => {
  pool.query('DELETE FROM students WHERE id = ?', [req.params.id], (err,rows, fields) =>{
    console.log(req.params.id, 'EEeeeeeeee')
    if (!err)
    res.send('deleted success')
    else 
    console.log(err)

  });

  
  // const student = await db.remove({id: id(req.params.id)};
  //       if(student) {
  //           res.status(200).json({message: "Student deleted ."})
  //       } else {
  //           res.status(500).json({message: "Student is not found"})
  //       }
  //   } catch (error) {
  //     res.status(500).json({message: "Student is not deleted"});
  //   }
});


  
//display countStudents students
router.get("/counter/countStudents", async (req,res) => {
    const countStudents = 'SELECT COUNT(*) as total FROM Students';
    pool.query(countStudents, function (err, result){
      if (err) throw err;
      res.send(result[0].total);

    });
})

/////        FILTERS      //////


//display students by name or grade

router.get('/order/order_by_name', async (req, res)=>{
    const order_name = 'SELECT name, grade FROM Students ORDER BY name';
    pool.query(order_name, function (err, result){
      if (err) throw err;
      res.send(result);
      console.log(result);
  
    });
})




//display the number of books readed by students 

router.get('/order/order_by_first_letter', async (req, res)=>{
    const order_name = "SELECT DISTINCT name FROM Students WHERE name LIKE = '?%' ";
    pool.query(order_name, function (err, result){
      if (err) throw err;
      res.send(result);
      console.log(result);
  
    });
})


module.exports = router;