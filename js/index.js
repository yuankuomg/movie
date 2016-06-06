$(document).ready(function() {
	var dots = $("#indexSubSlide .subslide-thumb").length;
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

	$("#indexSubSlide .subslide-thumb").on("click", function(){
		$('#indexSubSlide').slick('slickGoTo', parseInt($(this).attr("data-slick-index")), false);	
	});
});