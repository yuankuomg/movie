"use strict";

exports.getAll = (conn) => {
    let sql = `select * from admin`;
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

exports.getAllUser = (conn) => {
    let sql = `select * from user`;
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

exports.getAllMovie = (conn) => {
    let sql = `select * from movie`;
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

exports.getAllNews = (conn) => {
    let sql = `select * from news`;
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

exports.getAllComment = (conn) => {
    let sql = `select comment.*,movie.name from comment LEFT JOIN movie on movie.id = comment.mid`;
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

exports.getAllArticle = (conn) => {
    let sql = `select article.id,article.title,article.date,article.username,movie.name from article LEFT JOIN movie on article.mid = movie.id`;
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

exports.getAdminById = (conn, id) => {
    let sql = `select * from admin where id = ${id}`;
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

exports.addAdmin = (conn, req) => {
    let sql = `insert into admin values(default,'${req.body.username}','${req.body.password}',0)`;
    return new promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            conn.release();
            if (err) {
                err.name = "dbException";
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });
    });
}

exports.delSelectedAdmin = (conn, ids) => {
    let sql = `delete from admin where id in (${ids})`;
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

exports.updateAdmin = (conn, req) => {
    let sql = `update admin set username='${req.body.username}',password='${req.body.password}' where id=${req.body.id}`;
    return new promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            conn.release();
            if (err) {
                err.name = "dbException";
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}