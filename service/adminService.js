"use strict";

exports.index = (req, res, next) => {
    if (req.session.login) {
        res.render("admin/admin.html", {user: req.session.login});
    } else {
        res.redirect(302, "/login.html");
    }
}

exports.admin = (req, res, next) => {
    co(function *() {
        let conn = yield util.getConn();
        let rows = yield adminModule.getAll(conn);
        res.render("admin/adminuser.html", {admins: rows});
    }).catch((err) => {
        next(err);
    });
}

exports.addadminpage = (req, res, next) => {
    res.render("admin/addadmin.html");
}

exports.addadmin = (req, res, next) => {
    co(function *() {
        let conn = yield util.getConn();
        let result = yield adminModule.addAdmin(conn, req);
        if(result){
            res.send(message.success).end();
        }else{
            res.send(message.login_err).end();
        }
    }).catch((err) => {
        next(err);
    });
}