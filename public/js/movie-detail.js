window.onload=function()
{
	var height=$(".movie-detail-detail").height();
	$(".movie-detail-top img").height(height);
	
	//评价
	var evaluate=$(".movie-detail-evaluate");
	evaluate.find("span").mouseover(function()
	{
		$(this).bind("mouseout",function()
		{
			evaluateInit(this);
		});
		var number=$(this).attr("num");
		$(".movie-detail-evaluate span:lt("+ number +")").each(function()
		{
			$(this).removeClass("glyphicon-star-empty").addClass("glyphicon-star");	
			$(this).css("color","orange");
		});
		var value=$(this).attr("value");
		$(this).parents(".movie-detail-evaluate").append("<span class='movie-detail-evaluate-text'>"+ value +"</span>");
	});
	evaluate.find("span").mouseout(function()
	{
		evaluateInit(this);
	});
	
	evaluate.find("span").click(function()
	{
		var number=$(this).attr("num");
		$(".movie-detail-evaluate span:lt("+ number +")").each(function()
		{
			$(this).removeClass("glyphicon-star-empty").addClass("glyphicon-star");	
			$(this).css("color","orange");
		});
		evaluate.find("span").off("mouseout");
	});
}

var evaluateInit=function(span)
{
	var number=$(span).attr("num");
	$(".movie-detail-evaluate span:lt("+ number +")").each(function()
	{
		$(this).removeClass("glyphicon-star").addClass("glyphicon-star-empty");
		$(this).css("color","black");
	});
	$(span).parents(".movie-detail-evaluate").find(".movie-detail-evaluate-text").remove();
}
