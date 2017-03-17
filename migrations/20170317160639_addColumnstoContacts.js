
exports.up = function(knex, Promise) {
  return knex.schema.table('contacts', function(table) {

    table.integer('unite_id')
    table.string('employer')
    table.string('occupation')
  })
}

exports.down = function(knex, Promise) {
  console.log('droppedTable')
  return knex.schema.dropTableIfExists('contacts')
}
