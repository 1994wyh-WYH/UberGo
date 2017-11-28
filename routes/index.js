var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var oracledb  = require('oracledb');

var connAttrs = {
  user     : "admin",
  password : '550UberGo',
  connectString: "//cis550.cxzyd6qo9cfb.us-east-1.rds.amazonaws.com:1521/orcl"
};

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

router.get('/data/:hour', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = 'select * ' +
   'from (select t.pickup_longitude, t.pickup_latitude, count (*) as num from trip t ';
  var where = 'where EXTRACT(hour from t.pickup_datetime) = ';

   var groupBy = 'group by t.pickup_longitude, t.pickup_latitude order by num desc) where rownum<=10';
  // you may change the query during implementation
  var hour = req.params.hour;
  console.log("hour" + hour);
  if (hour != 'undefined') query = query + where + hour + groupBy;
  else query = query + groupBy;
  console.log(query);
  oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            console.error(err); return;
        }
        

  connection.execute(query,{},
      { outFormat: oracledb.OBJECT // Return the result as Object
        },
      function(err, result)
      {
        if(err) { console.error(err); return; }
        else{
          console.log(result.rows);
          res.json(result.rows);

        }
        
      });


  /*connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });*/
  });


  
});

// ----Your implemention of route handler for "Insert a new record" should go here-----


module.exports = router;