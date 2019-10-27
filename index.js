const http = require('http');
const port = process.env.PORT || 3000;

var express = require('express');
var server = express();

//const server = http.createServer((req, res) => {
//  res.statusCode = 200;
//  res.end('Hello Node 2!\n');
//});

server.get('/worker', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'mssqlerp',
        password: 'novasenha@123',
        server: 'den1.mssql8.gear.host', 
        database: 'mssqlerp' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT table_catalog [database], table_schema [schema], table_name [name], table_type [type] FROM INFORMATION_SCHEMA.TABLES', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

server.listen(port, () => {
  console.log(`Server running on https://meunodejs.herokuapp.com:${port}/`);
});
