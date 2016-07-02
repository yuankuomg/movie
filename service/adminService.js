"use strict";

exports.index = (req, res, next) => {
    if (req.session.adminlogin) {
        res.render("admin/admin.html", { user: req.session.adminlogin });
    } else {
        res.redirect(302, "/adminlogin.html");
    }
}

exports.admin = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield adminModule.getAll(conn);
        res.render("admin/adminuser.html", { admins: rows });
    }).catch((err) => {
        next(err);
    });
}

exports.user = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield adminModule.getAllUser(conn);
        res.render("admin/user.html", { users: rows });
    }).catch((err) => {
        next(err);
    });
}

exports.movie = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield adminModule.getAllMovie(conn);
        res.render("admin/movie.html", { movies: rows });
    }).catch((err) => {
        next(err);
    });
}

exports.news = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield adminModule.getAllNews(conn);
        res.render("admin/news.html", { news: rows });
    }).catch((err) => {
        next(err);
    });
}

exports.comment = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield adminModule.getAllComment(conn);
        res.render("admin/comment.html", { comments: rows });
    }).catch((err) => {
        next(err);
    });
}

exports.article = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield adminModule.getAllArticle(conn);
        res.render("admin/article.html", { articles: rows });
    }).catch((err) => {
        next(err);
    });
}

exports.addadminpage = (req, res, next) => {
    if (req.body.id != -1) {
        co(function* () {
            let conn = yield util.getConn();
            let rows = yield adminModule.getAdminById(conn, req.body.id);
            res.render("admin/addadmin.html", { admin: rows[0] });
        });
    } else {
        res.render("admin/addadmin.html", { admin: false });
    }
}

exports.addadmin = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.id) {
            yield adminModule.updateAdmin(conn, req);
        } else {
            yield adminModule.addAdmin(conn, req);
        }
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addadmin_err).end();
        }
        next(err);
    });
}

exports.deladmin = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        yield adminModule.delSelectedAdmin(conn, req.body.id);
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.deladmin_err).end();
        }
        next(err);
    });
}

exports.delselectedadmin = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.ids) {
            yield adminModule.delSelectedAdmin(conn, req.body.ids);
            res.json(message.success).end();
        } else {
            res.json(message.needadmin_err).end();
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.deladmin_err).end();
        }
        next(err);
    });
}

exports.adduserpage = (req, res, next) => {
    co(function* () {
        if (req.body.username != -1) {
            let conn = yield util.getConn();
            let rows = yield userModule.getUserByUsername(conn, req.body.username);
            res.render("admin/adduser.html", { user: rows[0] });
        } else {
            res.render("admin/adduser.html", { user: false });
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addgoodstype_err).end();
        }
        next(err);
    });
}

exports.adduser = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (parseInt(req.body.isadd)) {
            let rows = yield userModule.getUserByUsername(conn, req.body.username);
            if (rows.length > 0) {
                res.json(message.userexist_err).end();
                return;
            } else {
                let params = [
                    req.body.username,
                    req.body.password,
                    req.body.sex,
                    req.body.birthdate || null,
                    req.body.sign
                ]
                conn = yield util.getConn();
                yield userModule.addUser(conn, params);
            }
        } else {
            let params = [
                req.body.password,
                req.body.sex,
                req.body.birthdate || null,
                req.body.sign,
                req.body.username
            ]
            yield userModule.updateUser(conn, params);
        }
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addgoodstype_err).end();
        }
        next(err);
    });
}

exports.deluser = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        yield userModule.delSelectedUser(conn, req.body.username);
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delgoodstype_err).end();
        }
        next(err);
    });
}

exports.delselecteduser = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.usernames) {
            yield userModule.delSelectedUser(conn, req.body.usernames);
            res.json(message.success).end();
        } else {
            res.json(message.needgoodstype_err).end();
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delgoodstype_err).end();
        }
        next(err);
    });
}

exports.addmoviepage = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.id != -1) {
            let movie = yield movieModule.getMovieById(conn, req.body.id);
            res.render("admin/addmovie.html", { movie: movie[0]});
        } else {
            res.render("admin/addmovie.html", { movie: false});
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addgoods_err).end();
        }
        next(err);
    });
}

