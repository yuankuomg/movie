"use strict";

exports.login = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield userModule.login(conn, req);
        if (rows.length) {
            req.session.login = rows[0];
            // res.cookie("login", {"username": req.body.username, "password": req.body.password});
            res.send(message.success).end();
        } else {
            res.send(message.login_err).end();
        }
    }).catch((err) => {
        next(err);
    });
}

exports.reg = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let parmas = [
            req.body.username,
            req.body.password,
            req.body.sex || null,
            req.body.birthdate || null,
            req.body.sign || null
        ]
        let rows = yield userModule.getUserByUsername(conn, req.body.username);
        if (rows.length) {
            res.send(message.userexist_err).end();
        } else {
            conn = yield util.getConn();
            yield userModule.reg(conn, parmas);
            req.session.login = { username: req.body.username };
            res.send(message.success).end();
        }
    }).catch((err) => {
        next(err);
    });
}

exports.logout = (req, res, next) => {
    delete req.session.login;
    res.redirect(302, "/login.html");
}

exports.addcomment = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let params = [
            req.body.mid,
            req.body.username,
            req.body.main
        ];
        yield userModule.addComment(conn, params);
        res.send(message.success).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

exports.addarticle = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let params = [
            req.body.title,
            req.body.main,
            req.body.username,
            req.body.mid
        ];
        yield userModule.addArticle(conn, params);
        res.send(message.success).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

exports.updateuser = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let params = [
            req.body.password,
            req.body.sex,
            req.body.birthdate || null,
            req.body.sign,
            req.body.username
        ];
        yield userModule.updateUser(conn, params);
        res.send(message.success).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}
