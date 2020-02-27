exports.up = function(knex) {
    return knex.schema.hasTable("books", table => {
        table.dropColumn('id').primary();
        table.increments("bookID").primary();

    
    });
     
    
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("books");

};