"use strict";

exports.getAllNews = (conn) => {
    // let sql = `select * from goodstype`;
    let sql = `SELECT id,title,date from news`;
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

exports.getNewsById = (conn, id) => {
    let sql = `select * from news where id = ${id}`;
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

exports.getArticleById = (conn, id) => {
    let sql = `select article.*,movie.name from article LEFT JOIN movie on article.mid = movie.id where article.id = ${id}`;
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

exports.getCommentById = (conn, id) => {
    let sql = `select comment.*,movie.name from comment LEFT JOIN movie on comment.mid = movie.id where comment.id = ${id}`;
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

exports.addNews = (conn, req) => {
    let sql = `insert into news values(default,'${req.body.title}',now(),'${req.body.main}','${req.body.quotation}')`;
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

exports.updateNews = (conn, req) => {
    let sql = `update news set title='${req.body.title}',date=now(),main='${req.body.main}',quotation='${req.body.quotation}' where id=${req.body.id}`;
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

exports.updateArticle = (conn, req) => {
    let sql = `update article set title='${req.body.title}',main='${req.body.main}' where id=${req.body.id}`;
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

exports.updateComment = (conn, req) => {
    let sql = `update comment set main='${req.body.main}' where id=${req.body.id}`;
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

exports.delNews = (conn, id) => {
    let sql = `delete from news where id=${id}`;
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

exports.delArticle = (conn, id) => {
    let sql = `delete from article where id=${id}`;
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

exports.delSelectedNews = (conn, ids) => {
    let sql = `delete from news where id in (${ids})`;
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

exports.delSelecteArticle = (conn, ids) => {
    let sql = `delete from article where id in (${ids})`;
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

exports.delSelecteComment = (conn, ids) => {
    let sql = `delete from comment where id in (${ids})`;
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