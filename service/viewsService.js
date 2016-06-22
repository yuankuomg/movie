"use strict";

exports.index = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let slideMovies = yield viewsModule.getMovieToSlide(conn);
        res.render("index.html", { slideMovies: slideMovies });
    }).catch((err) => {
        next(err);
    });
}

exports.trailer = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let trailerMovies = yield viewsModule.getMovieToTrailer(conn);
        res.render("trailer.html", { trailerMovies: trailerMovies });
    }).catch((err) => {
        next(err);
    });
}

exports.list = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let listMovies = yield viewsModule.getMovieToList(conn);
        res.render("list.html", { listMovies: listMovies });
    }).catch((err) => {
        next(err);
    });
}

exports.news = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let news = yield viewsModule.getNews(conn);
        res.render("news.html", { news: news });
    }).catch((err) => {
        next(err);
    });
}

exports.detail_new = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        // let param = qs.parse(url.parse(req.url).query);
        let detail_new = yield viewsModule.getDatailNews(conn, req.params.id);
        res.render("detail-new.html", { detail_new: detail_new[0] });
    }).catch((err) => {
        next(err);
    });
}

exports.info = (req, res, next) => {
    if (!req.session.login) {
        res.redirect(302, "/login.html");
    } else {
        co(function* () {
            let conn = yield util.getConn();
            let user = yield userModule.getUserById(conn, req.session.login.id);
            res.render("info.html", { user: user[0] });
        }).catch((err) => {
            next(err);
        });
    }
}