"use strict";

let loginRouter = express.Router();

loginRouter.post("/login", apiService.login);


module.exports = loginRouter;