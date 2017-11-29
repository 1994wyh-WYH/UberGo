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

router.get('/data/:year/:month/:day/:hour/:weekday/:fog/:rain/:snow', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = 'select * ' +
   'from (select t.pickup_longitude, t.pickup_latitude, count (*) as num from trip t ';
  var join = ' inner join weather w on to_char(w.time_stamp, \'MM/DD/YYYY\') = '+
  'to_char(t.pickup_datetime, \'MM/DD/YYYY\') AND EXTRACT(hour from w.time_stamp) = EXTRACT(hour from t.pickup_datetime) ';
  var yearquery = 'EXTRACT(year from t.pickup_datetime) = ';
  var monthquery = 'EXTRACT(month from t.pickup_datetime) = ';
  var dayquery = 'EXTRACT(day from t.pickup_datetime) = ';
  var hourquery = 'EXTRACT(hour from t.pickup_datetime) = ';
  var weekdayquery = 'TO_CHAR(t.pickup_datetime, \'D\') = ';
  var fogquery = ' w.fog = ';
  var rainquery = ' w.rain = ';
  var snowquery = ' w.snow = ';


  var groupBy = ' group by t.pickup_longitude, t.pickup_latitude order by num desc) where rownum<=10';
  // you may change the query during implementation
  var year = req.params.year;
  var month = req.params.month;
  var day = req.params.day;
  var hour = req.params.hour;
  var weekday = req.params.weekday;
  var fog = req.params.fog;
  var rain = req.params.rain;
  var snow = req.params.snow;
  console.log(fog+rain+snow);
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

  if (fog != 'undefined'){
    where = addWhere(where, fogquery, '1'); 
  }
  if (rain != 'undefined'){
    where = addWhere(where, rainquery, '1'); 
  }
  if (snow != 'undefined'){
    where = addWhere(where, snowquery, '1'); 
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
  if(fog == 'undefined' && rain == 'undefined' && snow == 'undefined'){
    query = query + where + groupBy;
  }else{
    query = query +join + where + groupBy;
  }
  
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