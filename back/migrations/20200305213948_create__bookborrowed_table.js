exports.up = function(knex) {
    return knex.schema.createTable("book_borrowed", table => {
        table.increments("id").primary();
        table.datetime("start_date");
        table.datetime("returned_at");
        table.integer("numberOfdays");
        table.integer('student_id').references('id').inTable('students').unsigned().notNullable();
        table.integer("book_id").references('bookID').inTable('books').unsigned().notNullable();
        table.timestamps(false, true);

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("book_borrowed");

};
