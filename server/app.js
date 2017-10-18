const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const app = express();
var movieData = []

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.use(morgan('dev'));
// runs a function when the request matches the path 
//http://www.omdbapi.com/?&apikey=8730e0e&t=baby%20driver
app.get('/', function (req, res) {
  for (var counter = 0; counter < movieData.length; counter++) {
    if (movieData[counter].url === req.url) {
      return res.json(movieData[counter].data)
    }
  }

  if (req.query.i) {
    axios.get('http://www.omdbapi.com/?apikey=8730e0e&i=' + req.query.i)
      .then(function (response) {
        var movie = {
          url: req.url,
          data: response.data
        }
        movieData.push(movie)
        res.json(response.data)
      }).catch(function (error) {
        res.status(500).send(error.message);
      })

  } else if (req.query.t) {
    axios.get('http://www.omdbapi.com/?apikey=8730e0e&t=' + req.query.t)
      .then(function (response) {
        var movie = {
          url: req.url,
          data: response.data
        }
        movieData.push(movie)
        res.json(response.data)
      }).catch(function (error) {
        res.status(500).send(error.message);
      })

  } else {
    res.send('missing i or t in query');
  }
});





// if req.query.i has been requested before
// look for a match in the iQueries array
// if there is a match
// find the matching data in movieData
// 'for' loop through the array to find a match
// return res.json(matchingData)
// else there is no match
// request new data from omdb
// if then()
// push req.query.i into iQueries
// push response.data to movieData
// respond as json with response.data
// if catch()
// respond with error


// app.use(morgan('dev'));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;