const mysql=require('mysql2');

const db=mysql.createConnection({
    host:"b7nanqwezlf4wjihv00j-mysql.services.clever-cloud.com",
    user:"u76lu0ymluicjl1x",
    password:"E9jYq1BHAAw262eSyzJr",
    database:"b7nanqwezlf4wjihv00j"
});
module.exports = db;