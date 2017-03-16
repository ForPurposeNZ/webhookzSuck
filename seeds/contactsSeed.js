exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('contacts').insert({contact_id: 144000, contact_name: 'Sid Vicious '}),
        knex('contacts').insert({contact_id: 144000, mobile: 0221306360}),
        knex('contacts').insert({contact_id: 144000, position: 'crew'}),
        knex('contacts').insert({contact_id: 2, contact_name:'Charlie' && 'Cunningham', position: 'crew', mobile: 0234598 })
      ]);
    });
};
