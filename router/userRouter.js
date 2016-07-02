"use strict";

let userRouter = express.Router();


userRouter.post("/login", userService.login);
userRouter.get("/logout", userService.logout);
userRouter.post("/reg", userService.reg);
userRouter.post("/comment", userService.addcomment);
userRouter.post("/article", userService.addarticle);
userRouter.post("/update", userService.updateuser);




module.exports = userRouter;