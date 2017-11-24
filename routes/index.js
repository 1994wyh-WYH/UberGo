var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550.cxzyd6qo9cfb.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  password : '550UberGo',
  database : 'cis550'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/reference', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
});

router.post('/insert', function(req, res, next) {
  var query = 'INSERT INTO Person VALUES("'+req.body.login+'","'+req.body.name+'","'+req.body.sex+'","'+req.body.RelationshipStatus+'",'+req.body.Birthyear+');'
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'Something failed!' })
    }
    else {
        res.send('Inserted');
    }  
    });
});

router.get('/data/:email', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = 'SELECT* FROM HOLIDAY';
  // you may change the query during implementation
  var email = req.params.email;
  if (email != 'undefined') query = query + ' having login ="' + email + '"' ;
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

// ----Your implemention of route handler for "Insert a new record" should go here-----


module.exports = router;