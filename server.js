var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var knex = require('knex')

app.get('/', function (req, res) {
  res.send('Hello World')
})


var knexConfig = require('./knexfile.js')

var knex = knex(knexConfig[process.env.NODE_ENV || 'development'])

var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres!');
});

app.use(logger('dev'));
app.use(cookieParser());


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







app.listen(3000)
