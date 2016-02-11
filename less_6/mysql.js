'use strict';

const mysql = require('mysql');


class Mysql {

    constructor(config) {
        this.pool = mysql.createPool({
            connectionLimit: config.connectionLimit,
            host: config.host,
            database: config.database,
            user: config.user,
            password: config.password,
        });
    }

    query(query, vars, callback) {
        if(!vars)
            vars = [];
                this.pool.getConnection((err, connection) => {
                    if(err) console.error(err);

                    console.log('QUERY  ' + query);

                    connection.query(query, vars, (err, rows) => {



                    if(err) console.error(err);
                    connection.release();
                    callback(rows);
                });
            });
    }

}


module.exports = (config) => {
    return new Mysql(config);
}