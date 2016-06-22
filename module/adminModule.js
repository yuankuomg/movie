"use strict";

exports.getAll = (conn) => {
    let sql = `select * from admin`;
    return new promise((resolve, reject) => {
        conn.query(sql, (err, rows) => {
            conn.release();
            if (err) {
                reject();
            } else {
                resolve(rows);
            }
        });
    });
}

exports.addAdmin = (conn, req) => {
    let sql = `insert into admin values(default,'${req.body.username}','${req.body.password}',1)`;
    return new promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            conn.release();
            if (err) {
                reject();
            } else {
                resolve(result.insertId);
            }
        });
    });
}