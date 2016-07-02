"use strict";

exports.loadMessage = () => {
    //用同步读取
    let data = fs.readFileSync(rootPath + "/config/message.json");
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
        let html = "";
        rows.map((v) => {
            html += `<div class="thumbnail row">
					<div class="col-xs-12 col-sm-4">
						<a href="/detail-movie/${v.id}" class="thumbnail-pic">
							<img src="/img/${v.slideimg2}" class="thumb-pic1">
							<img src="/img/${v.slideimg1}" class="thumb-pic2">
						</a>
					</div>
					<div class="col-xs-12 col-sm-8">
						<div class="caption">
							<h3><a href="/detail-movie/${v.id}">${v.name}</a></h3>
							<hr />
							<p>上映日期：${v.time}</p>
							<p>评分：${v.rate}&nbsp;/&nbsp;5</p>
							<a href="/detail-movie/${v.id}" class="btn btn-primary">详细</a>
							<a href="http://www.bilibili.com/video/${v.bilisource}/" target="_blank" class="btn btn-primary btn-watch-trailer">预告片</a>
						</div>
					</div>
				</div>`
        });
        resolve(html);
    });
}

exports.processLatestNews = (rows) => {
    return new promise((resolve, reject) => {
        let html = "";
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

exports.processLatestNewsList = (rows) => {
    return new promise((resolve, reject) => {
        let html = "";
        rows.map((v) => {
            html += `<li class="list-group-item">
							<a href="/detail-new/${v.id}">${v.title}</a>
						</li>`
        });
        resolve(html);
    });
}

exports.processMaylike = (rows) => {
    return new promise((resolve, reject) => {
        let html = "";
        rows.map((v) => {
            html += `<li class="list-group-item">
                            <a href="/detail-movie/${v.id}"><img src="/img/${v.listimg1}" /></a>
							<div class="item-des">
								<a href="/detail-movie/${v.id}"><h4 class="item-title" title="${v.name}">${v.name}</h4></a>
								<p>上映日期：${v.time}</p>
							</div>
						</li>`
        });
        resolve(html);
    });
}

exports.processComment = (rows) => {
    return new promise((resolve, reject) => {
        let html = "";
        rows.map((v) => {
            html += `<li class="list-group-item">
                        <span>${v.username}</span>
                        <span style="font-size: 14px; color: darkgray;">${v.date}</span>
                        <p style="margin:10px 0 0">${v.main}</p>
                    </li>`
        });
        resolve(html);
    });
}

exports.processArticle = (rows) => {
    return new promise((resolve, reject) => {
        let html = "";
        rows.map((v) => {
            html += `<li class="list-group-item">
                        <a href="/detail-article/${v.id}">${v.title}</a>
                        &nbsp;<span>${v.username}</span>
                        &nbsp;<span style="font-size: 14px; color: darkgray;">${v.date}</span>
                    </li>`
        });
        resolve(html);
    });
}

exports.processMovieList = (rows) => {
    return new promise((resolve, reject) => {
        let html = "";
        rows.map((v) => {
            html += `<option value="${v.id}">${v.name}</option>`
        });
        resolve(html);
    });
}

exports.processYourAtricle = (rows) => {
    return new promise((resolve, reject) => {
        let html = "";
        rows.map((v) => {
            html += `<a href="/detail-article/${v.id}" class="list-group-item">
                                ${v.title}<br>
								评&nbsp;${v.name}
								<span class="badge">${v.date}</span>
						</a>`
        });
        resolve(html);
    });
}

// exports.processSearchResult = (rows, keyword) => {
//     return new promise((resolve, reject) => {
//         let html = "";
//         let template = "";
//         if (keyword == "movie") {
//             rows.map((v) => {
//                 html += `<div class="thumbnail row">
// 							<div class="col-xs-12 col-sm-4 post-pic">
// 								<a href="/detail-movie/${v.id}" class="thumbnail-pic">
// 									<img src="img/${v.listimg2}" class="thumb-pic1">
// 									<img src="img/${v.slideimg1}" class="thumb-pic2">
// 								</a>
// 							</div>
// 							<div class="col-xs-12 col-sm-8 movie-des">
// 								<div class="caption">
// 									<h3>
// 										<a href="/detail-movie/${v.id}">
//                                         ${v.name}
// 										</a>
// 									</h3>
// 									<hr />
// 									<p>上映日期： ${v.time}</p>
// 									<p>平均评分：${v.rate}&nbsp;/&nbsp;5
// 									</p>
// 									<p>你的评分：
// 										<a href=""><i class="glyphicon glyphicon-star-empty"></i></a>
// 										<a href=""><i class="glyphicon glyphicon-star-empty"></i></a>
// 										<a href=""><i class="glyphicon glyphicon-star-empty"></i></a>
// 										<a href=""><i class="glyphicon glyphicon-star-empty"></i></a>
// 										<a href=""><i class="glyphicon glyphicon-star-empty"></i></a>
// 									</p>
// 									<p>演员：${v.actor}</p>
// 									<p>导演：${v.director}</p>
// 									<p>分类：${v.type}</p>
// 									<p>时长：${v.long}</p>
// 									<a href="http://www.bilibili.com/video/<%=listMovie.bilisource%>/" target="_blank" class="btn btn-primary btn-watch-trailer">
// 								<i class="glyphicon glyphicon-film"></i>&nbsp;预告片</a>
// 								</div>
// 							</div>
// 						</div>`
//             });
//         }else if(keyword == "news"){

//         }

//         resolve(html);
//     });
// }