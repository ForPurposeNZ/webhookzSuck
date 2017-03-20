
exports.up = function(knex, Promise) {

  return knex.schema.table('contacts', function(table) {
    console.log('added columns to contacts table')

    table.integer('unite_id')
    table.string('employer')
    table.string('occupation')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('products', function(table) {
      table.dropColumn('unite_id', 'employer', 'occupation' );
  });
};
