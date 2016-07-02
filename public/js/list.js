$(document).ready(function () {
    $._ajax({
        url: "/maylike",
        dataType: "html"
    }).done(function (html) {
        $(".may-like").append(html);
    }).fail(function (err) {
        $(".may-like").append("<h2>opps！加载没成功</h2>");
    });
    $._ajax({
        url: "/latestnewslist",
        dataType: "html"
    }).done(function (html) {
        $(".article-list").append(html);
    }).fail(function (err) {
        $(".article-list").append("<h2>opps！加载没成功</h2>");
    });
});