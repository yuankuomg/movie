"use strict";
//第三方模块
global.express = require("express");
global.bodyParser = require("body-parser");
global.session = require("express-session");
global.promise = require("bluebird");
global.co = require("co");
global.ejs = require("ejs");
global.qs = require("querystring");
global.url = require("url");
var mditor = require("mditor");
global.parser = new mditor.Parser();
var cookieParser = require('cookie-parser');
var mysql = require("mysql");
global.pool = promise.promisifyAll(mysql.createPool({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "movie",
        dateStrings: "DATE"
    }));
//系统模块
global.rootPath = __dirname;
global.fs = require("fs");
//自定义模块
global.util = require("./util/util.js");
global.userModule = require("./module/userModule.js");
global.viewsModule = require("./module/viewsModule.js");

// global.adminModule = require("./module/adminModule.js");
global.viewsService = require("./service/viewsService.js");
global.userService = require("./service/userService.js");
// global.adminService = require("./service/adminService.js");
var viewsRouter = require("./router/viewsRouter.js");
var userRouter = require("./router/userRouter.js");
// var adminRouter = require("./router/adminRouter.js");
//初始化
global.message = util.loadMessage();
var app = express();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
//设置ejs模板
app.set("views", "./views");
app.set("views engine", "html");
app.engine(".html", ejs.__express);

app.use(viewsRouter);
app.use("/user", userRouter);
app.use(express.static("public"));
// app.use("/admin", adminRouter);
//404中间件
app.use(util.notfound);
//500中间件
app.use(util.errhandle);

process.on("uncaughtException", (err) => {
    console.log(`有未捕捉到的异常\n${err.stack}`);
});
var server = app.listen(80, () => {
    console.log("服务器启动成功" + new Date());
});