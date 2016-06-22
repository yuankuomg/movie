"use strict";

exports.loadMessage = () => {
    //用同步读取
    var data =  fs.readFileSync(rootPath + "/config/message.json");
    return JSON.parse(data.toString());
}

exports.notfound = (req, res, next) => {
    if (req.xhr) {
        res.status(404).end();
    } else {
        res.status(302).set("location", "/404.html").end();
    }
}

exports.errhandle = (err, req, res, next) => {
    console.log(err.stack);
    if (req.xhr) {
        res.status(500).end();
    } else {
        res.set("location", "/500.html").status(302).end();
    }

}


exports.getConn = () => {
    // return new promise((resolve, reject) => {
    //     pool.getConnection((err, conn) => {
    //         if(err){
    //             reject();
    //         }else{
    //             resolve(conn);
    //         }
    //     });
    // });
    return pool.getConnectionAsync();
};