var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Get Userlist page */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection =  db.get('usercollection');
  collection.find({},{}, function(e, docs){
    res.render('userlist', {
       "userlist" : docs,
        "title" : "Add user"
    });
  });
});


/* Get new user page */
router.get('/newuser', function(req, res){
  res.render('newuser', { title: 'Add new user'})
});

/* POST to add user service */
router.post('/adduser', function(req, res){
    //Set our internal DB variable
    var db = req.db;

    //Get our form values. These rely on the "name" attributes
    var username = req.body.username;
    var useremail = req.body.useremail;

    //Set our collection
    var collection = db.get('usercollection');

    //submit to the DB
    collection.insert({
        "username" : username,
        "email" : useremail
    }, function(err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the info to the database");
        }else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});



module.exports = router;
