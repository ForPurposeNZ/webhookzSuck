var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var request = require('request')

require('dotenv').config()

var port = process.env.PORT || 8080


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello World')
})


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

console.log("up, running, ready and awaiting...")


dbConnection.query('SELECT 1+1 as test1;', function(err, rows, fields) {
    if (err) throw err;

    console.log('Result: ', rows);
    // dbConnection.end();
});



// TODO:
//Figure out pooling / connection open-close.
//suss correspondence_contact
// only entering if mamberid != null




/////***** Relevant Variables and Functions *****/////

var membersTable = 'members'
var extInfoUniteTable = 'ext_info_unite'

var addMemberdata = 'INSERT INTO ' + membersTable + ' SET ?'
var addMemberNotes = 'INSERT INTO ' + extInfoUniteTable + ' SET ?'

// var updateMemberData = 'UPDATE ' + membersTable + ' SET ? WHERE contact_id= '+ payload.id, relevantData,
// var updateMemberNotes = 'UPDATE ' + extInfoUniteTable + ' SET ? WHERE contact_id= '+ payload.id, relevantData,

var addPerson = function() {

    dbConnection.beginTransaction(function(err) {
    if (err) { throw err }
    dbConnection.query(addMemberdata, memberTableData, function(err, result) {
      if (err) {
        dbConnection.rollback(function() {
          throw err
        })
      }

      dbConnection.query(addMemberNotesData, memberNotesData, function(err, result) {
        if (err) {
          dbConnection.rollback(function() {
            throw err
          });
        }
        dbConnection.commit(function(err) {
          if (err) {
            dbConnection.rollback(function() {
              throw err
            })
          }
          console.log('Transaction Complete.');
          dbConnection.end()
        })
      })
    })
  })
}

//
// app.post('/updatePerson', function (req, res) {
//   console.log("reaching line 115")
//   var payload = req.body.payload.person
//   console.log('Updated Person  : ***', payload.first_name)
//
// })


app.post('/changePerson', function (req, res) {


     payload = req.body.payload.person

  var relevantData = {
      contact_id: payload.id,
      contact_name: payload.full_name,
      position: payload.position,
      email: payload.email,
      phone: payload.phone,
      mobile: payload.mobile,
      Note_text: "Updated using Nationbuilder"
      // Auto_note: 1,
      // Code_id: 11,
      // Added_by: 46825
    }

  dbConnection.query('UPDATE ' + table + ' SET ? WHERE contact_id= '+ payload.id, relevantData, function(err, rows, fields) {
    if (err) throw err;

    console.log(payload.full_name, "is now updated:  ", rows)
  })
})

//*** Add New Contact ***\\\


app.post('/addPerson', function (req, res) {

    var payload = req.body.payload.person

    var memberTableData = {

        member_id: payload.unite_id,
        firstname_primary: payload.first_name,
        lastname_primary: payload.last_name,
        // addr1: payload.primary_address.address1,
        // addr2:payload.primary_address.address2,
        // city: payload.primary_address.city,
        // postcode: payload.primary_address.zip,
        email: payload.email,
        phone_mobile: payload.mobile,
        phone_home: payload.phone
    }

    var memberNotesData = {

          last_status_change: new Date().toString(),
          member_id: payload.unite_id,
          worksite_id: payload.employer
          // note_text: "signed up with Nationbuilder",
          // note_id: AUTO_INCREMENT,
          // auto_note: 1,
          // code_id: 11,
          // added_by: 46825
    }

    if (payload.unite_id != null) {
     return addContact()
    } else {
      console.log('contact is not a unite Member or has not been assigned Unite Member I.D.')
    }
})


/////***** Update Contact *****/////




//http://www.codediesel.com/nodejs/mysql-transactions-in-nodejs/





app.listen(port)
