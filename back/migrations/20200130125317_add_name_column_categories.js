
exports.up = function(knex) {
    return knex.schema.hasTable("categories", table => {
        table.string("title_category", 30);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("categories");

};
