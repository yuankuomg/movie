$(document).ready(function () {
    $._ajax({
        url: "/comment/" + $("#movieId").attr("mid"),
        dataType: "json"
    }).done(function (data) {
        $("#commentList").append(data.html);
        $("#commentCount").text("共" + data.count + "条");
    }).fail(function (err) {
        $("#commentList").append("<h2>opps！加载没成功</h2>");
    });
    $._ajax({
        url: "/article/" + $("#movieId").attr("mid"),
        dataType: "json"
    }).done(function (data) {
        $("#articleList").append(data.html);
        $("#articleCount").text("共" + data.count + "篇");
    }).fail(function (err) {
        $("#articleList").append("<h2>opps！加载没成功</h2>");
    });
});