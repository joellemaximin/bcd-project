
exports.up = function(knex) {
    return knex.schema.createTable("book_borrowed", table => {
        table.increments("id").primary();
        table.datetime("start_date");
        table.datetime("end_date");
        table.string("grade");
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("book_borrowed");

};
