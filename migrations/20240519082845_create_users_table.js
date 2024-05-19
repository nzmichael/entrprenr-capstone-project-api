exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.text('bio');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
  