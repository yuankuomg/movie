"use strict";

let userRouter = express.Router();


userRouter.post("/login", userService.login);
userRouter.get("/logout", userService.logout);


module.exports = userRouter;