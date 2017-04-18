exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('contacts', function(table) {
    console.log('created contacts table!')

  table.timestamps('Date_time')
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
  return knex.schema.dropTableIfExists('contacts')
};
