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



app.post('/addContact', function (req, res) {

  payload = req.body.payload.person

  console.log('payload: ', payload)
  console.log('first name: ', payload.first_name)

knex('contacts').insert({ contact_name: payload.first_name })
.then(function(data, err){
  if(err){
    console.log('error message: ', err)
  } else {
  console.log('check data is entered')
    }
  })
});







// app.listen(3000)
