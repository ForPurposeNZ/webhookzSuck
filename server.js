"use strict"
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


// http = require("http");
// url = require("url");
//
// proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);
// target  = url.parse("http://google.com");


// var username = auth.split(":")[0]
// var pass = auth.split(":")[1]
//
// var sock_options = {
//   host: proxy.hostname,
//   port: 1080,
//   user: username,
//   pass: pass


// console.log("proxy: ", process.env.QUOTAGUARDSTATIC_URL, proxy)
// console.log(target.hostname)
// console.log("Basic " + (new Buffer(proxy.auth).toString("base64")))
// //
// options = {
//   hostname: proxy.hostname,
//   port: proxy.port || 80,
//   path: target.href,
//   headers: {
//     "Proxy-Authorization": "Basic " + (new Buffer(proxy.auth).toString("base64")),
//     "Host" : target.hostname
//   }
// };
//
// http.get(options, function(res) {
//   res.pipe(process.stdout);
//   return console.log("status code", res.statusCode);
// });


////**** QuotaGuardStatic mySQL connection ****\\\\
//
//
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

console.log("proxy: ", proxy)
console.log("u/p:", username, pass)

var sock_options = {
  host: proxy.hostname,
  port: 1080,
  user: username,
  pass: pass
}

var sockConn = new SocksConnection(remote_options, sock_options)

// console.log(process.env)

// var dbConnection = mysql.createPool({
var pool = mysql.createPool({
    // host:'50.23.215.146',
  connectionLimit : 10,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  wait_timeout: 60000,
  stream: sockConn
})

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


// dbConnection.connect(function(err) {
//   if (err) {
//     // console.error('error connecting-->: ' + err.stack);
//     throw err
//     return;
//   }
//
//   console.log('connected as id ' + connection.threadId);
// })



console.log("proxy.hostname -->", proxy.hostname, "proxy.port--->", proxy.port)

// TODO:
//Figure out pooling / connection open-close.
//error handling
//suss correspondence_contact


//TONIGHT: go back to pre transaction(in a separate branch) connection and see if it makes a difference

/////***** Relevant Variables and Functions *****/////

var membersTable = 'members'
var extInfoUniteTable = 'ext_info_unite'

var addMemberdata = 'INSERT INTO ' + membersTable + ' SET ?'
var addMemberNotes = 'INSERT INTO ' + extInfoUniteTable + ' SET ?'

//*** Add New Contact ***\\\


app.post('/addPerson', function (req, res) {

  console.log("hey! I was called!")

//     var payload = req.body.payload.person
//
//     var memberTableData = {
//         member_id: payload.unite_id,
//         firstname_primary: payload.first_name,
//         lastname_primary: payload.last_name,
//         // addr1: payload.primary_address.address1,
//         // addr2:payload.primary_address.address2,
//         // city: payload.primary_address.city,
//         // postcode: payload.primary_address.zip,
//         email: payload.email,
//         phone_mobile: payload.mobile,
//         phone_home: payload.phone
//     }
//
//     var memberNotesData = {
//           last_status_change: new Date().toString(),
//           member_id: payload.unite_id,
//           worksite_id: payload.employer,
//           // note_text: "signed up with Nationbuilder",
//           // note_id: AUTO_INCREMENT,
//           // auto_note: 1,
//           code_id: 11,
//           updateby: 46825
//     }
//     if (payload.full_name != null) {
//         dbConnection.beginTransaction(function(err) {
//           if (err) {
//             //console.log('error at line 116!', err)
//             throw err
//           }
//           dbConnection.query(addMemberdata, memberTableData, function(err, result) {
//             if (err) {
//               throw err
//             }
//
//             dbConnection.query(addMemberNotes, memberNotesData, function(err, result) {
//               if (err) {
//                 throw err
//               }
//
//               dbConnection.commit(function(err) {
//                 if (err) {
//                   throw err
//                 }
//                 console.log('Transaction Complete, person added');
//                 // dbConnection.end()
//               })
//             })
//           })
//         })
//     } else {
//       console.log('ERROR trying to ADD person: ' + payload.full_name + ' is not a unite Member or has not been assigned Unite Member I.D.')
//     }
})


//lines 119, 126, 130, 132
// if (err) {
//   dbConnection.rollback(function() {
//     throw err
//   })
// }


/////***** Update Contact *****/////

app.post('/changePerson', function (req, res) {

  console.log('connecting IP:', req.connection.remoteAddress)

  var payload = req.body.payload.person
  console.log('req...firstname! -->', payload.first_name)

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
      phone_home: payload.phone,
      updateby: 46825
  }

  var  extInfoData = { // memberNotesData
        last_status_change: new Date().toString(),
        member_id: payload.unite_id,
        worksite_id: payload.employer
        // note_text: "signed up with Nationbuilder",
        // note_id: AUTO_INCREMENT,
        // auto_note: 1,
        // code_id: 11
  }
  if (payload.first_name != null) {

    pool.getConnection(function(err, dbConnection) {
      // connected! (unless `err` is set)
      // console.log('Got DB connection: ', dbConnection)
      dbConnection.beginTransaction(function(err) {
        if (err) { throw err }
        let updateMemberData =
          `UPDATE ${membersTable} SET ? WHERE member_id = ${payload.unite_id}`
        console.log("updateMemberData", updateMemberData)
        // console.log("memberTableData", memberTableData)
        dbConnection.query(updateMemberData, memberTableData, function(err, result) {
          if (err) {
            dbConnection.rollback(function() {
              throw err
            })
          }

          console.log("member data result:", result)

          let updateExtInfo =
            `UPDATE ${extInfoUniteTable} SET ? WHERE member_id = ${payload.unite_id}`
          dbConnection.query(updateExtInfo, extInfoData, function(err, result) {
          // dbConnection.query(updateExtInfo, function(err, result) {
            if (err) {
              dbConnection.rollback(function() {
                throw err
              });
            }

            console.log("ext_info result:", result)

            // let selectMemberData = `SELECT * FROM members WHERE member_id = 12431`
            // let selectMemberNotes = `SELECT * FROM ext_info_unite WHERE member_id = 2425`
            // dbConnection.query(selectMemberData, (err, res) => {
            //   if (err) { console.log(`WARNING: unexpected query error: ${err}`) }
            //   console.log('member data: ', res)
            //   dbConnection.query(selectMemberNotes, (err, res) => {
            //     if (err) { console.log(`WARNING: unexpected query error: ${err}`) }
            //     console.log('member notes:', res)
            //   })
            // })

            dbConnection.commit(function(err) {
              if (err) {
                dbConnection.rollback(function() {
                  throw err
                })
              }
              console.log('Transaction Complete, person updated.');
            // dbConnection.end()
            })
          })
        })
      })
    });
  } else {
    console.log('ERROR trying to UPDATE person: ' + payload.full_name + ' is not a unite Member or has not been assigned Unite Member I.D.')
      throw (err)
  }

})






app.listen(port)
