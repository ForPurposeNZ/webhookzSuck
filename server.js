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


////**** Fixie mySQL connection ****\\\\

const fixieRequest = request.defaults({'proxy': process.env.FIXIE_URL});

fixieRequest('http://www.example.com', (err, res, body) => {
  console.log(`Got response: ${res.statusCode}`);
});

const fixieConnection = new SocksConnection(mysqlServer, {
  user: fixieValues[0],
  pass: fixieValues[1],
  host: fixieValues[2],
  port: fixieValues[3],
});

console.log(process.env.FIXIE_URL)



////*** test fixie with webhookzs ***\\\



const mysql = require('mysql2');
const SocksConnection = require('socksjs');

const fixieUrl = process.env.FIXIE_SOCKS_HOST;
const fixieValues = fixieUrl.split(new RegExp('[/(:\\/@)/]+'));

const mysqlServer = {
  host: '50.23.215.146',
  port: 3306
};


const fixieConnection = new SocksConnection(mysqlServer, {
  user: fixieValues[0],
  pass: fixieValues[1],
  host: fixieValues[2],
  port: fixieValues[3],
});


fixieRequest.post('https://lastchancesaloon.herokuapp.com/addContact', function (err, res, body) {

  console.log("req", req, "body: ", body)

)}




////*** Add New Contact ***\\\


// fixieRequest.post('https://lastchancesaloon.herokuapp.com/addContact', function (err, res, body) {
//
//   console.log("req", req, "body: ", body)
//
//   //payload = req.body.payload.person
//
//  // function correspondence_contact() {
//  //    if (payload.primary_address.address1 == null ||
//  //        payload.primary_address.address2 == null ||
//  //        payload.primary_address.address3 == null ||
//  //        payload.primary_address.city == null) {
//  //      return ''
//  //    } else {
//  //      return payload.primary_address.address1 && payload.primary_address.address2 && payload.primary_address.address3 && payload.primary_address.city
//  //    }
//  //  }
//
//
//   //console.log('payload: ', payload)
//   console.log('full name: ', payload.full_name)
//   console.log("id: ", payload.id)
//   // //console.log('address1', payload.primary_address.address1)
//   // //console.log('correspondence_contact: ', correspondence_contact() )
//   // // console.log(payload.full_name, 'Member_id/unite_id:', payload.unite_id, 'id:', payload.id)
//
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
//     console.log( data, payload.full_name, 'entered into SQL Database')
//       }
//     })
//    });


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
//})


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
