const express = require("express");
const router = express.Router();
const db = require("../models/auth-model");
const pool = require("../middleware/dbConnect");
const bcrypt = require('bcrypt');
const dbConfig = require("../middleware/db.config");
const jwt = require('jsonwebtoken')
const verified = require('../middleware/verifymytoken')

router.use(express.json());

// var session = require('express-session');
// const config = require('../middleware/config-session')
// router.use(session(config));

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
                    res.send({user: user.username});
                }); 
            });
        }

        else {
            return res.send("Email already exists");
        }



    });

});
router.post('/login', (req, res)=> {
// `  const password = req.body.password

//     const { error } = validationRegister(req.body)
//     if (error) return res.status(422).send(error.details[0].message );
// `
    const email = req.body.email;

    pool.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
            res.json({
              status:false,
              message:'there are some error with query'
            })
        } else {
            if(results.length > 0){
                //decided to authen only with email
                // if(password==results[0].password){
                if(email == results[0].email){
                    // res.json({
                    //   status:true,
                    //   message:'successfully authenticated'
                    // })
                    // console.log({id: results[0].id})


                    const token = jwt.sign({ id: results[0].id },
                    dbConfig.secret);

                    res.cookie('t', token, {expiresIn: '20m'})

                    // const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})

                    // const response = {
                    //     "status": "Logged in",
                    //     "token": token,
                    //     "refreshToken": refreshToken,
                    // }
                    // res.status(200).json(response);        

                    res.status(200).send({

                        email: email,
                        accessToken: token
                    })
                    // res.header('auth-token', token)

                    
                } else {
                    res.json({
                        status:false,
                        message:"Email does not match"
                    });
                    res.end();

                }
           
            } else {
                res.json({
                    status:false,    
                    message:"Email does not exits"
                });
                res.end();

            }
        }
    });
    
});


router.get('/secret-route', verified, (req, res, next)=>{
    console.log(req.user, 'id, time');
    console.log(req.body)
    res.send('This is the secret content. Only logged in users can see that!');
    //copie colle access-token after login
})

router.post('/secret-route/logout', verified, (req, res) => {
    res.clearCookie('t');
    res.json({message: "Signout successful"});
});

module.exports = router;

// For the new version

// const schema = Joi.object({ name: Joi.string() .min(6) .required(),
// email: Joi.string() .min(6) .required() .email(),
// password: Joi.string() .min(6) .required() });

// const validation = schema.validate(req.body); 
// res.send(validation);