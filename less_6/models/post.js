'use strict';


class Post {

    constructor(dbc) {
        this.db = dbc;
        this.table = 'posts';
    }

    list(callback) {
        this.db.query('SELECT * FROM ' + this.table, null, (data) => {
            callback(data);
    });
    }

    get(id, callback) {
        this.db.query('SELECT * FROM ' + this.table + ' WHERE id=?', [id], (data) => {
            callback(data);
    });
    }

    add(data, callback) {
        this.db.query('INSERT INTO ' + this.table + ' SET ?', [data], (result) => {
            callback(result.insertId);
    });
    }

    edit(id, data, callback) {
        this.db.query('UPDATE ' + this.table + ' SET ? WHERE id=?', [data, id], (result) => {
            callback();
    });
    }

    delete(id, callback) {
        this.db.query('DELETE FROM ' + this.table + ' WHERE id=?', [id], (result) => {
            callback();
    });
    }

    // gets fields in table
    fields(callback) {
        this.db.query('SHOW fields FROM ' + this.table, null, (result) => {
            callback(result.map((value) => {
                return value.Field;
    }));
    });
    }

}


module.exports = (pool) => {
    return new Post(pool);
};