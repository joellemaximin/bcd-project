const db = require("../../data/dbConfig");

module.exports = {
//  add,
 find,
 findById
};


// function add(body) {
//   return db("book_borrowed").insert(body)
//   .where({book_id, student_id})
// }

function find() {
    return db("book_borrowed");
}

function findById(id) {
    return db("book_borrowed")
      .where({id})
      .first()
}