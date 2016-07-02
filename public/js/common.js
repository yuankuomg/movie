$(function () {
	$(window).on("resize", function () {
		if ($(".main").outerHeight(true) < $(window).height()) {
			$(".main .footer").css("margin-top", "+=" + ($(window).height() - $(".main").outerHeight(true)));
		}
	});
	$(window).trigger("resize");
	$("#logout").click(function () {
		sessionStorage.removeItem("login");
	});
	var loginData = sessionStorage.getItem("login");
	if (loginData) {
		$("#user").attr("href", "/info.html");
		$("#user").text(JSON.parse(loginData).username);
		$("#logout").show();
	} else {
		$("#user").attr("href", "/login.html");
		$("#user").text("点此登录");
	}
	// $("#keyword").blur(function(){
	// 	$(this).popover('destory');
	// });
	$("#searchForm").submit(function () {
		if (!$("#keyword").val()) {
			$("#keyword").popover({
				placement: "bottom",
				trigger: "focus",
				content: "内容不能为空"
			}).popover('show').focus();
			return false;
		}
	});
});