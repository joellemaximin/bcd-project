const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  get,
  findById,
  update
};

async function add(body) {
  return db("category").insert(body);
}

function find() {
  return db("category");
}

function get(id) {
  //what does this do? U display the title with id by desc or asc
  if (id) {
    return db("category")
      .where({ id: Number(id) })
  } else {
    return db("category");
  }
}

//find a cat by id
function findById(id) {
  return db("category")
    .where({ id })
    .first();
}

// add update to model

function update(id, changes) {
  return db("category")
    .where({ id })
    .update(changes);

}
