
exports.up = function(knex) {
    return knex.schema.table("books", table => {
        table.foreign("category_id").references("category.id");
    });
};

exports.down = function(knex) {
    return knex.schema.table("books", table => {
        table.dropForeign("category_id");
    });
};
