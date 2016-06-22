$(function() {
	$(window).on("resize", function() {
		if ($(".main").outerHeight(true) < $(window).height()) {
			$(".main .footer").css("margin-top", "+=" + ($(window).height() - $(".main").outerHeight(true)));
		}
	});
	$(window).trigger("resize");
	
});