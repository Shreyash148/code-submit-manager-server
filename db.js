const mysql = require('mysql2');

function createConnection() {
    const connection = mysql.createConnection({
        host: "b7nanqwezlf4wjihv00j-mysql.services.clever-cloud.com",
        user: "u76lu0ymluicjl1x",
        password: "E9jYq1BHAAw262eSyzJr",
        database: "b7nanqwezlf4wjihv00j",
        connectTimeout: 60000 
    });

    function handleDisconnect() {
        connection.connect(function (err) {
            if (err) {
                console.error('Error connecting to MySQL server: ' + err);
                setTimeout(handleDisconnect, 2000); 
            } else {
                console.log('Connected to MySQL server');
            }
        });

        connection.on('error', function (err) {
            console.error('MySQL error: ' + err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();
            } else {
                throw err;
            }
        });
    }

    handleDisconnect();

    return connection;
}

module.exports = createConnection();
