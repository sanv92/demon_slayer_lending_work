$(document).ready(function() {

//gallery by Sander
var gallen = $('#screenshots > ul > li').size() -1;

$('#lightoff').css({ 'opacity' : 0.6 });
	$('#screenshots > ul > li').click(function(e){
	e.preventDefault();
	e.stopPropagation();

var href = $(this).children('img').attr('src');
var alt = $(this).children('img').attr('alt');

$(this).addClass('spilt');
$(this).children('img').css({ 'border' : '1px solid #009cff' });

$('#close').fadeIn('fast');
		if ($('#lightoff').is(":hidden")) {

			$('#lightoff').fadeIn("slow");
			$('<div class="tooltip">').html('<div id="wrnav"><div id="alt">' + alt + '</div><img src="' + href + '" alt="" /></div><div id="lfgallnav"><div><div id="galleft"></div><div id="galright"></div><div id="spclose"></div></div></div></div>').fadeIn(300).appendTo('body');

    var w = $('.tooltip img').width();
	var h = $('.tooltip img').height();
	$('#lfgallnav').css({ height : h + 'px' });
	$('#lfgallnav > div:first-child').css({ width : w + 'px' });


$(window).bind('resize',function() {
    var w = $('.tooltip img').width();
	var h = $('.tooltip img').height();
	$('#lfgallnav').css({ height : h + 'px' });
	$('#lfgallnav > div:first-child').css({ width : w + 'px', height : h + 'px' });
});

	$('#spclose').fadeIn(500);
	$('#galleft').fadeIn(500);
	$('#galright').fadeIn(500);


setTimeout(function(){
	$("#lfgallnav").trigger("resize");
}, 100);

function navout() {
	$('#spclose').hide();
	$('.spclose').hide();
	$('#galleft').hide();
	$('#galright').hide();
}

function navin() {
	$('#spclose').fadeIn(300);
	$('#galleft').fadeIn(300);
	$('#galright').fadeIn(300);
}

		$('#galright').click(function() {

	var galnum = $('.spilt').index();
	if(gallen == galnum) {} else {
				var childimgprv = $(".spilt").next().addClass("spilt");
				$(".spilt").prev().removeClass("spilt");
				var gpilt = $(childimgprv).children('img').attr('src');
				var piltnimi = $(childimgprv).children('img').attr('alt');
				$(childimgprv).prev().children('img').removeAttr('style');
				$(childimgprv).children('img').css({ 'border' : '1px solid #009cff' });
				$('.tooltip #alt').text(piltnimi);
				$('.tooltip img').attr('src', gpilt);
				navout();
	}


setTimeout(function(){
	$("#lfgallnav").trigger("resize");
	navin();
}, 400);


		});



$('#galleft').click(function(){
	var galnum = $('.spilt').index();

		if(0 == galnum) {} else {
			var childimgprv = $(".spilt").prev().addClass("spilt");
			$(".spilt").next().removeClass("spilt");
			var gpilt = $(childimgprv).children('img').attr('src');
			var piltnimi = $(childimgprv).children('img').attr('alt');
			$(childimgprv).next().children('img').removeAttr('style');
			$(childimgprv).children('img').css({ 'border' : '1px solid #009cff' });
			$('.tooltip #alt').text(piltnimi);	
			$('.tooltip img').attr('src', gpilt);
			navout();
	}

setTimeout(function(){
	$("#lfgallnav").trigger("resize");
	navin();
}, 400);

});

		
		} else {
			$('#lightoff, .tooltip img').fadeOut("slow");
			$('<div class="tooltip">').html('');
			$('#screenshots > ul > li').removeAttr('class');
			$('#spclose').fadeOut('fast');
		}

	}), $(document).on('click', '#spclose', function(){
			$('#lightoff').fadeOut("slow");
			$('.tooltip').fadeOut("fast");
			$('<div class="tooltip">').html('');
			$('#spclose').remove();
			$('#screenshots > ul > li').removeAttr('class');
			$('.tooltip').remove();
			$('#screenshots > ul > li').children('img').removeAttr('style');
			$('#close').fadeOut('fast');
			$('#spclose').fadeOut('fast');
	});
//gallery

	$('#rules > a').click(function(e){
			e.preventDefault();

			$('body').addClass('body')
if($('#wrnav').length) { $('#lightoff, .tooltip').fadeIn("slow"); } else {
			$('<div class="tooltip">').html('<div id="wrnav"><div class="rules"></div></div><div class="spclose"></div>').fadeIn(300).appendTo('body');
			$('#lightoff').fadeIn("slow");
		}
		

		
		  $.ajax({
				type: "GET",
				cache: false,
				url:"rules.html",
				dataType: "HTML",
				success:function(result){
					$(".rules").html(result);
		  }});
//			$('.rules').load('rules.html');
			

	}), $(document).on('click', '.spclose, #lightoff', function(){
		$('#lightoff, .tooltip').fadeOut("fast");
		$('body').removeClass('body');
		
		
			$('#lightoff').fadeOut("slow");
			$('.tooltip').fadeOut("fast");
			$('<div class="tooltip">').html('');
			$('#spclose').remove();
			$('#screenshots > ul > li').removeAttr('class');
			$('.tooltip').remove();
			$('#screenshots > ul > li').children('img').removeAttr('style');
			$('#close').fadeOut('fast');
			$('#spclose').fadeOut('fast');
		
		
	});


});
