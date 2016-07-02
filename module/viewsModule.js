"use strict";
exports.getMovieToSlide = (conn) => {
    let sql = `SELECT * from movie ORDER BY time DESC LIMIT 0,6`;
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
exports.getMovieToTrailer = (conn) => {
    let sql = `SELECT * from movie ORDER BY time DESC`;
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
exports.getMovieToList = (conn) => {
    let sql = `SELECT * from movie ORDER BY time DESC`;
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
exports.getNews = (conn) => {
    let sql = `SELECT id,title,date from news ORDER BY date DESC`;
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
exports.getArticle = (conn) => {
    let sql = `SELECT a.id,title,a.date,u.username,m.name FROM article a LEFT JOIN user u ON a.username = u.username LEFT JOIN movie m ON a.mid = m.id`;
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
exports.getDatailArticle = (conn, id) => {
    let sql = `SELECT a.id,title,a.date,a.main,u.username,m.name FROM article a LEFT JOIN user u ON a.username = u.username LEFT JOIN movie m ON a.mid = m.id where a.id=?`;
    return new promise((resolve, reject) => {
        conn.query(sql, [id], (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
exports.getDatailNews = (conn, id) => {
    let sql = `SELECT * from news where id=?`;
    return new promise((resolve, reject) => {
        conn.query(sql, [id], (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
exports.getDatailMovie = (conn, id) => {
    let sql = `SELECT * from movie where id=?`;
    return new promise((resolve, reject) => {
        conn.query(sql, [id], (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
exports.getRandMovie = (conn) => {
    let sql = `SELECT id,name,rate,time,slideimg1,slideimg2,bilisource from movie order by rand() limit 2`;
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
exports.getlatestNews = (conn) => {
    let sql = `SELECT id,title,date,quotation from news order by date desc limit 2`;
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
exports.getlatestNewsList = (conn) => {
    let sql = `SELECT id,title from news order by date desc limit 5`;
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
exports.getMaylike = (conn) => {
    let sql = `SELECT id,name,time,listimg1 from movie order by rate desc limit 6`;
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
exports.getCommentByMid = (conn, mid) => {
    let sql = `SELECT * FROM comment where mid=?`;
    return new promise((resolve, reject) => {
        conn.query(sql,[mid], (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getArticleByMid = (conn, mid) => {
    let sql = `SELECT id,title,date,username FROM article where mid=?`;
    return new promise((resolve, reject) => {
        conn.query(sql,[mid], (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getCount = (conn, table, mid) => {
    let sql = `SELECT count(*) from ${table} where mid=?`
    return new promise((resolve, reject) => {
        conn.query(sql, [mid], (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getMovieList = (conn) => {
    let sql = `SELECT id,name from movie order by time desc`
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

exports.getYouratricle = (conn, username) => {
    let sql = `SELECT a.id,a.title,a.date,m.name FROM article a LEFT JOIN movie m ON a.mid = m.id where username=?`
    return new promise((resolve, reject) => {
        conn.query(sql,[username], (err, rows) => {
            conn.release();
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getMovieSearchResult = (conn, keyword) => {
    let sql = `SELECT * FROM movie WHERE name like('%${keyword}%') or actor LIKE('%${keyword}%') or director LIKE('%${keyword}%') or type LIKE('%${keyword}%') or time LIKE('%${keyword}%')  or time LIKE('%${keyword}%') or 'describe' like ('%${keyword}%')`;
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

exports.getNewsSearchResult = (conn, keyword) => {
    let sql = `SELECT * FROM news WHERE title like('%${keyword}%') or date LIKE('%${keyword}%') `;
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

exports.getArticleSearchResult = (conn, keyword) => {
    let sql = `SELECT a.id,a.title,a.date,a.username,m.name FROM article a LEFT JOIN movie m ON a.mid = m.id WHERE title like('%${keyword}%') or date LIKE('%${keyword}%') `;
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