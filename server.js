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

  //console.log('payload: ', payload)
  console.log('first name: ', payload.full_name)
  //console.log('unite id: ', payload.unite_id, 'employer',payload.employer, 'occupation: ', payload.occupation, 'position: ', payload.position, 'phone:', payload.phone,'mobile:', payload.mobile, 'corresponence_contact', payload.primary_address, 'mailing_address:', payload.mailing_address)

  // console.log('corresponence_contact', payload.primary_address,
  //             'payload.primary_address.address1: ', payload.primary_address.address1,
  //             'payload.primary_address.address2: ', payload.primary_address.address2,
  //             'payload.primary_address.address3: ', payload.primary_address.address3,
  //             'payload.primary_address.city: ', payload.primary_address.city
  //           )


  var correspondenceContact = payload.primary_address.address1 +
            payload.primary_address.address2 +
            payload.primary_address.address3 +
            payload.primary_address.city

  //console.log("Work! HERE! : ", correspondenceContact)


  knex('contacts').insert({
    contact_name: payload.full_name,
    Nationbuilder_id: payload.id,
    employer: payload.employer,
    occupation: payload.occupation,
    position: payload.position,
    email: payload.email,
    phone: payload.phone,
    mobile: payload.mobile,
    city: payload.primary_address.city
  })
  .then(function(data, err) {
      if (payload.primary_address != null) {
        knex('contacts').insert({
          corresponence_contact: correspondenceContact
        })
      } else {
      console.log('Data Entered, no physical correspondence address given')
        }
      })
  .then(function(data, err){
    if(err) {
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


////**** Delete a Person ****\\\\


app.post("/deletePerson", function(req, res) {

  payload = req.body.payload.person

  knex('contacts').where({unite_id: payload.unite_id}).del()
  .then(function(data, err){
    if(err){
      console.log('error message: ', err)
    } else {
    console.log('Person Deleted. Goodbye.')
    }
  })
})




app.listen(port)
