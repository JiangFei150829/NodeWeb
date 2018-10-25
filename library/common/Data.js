var mysql = require('mysql');
const Data = function() {}
Data.prototype.getJsonTest = function() {
    var json = {
        "sites": [
            { "url": "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg" },
            { "url": "http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg" },
            { "url": "http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg" },
            { "url": "http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg" },
            { "url": "http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg" },
            { "url": "http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg" },
            { "url": "http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg" },
            { "url": "http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg" },
            { "url": "http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg" }
        ]
    };
    this.connectionMysql();
    return json;
}
Data.prototype.connectionMysql = function() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'jiangfei150829',
        database: 'ccsystem'
    });
    connection.connect();

    var sql = 'SELECT * FROM devices';
    //查
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });
}
module.exports = Data;