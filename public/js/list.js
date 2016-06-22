$(document).ready(function() {
	var btn = $(".btn-watch-trailer");
	$(window).on("resize", function() {
		if ($(this).width() <= 530) {
			btn.attr({
				"data-toggle": "",
				"data-target": ""
			});
		} else {
			btn.attr({
				"data-toggle": "modal",
				"data-target": "#trailerModal"
			});
		}
	}).trigger("resize");
});