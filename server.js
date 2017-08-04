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


/////***** Relevant Variables and Functions *****/////

var membersTable = 'members'
var extInfoUniteTable = 'ext_info_unite'
var membersNotes = 'member_notes'

//*** Add New Contact ***\\\


app.post('/addPerson', function (req, res) {

  var payload = req.body.payload.person
  console.log('beginning to add -->', payload.first_name)

  var memberTableData = {
      member_id: payload.unite_id,
      firstname: payload.first_name,
      lastname: payload.last_name,
      // addr1: payload.primary_address.address1,
      // addr2:payload.primary_address.address2,
      // city: payload.primary_address.city,
      // postcode: payload.primary_address.zip,
      email: payload.email,
      phone_mobile: payload.mobile,
      phone_home: payload.phone,
      updateby: 46825
  }

  var membersNotesData = {
      // note_id: AUTO_INCREMENT,
      member_id: payload.unite_id,
      note_text: "signed up with Nationbuilder",
      added_by: 46825,
      date_time: new Date().toString(),
      auto_note: 1,
      code_id: 11,
      worksite_id: payload.employer
  }

  var extInfoData = {
      last_status_change: new Date().toString(),
      member_id: payload.unite_id,
      worksite_id: payload.employer,
      date_entered: new Date().toString()
  }

  if (payload.unite_id != null) {

    pool.getConnection(function(err, dbConnection) {

      // return pool.query('START TRANSACTION')
      //   if (err) { throw err }

      // connected! (unless `err` is set)
      // console.log('Got DB connection: ', dbConnection)

      dbConnection.beginTransaction(function(err) {
        if (err) { throw err }

        let updateMemberData =
          `INSERT ${membersTable} SET ?`
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
            `INSERT ${extInfoUniteTable} SET ?`
          dbConnection.query(updateExtInfo, extInfoData, function(err, result) {
          // dbConnection.query(updateExtInfo, function(err, result) {
            if (err) {
              dbConnection.rollback(function() {
                throw err
              })
            }


            let updateMembersNotes =
              `INSERT ${membersNotes} SET ?`
              console.log("updateMemberNotes", updateMembersNotes)
            dbConnection.query(updateMembersNotes, membersNotesData, function(err, result) {
              if (err) {
                dbConnection.rollback(function() {
                  throw err
                })
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
              console.log('Transaction Complete, person added to SQL db.')
              return res.status(200)
              getConnection.end()
              })
            })
          })
        })
      })
    });
  } else {
    console.log('ERROR trying to UPDATE person: ' + payload.full_name + ' is not a unite Member or has not been assigned Unite Member I.D.')
  }
})



/////***** Update Contact *****/////

app.post('/changePerson', function (req, res) {

  console.log('connecting IP:', req.connection.remoteAddress)

  var payload = req.body.payload.person
  console.log('req...firstname! -->', payload.first_name)

  var memberTableData = {
      member_id: payload.unite_id,
      firstname: payload.first_name,
      lastname: payload.last_name,
      // addr1: payload.primary_address.address1,
      // addr2:payload.primary_address.address2,
      // city: payload.primary_address.city,
      // postcode: payload.primary_address.zip,
      email: payload.email,
      phone_mobile: payload.mobile,
      phone_home: payload.phone,
      updateby: 46825
  }

  var membersNotesData = {
      // note_id: AUTO_INCREMENT,
      member_id: payload.unite_id,
      note_text: "signed up with Nationbuilder",
      added_by: 46825,
      date_time: new Date().toString(),
      auto_note: 1,
      code_id: 10,
      worksite_id: payload.employer
  }

  var extInfoData = {
      last_status_change: new Date().toString(),
      member_id: payload.unite_id,
      worksite_id: payload.employer,
      date_entered: new Date().toString()
  }

  if (payload.unite_id != null) {

    pool.getConnection(function(err, dbConnection) {

      // return pool.query('START TRANSACTION')
      //   if (err) { throw err }
      //
      // //connected! (unless `err` is set)
      // console.log('Got DB connection: ', dbConnection)

      dbConnection.beginTransaction(function(err) {
        if (err) { console.log("error", err) }

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
              })
            }


            let updateMembersNotes =
              `UPDATE ${membersNotes} SET ? WHERE member_id = ${payload.unite_id}`
              console.log("updateMemberNotes", updateMembersNotes)
            dbConnection.query(updateMembersNotes, membersNotesData, function(err, result) {
              if (err) {
                dbConnection.rollback(function() {
                  throw err
                })
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
              console.log('Transaction Complete, person updated.')
              return res.status(200)
              getConnection.end()
              })
            })
          })
        })
      })
    });
  } else {
    console.log('ERROR trying to UPDATE person: ' + payload.full_name + ' is not a unite Member or has not been assigned Unite Member I.D.')
    }
  })

//return http status ok




app.listen(port)
