exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('unitecontacts', function(table) {
    console.log('created unitecontacts')

  table.timestamps()
  table.integer('nationbuilder_id')
  table.string('contact_name')
  table.integer('unite_id')
  table.string('employer')
  table.string('occupation')
  table.string('position')
  table.string('email')
  table.string('phone')
  table.string('mobile')
  table.string('address1')
  table.string('address2')
  table.string('address3')
  table.string('city')

  })
};

exports.down = function(knex, Promise) {
  console.log('droppedTable')
  return knex.schema.dropTableIfExists('unitecontacts')
};
