const db = require("../../data/dbConfig");

module.exports = {
 add,
 find,
 findById
};


async function add(body) {
    return db("book_borrowed").insert(body);
}

function find() {
    return db("book_borrowed");
}

function findById(id) {
    return db("book_borrowed")
      .where({id})
      .first()
}

