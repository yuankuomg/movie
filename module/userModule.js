"use strict";

exports.login = (conn, req) => {
    let sql = `select * from user where username='${req.body.username}' and password='${req.body.password}'`;
    return new promise((resolve, reject) => {
        conn.query(sql, (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getUserById = (conn, id) => {
    let sql = `select * from user where id=${id}`;
    return new promise((resolve, reject) => {
        conn.query(sql, (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}