"use strict";

exports.login = (req, res, next) => {
    co(function* () {
        var conn = yield util.getConn();
        var rows = yield loginModule.login(conn, req);
        if (rows.length) {
            req.session.login = rows[0];
            res.json(message.success).end();
        } else {
            res.json(message.login_err).end();
        }
    }).catch((err) => {
        next(err);
    });
}