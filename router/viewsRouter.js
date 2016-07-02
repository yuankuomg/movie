"use strict";

let viewsRouter = express.Router();
viewsRouter.get("/", viewsService.index);
viewsRouter.get("/index.html", viewsService.index);
viewsRouter.get("/trailer.html", viewsService.trailer);
viewsRouter.get("/list.html", viewsService.list);
viewsRouter.get("/news.html", viewsService.news);
viewsRouter.get("/detail-new/:id", viewsService.detail_new);
viewsRouter.get("/detail-article/:id", viewsService.detail_article);
viewsRouter.get("/detail-movie/:id", viewsService.detail_movie);
viewsRouter.get("/searchresult.html", viewsService.searchresult);
viewsRouter.get("/info.html", viewsService.info);

viewsRouter.get("/randmovie", viewsService.randmovie);
viewsRouter.get("/latestnews", viewsService.latestnews);
viewsRouter.get("/latestnewslist", viewsService.latestnewslist);
viewsRouter.get("/maylike", viewsService.maylike);
viewsRouter.get("/comment/:mid", viewsService.comment);
viewsRouter.get("/article/:mid", viewsService.article);
viewsRouter.get("/movielist", viewsService.movielist);
viewsRouter.get("/youratricle/:username", viewsService.youratricle);





module.exports = viewsRouter;