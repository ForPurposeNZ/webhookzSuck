exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('contacts', function(table) {
    console.log('created contacts table!')


  table.timestamps()
  table.integer('contact_id')
  table.string('contact_name')
  table.integer('unite_id')
  table.string('employer')
  table.string('occupation')
  table.string('position')
  table.string('email')
  table.string('phone')
  table.string('mobile')
  table.string('corresponence_contact')
  })
};

exports.down = function(knex, Promise) {
  console.log('droppedTable')
  return knex.schema.dropTableIfExists('contacts')
};
