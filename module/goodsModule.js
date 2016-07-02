"use strict";

exports.getAllGoodsType = (conn) => {
    // let sql = `select * from goodstype`;
    let sql = `SELECT g1.*,g2.typename as ptypename from goodstype g1 LEFT JOIN goodstype g2 on g1.pid = g2.id`;
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

exports.getGoodstypeById = (conn, id) => {
    let sql = `select * from goodstype where id = ${id}`;
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

exports.addGoodstype = (conn, req) => {
    let sql = `insert into goodstype values(default,'${req.body.typename}',${req.body.pid})`;
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

exports.delGoodstype = (conn, id) => {
    let sql = `delete from goodstype where id=${id}`;
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

exports.delSelectedGoodstype = (conn, ids) => {
    let sql = `delete from goodstype where id in (${ids})`;
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

exports.updateGoodstype = (conn, req) => {
    let sql = `update goodstype set typename='${req.body.typename}',pid='${req.body.pid}' where id=${req.body.id}`;
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

exports.getAllRootType = (conn) => {
    let sql = `select * from goodstype where pid=0`;
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

exports.getAllType = (conn) => {
    let sql = `select * from goodstype`;
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

exports.getAllGoods = (conn) => {
    // let sql = `select * from goodstype`;
    let sql = `SELECT g1.*,g2.typename from goods g1 LEFT JOIN goodstype g2 on g1.type = g2.id`;
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

exports.getGoodsById = (conn, id) => {
    let sql = `select * from goods where id = ${id}`;
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

exports.getGoodsImgById = (conn, ids) => {
    let sql = `select img from goods where id in (${ids})`;
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

exports.addGoods = (conn, params) => {
    let sql = `insert into goods values(default,?,?,?,?,?,?,?)`;
    return new promise((resolve, reject) => {
        conn.query(sql,params, (err, result) => {
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

exports.updateGoods = (conn, req, filename) => {
    let sql = `update goods set gname='${req.body.gname}',price=${req.body.price},type=${req.body.type},strock=${req.body.strock},info='${req.body.info}'`;
    if(filename){
        sql += `,img='${filename}'`
    }
    sql += ` where id=${req.body.id}`;
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

exports.delGoods = (conn, id) => {
    let sql = `delete from goods where id=${id}`;
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

exports.delSelectedGoods = (conn, ids) => {
    let sql = `delete from goods where id in (${ids})`;
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