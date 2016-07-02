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
        conn = yield util.getConn();
        let articles = yield viewsModule.getArticle(conn);
        res.render("news.html", { news: news,articles: articles});
    }).catch((err) => {
        next(err);
    });
}

exports.detail_new = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let detail_new = yield viewsModule.getDatailNews(conn, req.params.id);
         detail_new[0].main = parser.parse(detail_new[0].main);
        res.render("detail-new.html", { detail_new: detail_new[0] });
    }).catch((err) => {
        next(err);
    });
}

exports.detail_article = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let detail_article = yield viewsModule.getDatailArticle(conn, req.params.id);
         detail_article[0].main = parser.parse(detail_article[0].main);
        res.render("detail-article.html", { detail_article: detail_article[0] });
    }).catch((err) => {
        next(err);
    });
}

exports.detail_movie = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let detail_movie = yield viewsModule.getDatailMovie(conn, req.params.id);
        res.render("detail-movie.html", { detail_movie: detail_movie[0] });
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
            let user = yield userModule.getUserByUsername(conn, req.session.login.username);
            res.render("info.html", { user: user[0] });
        }).catch((err) => {
            next(err);
        });
    }
}

exports.randmovie = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let randMovies = yield viewsModule.getRandMovie(conn);
        let html = yield util.processRandMovie(randMovies);
        res.send(html).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

exports.latestnews = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let latestNews = yield viewsModule.getlatestNews(conn);
        let html = yield util.processLatestNews(latestNews);
        res.send(html).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

exports.latestnewslist = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let latestNewsList = yield viewsModule.getlatestNewsList(conn);
        let html = yield util.processLatestNewsList(latestNewsList);
        res.send(html).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

exports.maylike = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let maylike = yield viewsModule.getMaylike(conn);
        let html = yield util.processMaylike(maylike);
        res.send(html).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

exports.comment = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let comment = yield viewsModule.getCommentByMid(conn, req.params.mid);
        let html = yield util.processComment(comment);
        conn = yield util.getConn();
        let count = yield viewsModule.getCount(conn, 'comment', req.params.mid);
        res.send({html:html, count:count[0]["count(*)"]}).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

exports.article = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let article = yield viewsModule.getArticleByMid(conn, req.params.mid);
        let html = yield util.processArticle(article);
        conn = yield util.getConn();
        let count = yield viewsModule.getCount(conn, 'article', req.params.mid);
        res.send({html:html, count:count[0]["count(*)"]}).end();
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

exports.movielist = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let movieList = yield viewsModule.getMovieList(conn);
        let html = yield util.processMovieList(movieList);
        res.send(html).end();
    }).catch((err) => {
        next(err);
    });
}

exports.youratricle = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let yourAtricle = yield viewsModule.getYouratricle(conn, req.params.username);
        let html = yield util.processYourAtricle(yourAtricle);
        res.send(html).end();
    }).catch((err) => {
        next(err);
    });
}

exports.searchresult = (req, res, next) => {
    co(function* () {
        let conn = yield util.getConn();
        let movieResult = yield viewsModule.getMovieSearchResult(conn, req.query.keyword);
        // let movieHtml = yield util.processSearchResult(movieResult, "movie");
        conn = yield util.getConn();
        let newsResult = yield viewsModule.getNewsSearchResult(conn, req.query.keyword);
        // let newsHtml = yield util.processSearchResult(newsResult, "news");
        conn = yield util.getConn();
        let articleResult = yield viewsModule.getArticleSearchResult(conn, req.query.keyword);
        // let articleHtml = yield util.processSearchResult(articleResult, "article");
        res.render("searchresult.html",{movies:movieResult, news:newsResult, articles:articleResult});
    }).catch((err) => {
        next(err);
    });
}