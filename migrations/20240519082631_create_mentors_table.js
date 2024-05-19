exports.up = function(knex) {
    return knex.schema.createTable('mentors', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('specialty').notNullable();
      table.json('industries').notNullable();
      table.string('email').notNullable().unique();
      table.boolean('is_featured').defaultTo(false);
      table.text('coverImage');
      table.text('profileImage');
      table.text('bio').notNullable();
      table.timestamps(true, true);
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('mentors');
};
