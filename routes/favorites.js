var express = require('express');
var router = express.Router();


/* GET favorites page. */
router.get('/', function(req, res, next) {
  res.render('favorites', {favorites : req.session.favorites});
});


/* POST Add new favorite */
router.post('/add', function(req, res, next){

  // If no favorites array, create one
  if (!req.session.favorites) {
    req.session.favorites = [] ; //Create empty array
  }

  //Check if this image is already in array
  for (var x = 0 ; x < req.session.favorites.length ; x++) {
    if (req.session.favorites[x].date == req.body.date) {
      console.log('This is already a favorite');
      return res.redirect('back');   // Back to previous page
    }
  }

  // If not, add to array and redirect to favorites page
  req.session.favorites.push(req.body);
  res.redirect('/favorites');

});

module.exports = router;
