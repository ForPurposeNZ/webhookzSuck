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

  let correspondence_contact = {
    if (payload.primary_address.address1 || payload.primary_address.address2 || payload.primary_address.address3 || payload.primary_address.city = null) {
      return ''
    } else {
      return payload.primary_address.address1 && payload.primary_address.address2 && payload.primary_address.address3 && payload.primary_address.city
    }
  }

  //console.log('payload: ', payload)
  // console.log('full name: ', payload.full_name)
  // console.log("id: ", payload.id)
  console.log('correspondence_contact: ', correspondence_contact)
  // console.log(payload.full_name, 'Member_id/unite_id:', payload.unite_id, 'id:', payload.id)

  //
  // knex('contacts').insert({
  //   contact_name: payload.full_name,
  //   Member_id: payload.unite_id,
  //   id: payload.id,
  //   employer: payload.employer,
  //   occupation: payload.occupation,
  //   position: payload.position,
  //   Worksite_id: payload.employer,
  //   email: payload.email,
  //   phone: payload.phone,
  //   mobile: payload.mobile,
  //   correspondence_contact: correspondence_contact,
  //   Auto_note: 1,
  //   Code_id: 11
  //
  // })
  //
  // // .then(function(data, err) {
  // //     if (payload.primary_address != null) {
  // //       knex('contacts').insert({
  // //         correspondence_contact: correspondenceContact
  // //       })
  // //     } else {
  // //     console.log('Data Entered, no physical correspondence address given')
  // //       }
  // //     })
  // .then(function(data, err){
  //   if(err) {
  //     console.log('error message: ', err)
  //   } else {
  //   console.log('New Nationbuilder Contact Entered into SQL Database')
  //     }
  //   })


   });


////**** Update Person ****\\\\

app.post("/updatePerson", function(req, res) {

  payload = req.body.payload.person
  console.log("update person payload", payload)

  knex('contacts').where({contact_id: payload.id}).update({
    contact_name: payload.full_name,
    Member_id: payload.unite_id,
    id: payload.id,
    employer: payload.employer,
    occupation: payload.occupation,
    position: payload.position,
    Worksite_id: payload.employer,
    email: payload.email,
    phone: payload.phone,
    mobile: payload.mobile,
  //  address1: payload.primary_address.address1,
  //  address2: payload.primary_address.address2,
  //  address3: payload.primary_address.address3,
  //  city: payload.primary_address.city
  Auto_note: 1,
  Code_id: 10

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
