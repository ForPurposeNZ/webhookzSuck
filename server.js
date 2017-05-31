var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var knex = require('knex')
var request = require('request')

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


////**** QuotaGuardStatic mySQL connection ****\\\\


var mysql = require('mysql2')
    request = require('request');
    url = require('url'),
    SocksConnection = require('socksjs');

var remote_options = {
    host:'50.23.215.146',
    port: 3306
};

var proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL),
    auth = proxy.auth,
    username = auth.split(':')[0],
    pass = auth.split(':')[1];

var sock_options = {
    host: proxy.hostname,
    port: 1080,
    user: username,
    pass: pass
};

var sockConn = new SocksConnection(remote_options, sock_options);
var dbConnection = mysql.createConnection({
    user: 'unitemem_pituser',
    database: 'unitemem_sandpit',
    password: 'Du1s58@@3',
    stream: sockConn
});


dbConnection.query('SELECT 1+1 as test1;', function(err, rows, fields) {
    if (err) throw err;

    console.log('sockConn: ', sockConn)

    sockConn.dispose();
  });

dbConnection.end();



////*** Add New Contact ***\\\


app.post('/addContact', function (req, res) {

  console.log('sockConn: ', sockConn)

//   payload = req.body.payload.person
//
// //  // function correspondence_contact() {
// //  //    if (payload.primary_address.address1 == null ||
// //  //        payload.primary_address.address2 == null ||
// //  //        payload.primary_address.address3 == null ||
// //  //        payload.primary_address.city == null) {
// //  //      return ''
// //  //    } else {
// //  //      return payload.primary_address.address1 && payload.primary_address.address2 && payload.primary_address.address3 && payload.primary_address.city
// //  //    }
// //  //  }
// //
// //
// //   //console.log('payload: ', payload)
//   console.log('full name: ', payload.full_name)
//   console.log("id: ", payload.id)
//   console.log('address1', payload.primary_address.address1)
// // //   // //console.log('correspondence_contact: ', correspondence_contact() )
// // //   // // console.log(payload.full_name, 'Member_id/unite_id:', payload.unite_id, 'id:', payload.id)
// //
// //
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
//     console.log( data, payload.full_name, 'entered into SQL Database')
//       }
//     })
   });


////**** Update Person ****\\\\

// app.post("/updatePerson", function(req, res) {
//
//   payload = req.body.payload.person
//
//   console.log(payload.primary_address.address1)
//
//   function correspondence_contact() {
//      if (payload.primary_address.address1 == null) {
//        console.log("null")
//      } else {
//        console.log(payload.primary_address.address1)
//    }
//  }
 //
 //  knex('contacts').where({id: payload.id}).update({
 //    contact_name: payload.full_name,
 //    Member_id: payload.unite_id,
 //    id: payload.id,
 //    employer: payload.employer,
 //    occupation: payload.occupation,
 //    position: payload.position,
 //    Worksite_id: payload.employer,
 //    email: payload.email,
 //    phone: payload.phone,
 //    mobile: payload.mobile,
 //    correspondence_contact: correspondence_contact(),
 //    Auto_note: 1,
 //    Code_id: 10,
 //    Added_by: 46825
 //
 //    })
 //    .then(function(data, err){
 //      if(err){
 //        console.log('error message: ', err)
 //      } else {
 //      console.log('Person Successfully Updated from Nationbuilder to SQL')
 //      }
 //  })
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
