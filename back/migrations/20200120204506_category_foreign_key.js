exports.up = function(knex) {
    return knex.schema.table("books", table => {
        table.foreign("category_id").unsigned()
        .notNullable().references('id').inTable('category').onDelete('CASCADE').index();
    });
};

exports.down = function(knex) {
    return knex.schema.table("books", table => {
        table.dropForeign("category_id");
    });
};
