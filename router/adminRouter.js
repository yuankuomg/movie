"use strict";

let adminRouter = express.Router();

adminRouter.get("/index", adminService.index);
adminRouter.get("/", adminService.index);
adminRouter.get("/admin", adminService.admin);
adminRouter.put("/addadminpage", adminService.addadminpage);
adminRouter.post("/addadmin", adminService.addadmin);
adminRouter.delete("/deladmin", adminService.deladmin);
adminRouter.delete("/delselectedadmin", adminService.delselectedadmin);

adminRouter.get("/user", adminService.user);
adminRouter.put("/adduserpage", adminService.adduserpage);
adminRouter.post("/adduser", adminService.adduser);
adminRouter.delete("/deluser", adminService.deluser);
adminRouter.delete("/delselecteduser", adminService.delselecteduser);

adminRouter.get("/movie", adminService.movie);
adminRouter.put("/addmoviepage", adminService.addmoviepage);
adminRouter.post("/addmovie", adminService.addmovie);
adminRouter.delete("/delmovie", adminService.delmovie);
adminRouter.delete("/delselectedmovie", adminService.delselectedmovie);

adminRouter.get("/news", adminService.news);
adminRouter.put("/addnewspage", adminService.addnewspage);
adminRouter.post("/addnews", adminService.addnews);
adminRouter.delete("/delnews", adminService.delnews);
adminRouter.delete("/delselectednews", adminService.delselectednews);
adminRouter.get("/newspreview/:id", adminService.newspreview);

adminRouter.get("/comment", adminService.comment);
adminRouter.put("/addcommentpage", adminService.addcommentpage);
adminRouter.post("/addcomment", adminService.addcomment);
adminRouter.delete("/delcomment", adminService.delcomment);
adminRouter.delete("/delselectedcomment", adminService.delselectedcomment);

adminRouter.get("/article", adminService.article);
adminRouter.put("/addarticlepage", adminService.addarticlepage);
adminRouter.post("/addarticle", adminService.addarticle);
adminRouter.delete("/delarticle", adminService.delarticle);
adminRouter.delete("/delselectedarticle", adminService.delselectedarticle);
adminRouter.get("/articlepreview/:id", adminService.articlepreview);


module.exports = adminRouter;