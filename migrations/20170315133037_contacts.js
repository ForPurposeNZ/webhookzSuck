exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('contacts', function(table) {
    console.log('created contacts table!')


  table.timestamps()
  table.integer('contact_id')
  table.integer('unite_id')
  table.string('employer')
  table.string('occupation')
  table.string('contact_name')
  table.string('position')
  table.string('email')
  table.integer('phone')
  table.integer('phone_extension')
  table.integer('fax')
  table.integer('mobile')
  table.string('corresponence_contact')
  table.string('payroll contact')
  table.string('mailing_address')

  })
};

exports.down = function(knex, Promise) {
  console.log('droppedTable')
  return knex.schema.dropTableIfExists('contacts')
};
