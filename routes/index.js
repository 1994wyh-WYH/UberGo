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

router.get('/data/:year/:month/:day/:hour/:weekday', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = 'select * ' +
   'from (select t.pickup_longitude, t.pickup_latitude, count (*) as num from trip t ';
  var yearquery = 'EXTRACT(year from t.pickup_datetime) = ';
  var monthquery = 'EXTRACT(month from t.pickup_datetime) = ';
  var dayquery = 'EXTRACT(day from t.pickup_datetime) = ';
  var hourquery = 'EXTRACT(hour from t.pickup_datetime) = ';
  var weekdayquery = 'TO_CHAR(t.pickup_datetime, \'D\') = ';
   
  var groupBy = ' group by t.pickup_longitude, t.pickup_latitude order by num desc) where rownum<=10';
  // you may change the query during implementation
  var year = req.params.year;
  var month = req.params.month;
  var day = req.params.day;
  var hour = req.params.hour;
  var weekday = req.params.weekday;
  console.log("year " + year + "month " + month+"day " + day +"hour " + hour+ "weekday " + weekday);
  var where = '';
  if (year != 'undefined'){
     where = addWhere(where, yearquery, year); 
  }
  if (month != 'undefined'){
    where = addWhere(where, monthquery, month); 
  }
  if (day != 'undefined'){
    where = addWhere(where, dayquery, day); 
  }
  if (hour != 'undefined'){
    where = addWhere(where, hourquery, hour); 
  }
  if (weekday != 'undefined'){
    where = addWhere(where, weekdayquery, weekday); 
  }

  function addWhere(where, query, number){
    if(where == ''){
      where += 'where ' + query + number;
    }else{
      where = where +' and ' + query + number;
    }
    console.log("where " + where);
    return where;
  }
  query = query + where + groupBy;
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