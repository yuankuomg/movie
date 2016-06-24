$(document).ready(function () {
	var btn = $(".btn-watch-trailer");
	// $(window).on("resize", function() {
	// 	if ($(this).width() <= 530) {
	// 		btn.attr({
	// 			"data-toggle": "",
	// 			"data-target": ""
	// 		});
	// 	} else {
	// 		btn.attr({
	// 			"data-toggle": "modal",
	// 			"data-target": "#trailerModal"
	// 		});
	// 	}
	// }).trigger("resize");
	$("#indexSlide").slick({
		swipeToSlide: true,
		pauseOnFocus: true,
		pauseOnHover: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		//		cssEase: 'linear',
		asNavFor: '#indexSubSlide'

	});
	$("#indexSubSlide").slick({
		autoplay: true,
		swipeToSlide: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		centerMode: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '#indexSlide',
		//		cssEase: 'linear',
		responsive: [{
			breakpoint: 1081,
			settings: {
				slidesToShow: 4

			}

		},
			{
				breakpoint: 906,
				settings: {
					slidesToShow: 3

				}
			},
			{
				breakpoint: 724,
				settings: {
					slidesToShow: 2
				}
			}]
	});

	$("#indexSubSlide .subslide-thumb").on("click", function () {
		$('#indexSubSlide').slick('slickGoTo', parseInt($(this).attr("data-slick-index")), false);
	});

	$._ajax({
        url: "/randmovie",
        dataType: "html"
    }).done(function (html) {
        $("#randMovie").append(html);
    }).fail(function (err) {
        $("#randMovie").append("<h2>opps！加载没成功</h2>");
    });
	$._ajax({
        url: "/latestnews",
        dataType: "html"
    }).done(function (html) {
        $("#latestNews").append(html);
    }).fail(function (err) {
        $("#latestNews").append("<h2>opps！加载没成功</h2>");
    }).always(function () {
    });
});