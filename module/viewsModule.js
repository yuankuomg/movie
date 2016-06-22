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