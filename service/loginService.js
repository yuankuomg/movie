"use strict";

exports.login = (req, res, next) => {
    co(function*(){
        var conn = yield util.getConn();
        var rows = yield loginModule.login(conn, req);
        if(rows.length){
            req.session.adminlogin = rows[0];
            res.send(message.success).end();
        }else{
            res.send(message.login_err).end();
        }
    }).catch((err) => {
        next(err);
    });
    
        // if (req.body.rememberme) {
        //     res.cookie("username", req.body.username, {maxAge: 1000*60});
        //     res.cookie("password", req.body.password, {maxAge: 1000*60});
        // }

}
exports.logout = (req, res, next) => {
    delete req.session.adminlogin;
    res.send(message.success).end();
}

