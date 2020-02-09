
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("books", table => {
        table.increments("id").primary();
        table.string("editor");
        table.string("collection", 50);
        table.string("author", 50);
        table.string("oeuvre", 100);
        table.string("title", 30);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("books");
};
