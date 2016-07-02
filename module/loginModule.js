"use strict";

exports.login = (conn, req) => {
    let sql = `select * from admin where username='${req.body.username}' and password='${req.body.password}'`;
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