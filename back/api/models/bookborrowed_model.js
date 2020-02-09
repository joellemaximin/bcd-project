const db = require("../../data/dbConfig");

module.exports = {
 add,
 bookOntime,
 find,
 findById
};


async function bookOntime(date_start, date_end, numberOfdate) {
   var DateEmpruntCalcule = date_start - date_end + numberOfdate;

    if (DateEmpruntCalcule <=  0) {
       statusEmprunt = 'Livre en retard'
       console.log(statusEmprunt)
    } else {
    statusEmprunt = "cool"
    console.log(statusEmprunt, parseInt(DateEmpruntCalcule))

    return db("book_borrowed");

    }
}

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