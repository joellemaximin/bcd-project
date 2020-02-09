
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("students", table => {
        table.increments("id").primary();
        table.string("name");
        table.integer("age");
        table.string("grade");
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("students");

};