exports.addmovie = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.id) {
            yield movieModule.updateMovie(conn, req);
        } else {
            yield movieModule.addMovie(conn, req);
        }
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addgoods_err).end();
        }
        next(err);
    });
}

exports.delmovie = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        yield movieModule.delSelectedMovie(conn, req.body.id);
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delgoods_err).end();
        }
        next(err);
    });
}

exports.delselectedmovie = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.ids) {
            yield movieModule.delSelectedMovie(conn, req.body.ids);
            res.json(message.success).end();
        } else {
            res.json(message.needgoods_err).end();
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delgoods_err).end();
        }
        next(err);
    });
}

exports.news = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield newsModule.getAllNews(conn);
        res.render("admin/news.html", { news: rows });
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delnews_err).end();
        }
        next(err);
    });
}

exports.addnewspage = (req, res, next) => {
    co(function* () {
        if (req.body.id != -1) {
            let conn = yield util.getConn();
            let news = yield newsModule.getNewsById(conn, req.body.id);
            res.render("admin/addnews.html", { news: news[0] });
        } else {
            res.render("admin/addnews.html", { news: false });
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addnews_err).end();
        }
        next(err);
    });
}


exports.addnews = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.id) {
            yield newsModule.updateNews(conn, req);
        } else {
            yield newsModule.addNews(conn, req);
        }
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addnews_err).end();
        }
        next(err);
    });
}

exports.delnews = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        yield newsModule.delSelectedNews(conn, req.body.id);
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delnews_err).end();
        }
        next(err);
    });
}

exports.delselectednews = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.ids) {
            yield newsModule.delSelectedNews(conn, req.body.ids);
            res.json(message.success).end();
        } else {
            res.json(message.neednews_err).end();
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delnews_err).end();
        }
        next(err);
    });
}

exports.newspreview = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield newsModule.getNewsById(conn, req.params.id);
        res.send(parser.parse(rows[0].main)).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.preview_err).end();
        }
        next(err);
    });
}

exports.articlepreview = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let rows = yield newsModule.getArticleById(conn, req.params.id);
        res.send(parser.parse(rows[0].main)).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.preview_err).end();
        }
        next(err);
    });
}

exports.uploadimg = (req, res, next) => {
    co(function* () {
        let filename = yield util.uploadFile(req.file);
        res.json({ "success": true, url: filename }).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addimg_err).end();
        }
        next(err);
    });
}

exports.addarticlepage = (req, res, next) => {
    co(function* () {
        if (req.body.id != -1) {
            let conn = yield util.getConn();
            let article = yield newsModule.getArticleById(conn, req.body.id);
            res.render("admin/addarticle.html", { article: article[0] });
        } else {
            res.render("admin/addarticle.html", { article: false});
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addnews_err).end();
        }
        next(err);
    });
}

exports.addcommentpage = (req, res, next) => {
    co(function* () {
        if (req.body.id != -1) {
            let conn = yield util.getConn();
            let comment = yield newsModule.getCommentById(conn, req.body.id);
            res.render("admin/addcomment.html", { comment: comment[0] });
        } else {
            res.render("admin/addcomment.html", { comment: false});
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addnews_err).end();
        }
        next(err);
    });
}

exports.addarticle = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        yield newsModule.updateArticle(conn, req);
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addnews_err).end();
        }
        next(err);
    });
}

exports.addcomment = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        yield newsModule.updateComment(conn, req);
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.addnews_err).end();
        }
        next(err);
    });
}

exports.delarticle = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        yield newsModule.delSelecteArticle(conn, req.body.id);
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delnews_err).end();
        }
        next(err);
    });
}

exports.delcomment = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        yield newsModule.delSelecteComment(conn, req.body.id);
        res.json(message.success).end();
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delnews_err).end();
        }
        next(err);
    });
}

exports.delselectedarticle = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.ids) {
            yield newsModule.delSelecteArticle(conn, req.body.ids);
            res.json(message.success).end();
        } else {
            res.json(message.neednews_err).end();
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delnews_err).end();
        }
        next(err);
    });
}

exports.delselectedcomment = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        if (req.body.ids) {
            yield newsModule.delSelecteComment(conn, req.body.ids);
            res.json(message.success).end();
        } else {
            res.json(message.neednews_err).end();
        }
    }).catch((err) => {
        if (err.name == "dbException") {
            res.json(message.delnews_err).end();
        }
        next(err);
    });
}