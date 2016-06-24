"use strict";

let viewsRouter = express.Router();
viewsRouter.get("/", viewsService.index);
viewsRouter.get("/index.html", viewsService.index);
viewsRouter.get("/trailer.html", viewsService.trailer);
viewsRouter.get("/list.html", viewsService.list);
viewsRouter.get("/news.html", viewsService.news);
viewsRouter.get("/detail-new/:id", viewsService.detail_new);
viewsRouter.get("/info.html", viewsService.info);

viewsRouter.get("/randmovie", viewsService.randmovie);
viewsRouter.get("/latestnews", viewsService.latestnews);


module.exports = viewsRouter;