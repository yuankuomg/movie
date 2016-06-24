"use strict";

exports.loadMessage = () => {
    //用同步读取
    var data = fs.readFileSync(rootPath + "/config/message.json");
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

var processRate = (rate) => {
    let str = "";
    for (var i = 0, j = rate; i < 5; i++ , j--) {
        if (j > 0) {
            str += `<a href=""><i class="glyphicon glyphicon-star"></i></a>`;
        } else {
            str += `<a href=""><i class="glyphicon glyphicon-star-empty"></i></a>`
        }
    }
    return str;
}

exports.processRandMovie = (rows) => {
    return new promise((resolve, reject) => {
        var html = "";
        rows.map((v) => {
            html += `<div class="thumbnail row">
					<div class="col-xs-12 col-sm-4">
						<a href="" class="thumbnail-pic">
							<img src="/img/${v.slideimg2}" class="thumb-pic1">
							<img src="/img/${v.slideimg1}" class="thumb-pic2">
						</a>
					</div>
					<div class="col-xs-12 col-sm-8">
						<div class="caption">
							<h3>${v.name}</h3>
							<hr />
							<p>上映日期：${v.time}</p>
							<p>评分：` +
                processRate(v.rate) +
                `</p>
							<a href="" class="btn btn-primary">详细</a>
							<a href="http://www.bilibili.com/video/${v.bilisource}/" target="_blank" class="btn btn-primary btn-watch-trailer">预告片</a>
						</div>
					</div>
				</div>`
        });
        resolve(html);
    });
}

exports.processLatestNes = (rows) => {
    return new promise((resolve, reject) => {
        var html = "";
        rows.map((v) => {
            html += `<div class="col-xs-12">
						<h4><a href="/detail-new/${v.id}">${v.title}</a></h4>
						<p class="news-time">${v.date}</p>
						<p>${v.quotation}</p>
					 </div>`
        });
        resolve(html);
    });
}
