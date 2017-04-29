var express = require('express');
var router = express.Router();
var apod = require('../helpers/apod');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AstroPix' });
});


/* GET a picture from the APOD service */
router.get('/fetch_picture', function(req, res, next){

  if (req.query.today) {

    apod(function(data, error){
      if (error) {
        return res.render('apod_error', { error : error.message });
      }
      return res.render('picture', { apod : data });
    }, true);

  }

  else if (req.query.random) {

    apod(function(data, error) {
      if (error) {
        return res.render('apod_error', { error : error.message });
      }
      return res.render('picture', { apod : data });
    });

  } else {
    next();  // Send to next route handler.
    // Since we haven't defined one, this will end up at the 404 error handler
  }
});

module.exports = router;


