var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var knex = require('knex')

app.get('/', function (req, res) {
  res.send('Hello World')
})


var knexConfig = require('./knexfile.js')

var knex = knex(knexConfig[process.env.NODE_ENV || 'development'])


app.post('/addContact', function (req, res) {

  console.log('payload: ', payload)
  console.log('firs name: ', payload.first_name)

knex('contacts').insert({ contact_name: payload.first_name })
.then(function(data, err){
  if(err){
    console.log('error message: ', err)
  } else {
  console.log('check data is entered')
    }
  })
});







app.listen(3000)
