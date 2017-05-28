var supertest = require('supertest')
var should = require('chai').should()
var expect = require('chai').expect
var api = supertest('https://lastchancesaloon.herokuapp.com')


var test = require('tape')
var express = require('express')
var app = express()



// test('get status code 200 from /v1/cats', function(t) {
//   request(app)
//     .get('/v1/cats')
//     .expect(200)
//     .end(function(err, res) {
//       t.false(err)
//       t.end()
//     })
// })


test('new contact is entered into database', function(t) {
  supertest(app)
    .get('/addContact')
    .expect(200)
    .end(function(err, res) {
      t.false(err)
      t.end()
    })
})
