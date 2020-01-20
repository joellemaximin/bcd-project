
exports.up = function(knex) {
    return knex.schema.table("students", table => {
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.table("students", table => {
        table.dropTimestamps();
    });
};
