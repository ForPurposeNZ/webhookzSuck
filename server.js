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
  console.log('first name: ', payload.first_name)

knex('contacts').insert({ contact_name: payload.first_name })
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

  knex('contacts').where({id: payload.id}).update({
      updated_at: payload.updated_at,
      contact_name: payload.first_name && payload.last_name,
      email: payload.email,
      phone: payload.phone  //still need to add a few more inputs but need to see payload to structure naming
    })
    .then(function(data, err){
      if(err){
        console.log('error message: ', err)
      } else {
      console.log('Person Successfully Updated from Nationbuilder to SQL')
      }
  })
})






app.listen(port)
