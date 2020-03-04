const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  // get,
  findById,
  update
};

async function add(body) {
  return db("categories").insert(body);
}

function find() {
  return db("categories");
}

// function get(id) {
//   //what does this do? U display the title with id by desc or asc
//     return db("categories")
//       .where({ id: Number(id) })
  
// }

//find a cat by id
function findById(id) {
  return db("categories")
    .where({ id })
    .first();
}

// add update to model

function update(id, changes) {
  return db("categories")
    .where({ id })
    .update(changes);

}
