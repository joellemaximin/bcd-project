const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  get,
  findById,
  // remove,
  update
};

async function add(body, category_id) {
  if(!category_id){
    return db("books")
      .insert(body)
     
  }
  else {
    return db("books");
  }
  
   
}

function find() {
  return db("books");
}

function get(id,title) {
  //what does this do? U display the title with id by desc or asc
  if (id) {
    return db("books")
      .where({ id: Number(id) })
      .orderBy(title.asc(), title.desc());
       
  } else {
    return db("books");
  }
}

//find a book by id
function findById(bookID) {
  return db("books")
    .where({ bookID })
    .first();
}

// add update to model

function update(bookID, changes) {
  return db("books")
    .where({ bookID })
    .update(changes);
}

//remove from db
// function remove(id) {
//   return db("books")
//     .where({ id })
//     .del();
// }
