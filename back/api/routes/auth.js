const express = require("express");
const router = express.Router();
const db = require("../models/auth-model");
const pool = require("../middleware/dbConnect");
const bcrypt = require('bcrypt');
router.use(express.json());

const {validationRegister, loginValidation} = require('../middleware/validation')

router.get("/", async (req, res) => {
  const getAllBooking = 'SELECT * FROM users';
  pool.query(getAllBooking, function (err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);

  });
});


router.post("/register", async (req, res) => {
    // const { body } = req; 
    //validate the data before send it and show errors
    const { error } = validationRegister(req.body)
    if (error) return res.status(422).send(error.details[0].message );

    var userData = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }

    const user = userData;

    //salt the password and then check if email already exists if not 
    const salt = await bcrypt.genSalt(10);
    pool.query('SELECT * FROM users WHERE email= ? ', [user.email], function(err, rows){

        if (err) throw err;
        
        if (!rows.length) {
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) console.log(err);
                user.password = hash;
                
                pool.query('INSERT INTO users SET ?', user, function (error, results, fields) {
                    if (error) throw error;
                    res.send(results);
                }); 
            });
        }

        else {
            return res.send("Email already exists");
        }



    })
    

});

router.post('/login', (req, res)=> {
    const email = req.body.email;
    const password = req.body.password

    pool.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
            res.json({
              status:false,
              message:'there are some error with query'
              })
        }else{
          if(results.length >0){
              if(password==results[0].password){
                  res.json({
                      status:true,
                      message:'successfully authenticated'
                  })
              }else{
                  res.json({
                    status:false,
                    message:"Email and password does not match"
                   });
              }
           
          }
          else{
            res.json({
                status:false,    
              message:"Email does not exits"
            });
          }
        }
    });
    
});


module.exports = router;

// For the new version

// const schema = Joi.object({ name: Joi.string() .min(6) .required(),
// email: Joi.string() .min(6) .required() .email(),
// password: Joi.string() .min(6) .required() });

// const validation = schema.validate(req.body); 
// res.send(validation);