
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("category", table => {
        table.increments("id").primary();
        table.string("title");

        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("category");
};
