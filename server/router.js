const express = require('express');
const router = require('express').Router();
const db = require('../database');
const helper = require('./helper.js');
const Promise = require('bluebird');

// to provide some listing in the related neighbourhood
// for now we have a set number of houses with known id
// we are just going to choose 8 numbers randomly between 1 and 100

router.get('/somelistings', (req, res, next) => {
  var randomDraw = helper.randomize(100);
  // console.log("get request for listings");
  db.findMultiple(randomDraw)
    .then((data) => {
      // console.log('data retrieved!');
      res.write(JSON.stringify(data));
      res.status(200).end();
    }).catch((err) => {
      console.log('error encountered during data retrieval... ', err);
      res.status(404).end();
    })
});

router.get('/reqFromClient/:homeId', (req, res, next) => {
  var homeId = req.params.homeId;
  // generate random number based on seed
  // console.log("get request for homeId");
  var randomDraw = helper.randomize(100);
  db.findMultiple(randomDraw)
    .then((data) => {
      console.log('data retrieved!');
      res.write(JSON.stringify(data));
      res.status(200).end();
    }).catch((err) => {
      console.log('error encountered during data retrieval... ', err);
      res.status(404).end();
    })
});


module.exports = router;