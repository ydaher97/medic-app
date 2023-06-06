const mysql = require('mysql2');

const config = require('../config/config.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    port: config.port
})



pool.getConnection((err) => {  
    if(err){
    console.log(err)
    }else{
        console.log("mysql connected")
    }
}); 

/*const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    port: config.port
});

db.connect((err) => {  
    if(err){
    console.log(err)
    }else{
        console.log("mysql connected")
    }
});*/


module.exports = pool.promise();