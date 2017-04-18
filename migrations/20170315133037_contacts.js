exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('contacts', function(table) {
    console.log('created contacts table!')

  table.dateTime('Date_time')
  table.string('contact_name')
  table.integer('Member_id')
  table.integer('id')
  table.increments('Note_id')
  table.string('employer')
  table.string('occupation')
  table.string('position')
  table.string('Worksite_id')
  table.string('email')
  table.string('phone')
  table.string('mobile')
  table.string('correspondence_contact')
  table.string('city')
  table.integer('Auto_note')
  table.integer('Code_id')

  })
};

exports.down = function(knex, Promise) {
  console.log('droppedTable')
  return knex.schema.dropTableIfExists('contacts')
};
