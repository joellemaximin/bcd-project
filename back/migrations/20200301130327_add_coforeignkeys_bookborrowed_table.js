exports.up = function(knex) {
    return knex.schema.hasTable("book_borrowed", table => {
        table.integer('book_id', 25).unsigned().references('bookID').inTable('books');
        table.integer('student_id', 25).unsigned().references('id').inTable('students');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("book_borrowed");

};
