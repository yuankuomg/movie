"use strict";

let adminRouter = express.Router();

adminRouter.get("/index", adminService.index);
adminRouter.get("/admin", adminService.admin);
adminRouter.get("/addadminpage", adminService.addadminpage);
adminRouter.post("/addadmin", adminService.addadmin);


module.exports = adminRouter;