"use strict";

exports.getMovieById = (conn, id) => {
    let sql = `select * from movie where id = ${id}`;
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

exports.addMovie = (conn, req) => {
    let params = [
        req.body.name,
        req.body.rate || null,
        req.body.actor,
        req.body.director,
        req.body.type,
        req.body.time || null,
        req.body.long,
        req.body.describe,
        req.body.slideimg1,
        req.body.slideimg2,
        req.body.listimg1,
        req.body.listimg2,
        req.body.trailerimg,
        req.body.bilisource
    ];
    let sql = `insert into movie values(default,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return new promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
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

exports.updateMovie = (conn, req) => {
    let params = [
        req.body.name,
        req.body.rate || null,
        req.body.actor,
        req.body.director,
        req.body.type,
        req.body.time || null,
        req.body.long,
        req.body.describe,
        req.body.slideimg1,
        req.body.slideimg2,
        req.body.listimg1,
        req.body.listimg2,
        req.body.trailerimg,
        req.body.bilisource,
        req.body.id
    ]
    let sql = `update movie set 
    name=?,
    rate=?,
    actor=?,
    director=?,
    type=?,
    time=?,
    \`long\`=?,
    \`describe\`=?,
    slideimg1=?,
    slideimg2=?,
    listimg1=?,
    listimg2=?,
    trailerimg=?,
    bilisource=?
    where id=?`;
    return new promise((resolve, reject) => {
        conn.query(sql,params, (err, result) => {
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

exports.delSelectedMovie = (conn, ids) => {
    let sql = `delete from movie where id in (${ids})`;
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