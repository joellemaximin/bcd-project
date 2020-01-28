const mysql = require('mysql');
require('dotenv').config()

const pool = mysql.createConnection({
    connectionLimit: 10,
    host: "127.0.01",
    user: "root",
    password: "",
    database: 'bcd_managment'
})


// pool.getConnection((err, connection) => {
//     if(err) 
//         console.error("Something went wrong connecting to the database ...");
    
//     if(connection)
//         connection.release();
//     return;
// });


// pool.query = util.promisify(pool.query);



module.exports = pool;