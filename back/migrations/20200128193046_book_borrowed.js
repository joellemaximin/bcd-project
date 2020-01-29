
exports.up = function(knex) {
    return knex.schema.createTable("bookborrowed", table => {
        table.increments("id").primary();
        table.datetime("start_date", { precision: 6 });
        table.datetime("end_date", { precision: 6 });
        table.integer("numberOfDate");
        table.timestamps(false, true);

    });
};
exports.down = function(knex) {
    return knex.schema.dropTable("bookborrowed");

};
