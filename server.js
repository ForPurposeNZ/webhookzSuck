var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var knex = require('knex')
var request = require('request')

require('dotenv').config()

var port = process.env.PORT || 8080

console.log(port)



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World')
})


// var knexConfig = require('./knexfile.js')
//
// var knex = knex(knexConfig[process.env.NODE_ENV || 'development'])
//
// var env = 'production'
// var knexConfig = require('./knexfile.js')
// var knexGenerator = require('knex')
// var knexDbConfig = knexConfig[env]
// global.knex = knexGenerator(knexDbConfig)


////**** QuotaGuardStatic mySQL connection ****\\\\

var mysql = require('mysql2')
var url = require("url")
var SocksConnection = require('socksjs')

var remote_options = {
  host:'50.23.215.146',
  port: 3306
};

var proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL)
var auth = proxy.auth;
var username = auth.split(":")[0]
var pass = auth.split(":")[1]

var sock_options = {
  host: proxy.hostname,
  port: 1080,
  user: username,
  pass: pass
}

var sockConn = new SocksConnection(remote_options, sock_options)


var dbConnection = mysql.createConnection({
user: process.env.DB_USER,
database: process.env.DB_DATABASE,
password: process.env.DB_PASSWORD,
stream: sockConn
})


dbConnection.query('SELECT 1+1 as test1;', function(err, rows, fields) {
    if (err) throw err;

    console.log('Result: ', rows);
    // sockConn.dispose();
});

// dbConnection.query('SELECT * FROM `contacts` WHERE `contact_name` = "Mark & Debi Rush";', function(err, rows, fields) {
//     if (err) throw err;
//
//     console.log('Result: ', rows);
// });

var table = 'contacts'
var dataTest = 'test'
var column = '(contact_name)'


app.post('/addContact', function (req, res) {

  payload = req.body.payload.person


  dbConnection.query('INSERT INTO ' + table + ' SET contact_name="' + payload.full_name + '"', function(err, rows, fields) {
    if (err) throw err;





    console.log("its in thurr:  ", rows)

    // sockConn.dispose();


  })

})



// dbConnection.end();

//
//

////*** Add New Contact ***\\\


// app.post('/addContact', function (req, res) {
//
//   payload = req.body.payload.person
//
//   console.log('full name: ', payload.full_name)
//   console.log("id: ", payload.id)
//
//   knex('contacts').insert({
//     contact_name: payload.full_name,
//     Member_id: payload.unite_id,
//     id: payload.id,
//     employer: payload.employer,
//     occupation: payload.occupation,
//     position: payload.position,
//     Worksite_id: payload.employer,
//     email: payload.email,
//     phone: payload.phone,
//     mobile: payload.mobile,
//     //correspondence_contact: correspondence_contact(),
//     Auto_note: 1,
//     Code_id: 11,
//     Added_by: 46825
//
//   }).then(function(data, err){
//     if(err) {
//       console.log('error message: ', err)
//     } else {
//     console.log( payload.full_name, 'entered into SQL Database')
//       }
//     })
//    });


app.listen(port)
