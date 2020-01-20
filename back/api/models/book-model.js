const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  get,
  findById,
  remove,
  update
};

async function add(body) {
  return db("books").insert(body);
}

function find() {
  return db("books");
}

function get(id,title) {
  //what does this do?
  if (id) {
    return db("books")
      .where({ id: Number(id) })
      .orderBy(title.asc(), title.desc());
  } else {
    return db("books");
  }
}

function findById(id) {
  return db("books")
    .where({ id })
    .first();
}

function remove(id) {
  return db("books")
    .where({ id })
    .del();
}

// add update to model

function update(id, changes) {
  return db("books")
    .where({ id })
    .update(changes);
}