var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

// Connect string to MySQL
var oracledb  = require('oracledb');

var connAttrs = {
  user     : "admin",
  password : '550UberGo',
  connectString: "//cis550.cxzyd6qo9cfb.us-east-1.rds.amazonaws.com:1521/orcl"
};

// Restaurant Schema
//const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rest');

mongoose.connection.on('connected', ()=>{
    console.log('MongoDB connected at port');
});


//MongoDB query
var schema = new mongoose.Schema({_id:'string', restaurant_name:'string', latitude:'string', longitude:'string', rating:'number'}, {collection:'rest'});
var Rest = mongoose.model('rest', schema, 'rest');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/reference', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

 

router.get('/report', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'report.html'));
});

router.get('/data/:queryNumber', function(req,res, next) {
  var  queryNumber = req.params.queryNumber;
  console.log("the query number is" + queryNumber);

  //res.sendFile(path.join(__dirname, '../', 'views', 'report.html'));
  //query1: top 10 places in geneeral
  //var query1 = "select * from (select t.pickup_longitude, t.pickup_latitude, count(*) as num from trip t group by t.pickup_longitude, t.pickup_latitude order by num desc) where rownum<=10";
  
  //query3: busy time in day
  var query3 = "select * from (select EXTRACT(hour from t.pickup_datetime) as time, count (*) as num0 from trip t group by EXTRACT(hour from t.pickup_datetime) order by num0 desc) where rownum=1";
  
  // query 4: busy weekday
  var query4 = "select * from (select TO_CHAR(t.pickup_datetime,'D') as week_day, count (TO_CHAR(t.pickup_datetime,'D')) as count from trip t group by TO_CHAR(t.pickup_datetime,'D') order by count desc) where rownum=1"; 
  
  // query 5: total difference between number of holiday pickups and non-holiday pickups?
  var query5 = "select (t1.n1)-(t2.n2) as totaldif from (select count(*) as n1 from holiday h inner join trip t on to_char(to_timestamp(h.HOLIDAY_DATE), 'MM/DD/YYYY') = to_char(t.pickup_datetime, 'MM/DD/YYYY')) t1, (select count(*) as n2 from holiday h right join trip t on to_char(to_timestamp(h.HOLIDAY_DATE), 'MM/DD/YYYY') = to_char(t.pickup_datetime, 'MM/DD/YYYY') where h.holiday_date is NULL) t2";
  // query6: Whether is it likely to be busy when it rains or snows?
  var query6 = "select ts.csnow, tr.crain from ( select count(*) as csnow from weather w inner join trip t on to_char(w.time_stamp, 'MM/DD/YYYY') = to_char(t.pickup_datetime, 'MM/DD/YYYY') AND EXTRACT(hour from w.time_stamp) = EXTRACT(hour from t.pickup_datetime) where w.snow=1 ) ts, ( select count(*) as crain from weather w inner join trip t on to_char(w.time_stamp, 'MM/DD/YYYY') = to_char(t.pickup_datetime, 'MM/DD/YYYY') AND EXTRACT(hour from w.time_stamp) = EXTRACT(hour from t.pickup_datetime) where w.rain=1 ) tr";
  
  //query7 : Which kind of weather will cause the most increase in passenger number?
  var query7 = "select tt.condition1, tt.countTotal, tt2.cday, tt.countTotal/tt2.cday as frequency from( select distinct w.condition as condition1, count(*) as countTotal from weather w inner join trip t on extract(day from w.time_stamp)=extract(day from t.pickup_datetime) and extract(hour from w.time_stamp)=extract(hour from t.pickup_datetime) group by w.condition ) tt inner join (select w.condition as condition2, count(w.condition) as cday from weather w group by w.condition) tt2 on tt.condition1=tt2.condition2 where rownum<=100 order by frequency desc";

  //query9: How does holiday affect pickups (what’s the average pickup difference between a holiday and a normal day)?
  var query9 = "select (t1.n1/t1.hday)-(t2.n2/t2.nonHday) as avgDifferencePerDay from (select count(distinct h.holiday_date) as hday, count(*) as n1 from holiday h inner join trip t on to_timestamp(h.HOLIDAY_DATE)=(t.pickup_datetime)) t1, (select count(distinct t.pickup_datetime) as nonHday, count(*) as n2 from holiday h right join trip t on to_timestamp(h.holiday_date)=(t.pickup_datetime) where h.holiday_date is NULL) t2";

  //query 10: What are the top 5 holidays on which people are most likely to travel by Uber?
  var query10 = "select * from (select h.Holiday_name, count(t.pickup_datetime) as num6 from holiday h inner join trip t on to_char(to_timestamp(h.HOLIDAY_DATE), 'MM/DD/YYYY') = to_char(t.pickup_datetime, 'MM/DD/YYYY') group by h.Holiday_name order by num6 desc) where rownum<=5";

  //query11: Given a specific weather, where is it most likely to be busy?
  //var query11 = "select * from ( select t.pickup_longitude, t.pickup_latitude, count(*) as num from weather w inner join trip t on extract(day from w.time_stamp)=extract(day from t.pickup_datetime) and extract(hour from w.time_stamp)=extract(hour from t.pickup_datetime) where w.condition='Clear' group by t.pickup_longitude, t.pickup_latitude order by num desc ) where rownum<=5";
  //query12: Pickups on each holiday
  var query12 = "select t1.holiday_name as holiday_name7, count (*) as num7 from (select * from holiday h inner join trip t on to_char(to_timestamp(h.HOLIDAY_DATE), 'MM/DD/YYYY') = to_char(t.pickup_datetime, 'MM/DD/YYYY')) t1 group by t1.holiday_name order by num7 desc"; 

  var queries = [query3, query4 ,query5, query6, query7, query9, query10, query12];
  //console.log(queries[queryNumber]);
  var query = queries[Number(queryNumber)];
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
  //res.sendFile(path.join(__dirname, '../', 'views', 'report.html'));
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
//MongoDB query
router.get('/dataM/:longitude/:latitude', function(req, res){
  var lonL = req.params.longitude-0.005;
  var lonH = req.params.longitude+0.005;
  var latL = req.params.latitude-0.005;
  var latH = req.params.latitude+0.005;

  var quer = Rest.find({$and:[{longitude:{$gte:lonH}},{longitude:{$lt:lonL}},{latitude:{$gte:latL}},{latitude:{$lt:latH}}]});//{$gte:req.params.longitude}});
  var c = quer.count();
  //console.log('long is %s', lonL);
  quer.exec(function(err,resta){
  if(err) return handleError(err);
  console.log('%s', resta);
  res.json('{'+resta+'}');
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


  var groupBy = ' group by t.pickup_longitude, t.pickup_latitude order by num desc) where rownum<=5';
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
