var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var knex = require('knex')

var port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World')
})


var knexConfig = require('./knexfile.js')

var knex = knex(knexConfig[process.env.NODE_ENV || 'development'])

var env = 'production'
var knexConfig = require('./knexfile.js')
var knexGenerator = require('knex')
var knexDbConfig = knexConfig[env]
global.knex = knexGenerator(knexDbConfig)



////*** Add New Contact ***\\\


app.post('/addContact', function (req, res) {

  payload = req.body.payload.person

  console.log('payload: ', payload)
  console.log('first name: ', payload.first_name)

knex('contacts').insert({
  contact_name: payload.full_name,

})
.then(function(data, err){
  if(err){
    console.log('error message: ', err)
  } else {
  console.log('New Nationbuilder Contact Entered into SQL Database')
    }
  })
});


////**** Update Person ****\\\\

app.post("/updatePerson", function(req, res) {

  payload = req.body.payload.person
  console.log("update person payload", payload)

  knex('contacts').where({contact_id: payload.id}).update({
      updated_at: payload.updated_at,
      contact_name: payload.full_name,
      employer: payload.employer,
      email: payload.email,
      phone: payload.phone,
      fax: payload.fax_number,
      mobile: payload.mobile,
      corresponence_contact: payload.primary_address,
      mailing_address: payload.mailing_address
    })
    .then(function(data, err){
      if(err){
        console.log('error message: ', err)
      } else {
      console.log('Person Successfully Updated from Nationbuilder to SQL')
      }
  })
})




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





app.listen(port)
