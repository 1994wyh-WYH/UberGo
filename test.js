var oracledb  = require('oracledb');

var connAttrs = {
  user     : "admin",
  password : '550UberGo',
  connectString: "//cis550.cxzyd6qo9cfb.us-east-1.rds.amazonaws.com:1521/orcl"
};
var query = 'SELECT* FROM HOLIDAY';
oracledb.getConnection(connAttrs, function (err, connection){
    if (err) { console.error(err); return; }
    connection.execute(
      query,
      function(err, result)
      {
        if (err) { console.error(err); return; }
        console.log(result.rows);
      });
  });



        
   
       
