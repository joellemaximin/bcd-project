const db = require("../../data/dbConfig");

module.exports = {
  find,
  // get,
  // findById,
  remove,
  update
};


function find() {
  return db("books");
}


//find a book by id
// function findById(bookID) {
//   return db("books")
//     .where({ bookID })
//     .first();
// }


// add update to model
function update(bookID, body) {
  return db("books")
    .where({ bookID })
    .update(body);
}


//remove from db
function remove(bookID) {
  return db("books")
    .where({ bookID })
    .del();
}
