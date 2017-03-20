
exports.up = function(knex, Promise) {
  knex.schema.dropTable('contacts')
};

exports.down = function(knex, Promise) {
  console.log('exports down contacts drop table')
};
