'use strict';


class Autorise {

    constructor(dbc) {
        this.db = dbc;
        this.table = 'users';
    }

    getin(mail, password, callback) {
        this.db.query('SELECT * FROM ' + this.table + " WHERE mail = '" + mail + "' AND password = '" + password + "'", null, (data) => {
            callback(data);
        });
    }

}


module.exports = (pool) => {
    return new Autorise(pool);
};