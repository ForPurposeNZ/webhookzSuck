
exports.up = function(knex, Promise) {
  knex.schema.dropTable('contacts')
};

exports.down = function(knex, Promise) {
  console.log('exports down contacts drop table')
};


//
// exports.up = function(knex, Promise) {
//   return knex.schema.table('contacts', function(table) {
//     table.integer('unite_id')
//     table.string('employer')
//     table.string('occupation')
//   })
//
// };
//
// exports.down = function(knex, Promise) {
//   console.log('droppedTable')
//
// };
