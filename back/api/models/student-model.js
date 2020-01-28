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
    return db("students").insert(body);
}

function find() {
  return db("students");
}

function get(id,title) {
  //what does this do? U display the title with id by desc or asc
  if (id) {
    return db("students")
      .where({ id: Number(id) })
      .orderBy(title.asc(), title.desc());
       
  } else {
    return db("students");
  }
}

//find a book by id
function findById(id) {
  return db("students")
    .where({ id })
    .first();
}

// add update to model

function update(id, changes) {
  return db("students")
    .where({ id })
    .update(changes);
}

//remove from db
function remove(id) {
  return db("students")
    .where({ id })
    .del();
}

// function count (){
//      return db("students")
//        .count().then(total => {
//         console.log(total);
//         return total;
// })};

// module.exports = {
//     countStudents,
//   };