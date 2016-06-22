"use strict";

exports.login = (req, res, next) => {
    co(function*(){
        var conn = yield util.getConn();
        var rows = yield userModule.login(conn, req);
        if(rows.length){
            req.session.login = rows[0];
            res.send(message.success).end();
        }else{
            res.send(message.login_err).end();
        }
    }).catch((err) => {
        next(err);
    });
}
exports.logout = (req, res, next) => {
    delete req.session.login;
    res.send(message.success).end();
}

