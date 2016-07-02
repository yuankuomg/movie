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


exports.getUserByUsername = (conn, username) => {
    let sql = `select * from user where username='${username}'`;
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

exports.addUser = (conn, params) => {
    let sql = `insert into user values(?,?,?,?,?)`;
    return new promise((resolve, reject) => {
        conn.query(sql, params, (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.reg = (conn, parmas) => {
    let sql = `insert into user values(?,?,?,?,?)`;
    return new promise((resolve, reject) => {
        conn.query(sql, parmas, (err, result) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}

exports.addComment = (conn, params) => {
    let sql = `insert into comment values(default,?,?,now(),?)`;
    return new promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}

exports.addArticle = (conn, params) => {
    let sql = `insert into article values(default,?,now(),?,?,?)`;
    return new promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}

exports.updateUser = (conn, params) => {
    let sql = `update user set password=?,sex=?,birthdate=?,sign=? where username=?`;
    return new promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}

exports.delSelectedUser = (conn, usernames) => {
    let sql = `delete from user where username in ('${usernames}')`;
    return new promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            conn.release();
            if (err) {
                err.name = "dbException";
                reject(err);
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}