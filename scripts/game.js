var animating;
var cards = 10;
//select card
function selectCard() {
    $(".card:not(.card-selected)").removeClass('card-selected');
    if (!animating)
        $(this).addClass('card-selected');
    if ($(".card-selected").length >= 2) {
        checkCards();
    }
}
function checkCards() {
    var found = 0;
    for (i = 1; i <= cards; i++) {
        if (found > 0)
            continue;
        if ($(".card-selected.card-" + i).length > 1) {
            found = i;
            continue;
        }
        else {}
    }
    if (found > 0)
    foundCards(found);
    animating = true;
    setTimeout(function() {
        $(".card").removeClass('card-selected');
        animating = false;
    },
    1500);
}
function foundCards(type) {
	$(".card-" + type).animate({"opacity": "0"}, 10).promise().done(function(){
		$(this).addClass("card-found");
		
		//final cards winner
        if ($(".card:not(.card-found)").length == 0) {
            $("body").addClass("epic-win");
            $(".win").fadeIn(400);
            setTimeout(resetBoard, 3500);
        }

		

		var info = $(this).attr("data-info");
		var title = $(this).attr("data-title");
		var image = $(this).attr("data-image");
		$("#infobox").html("<h2>"+title+"</h2><img src='"+image+"' alt='' /><span>"+info+"</span>");
		setTimeout(function(){
			$("#infobox").addClass("show");
		},300);
		
		
	
			$("#infobox").on("touchstart click", function(){
				$(this).removeClass("show").empty();
				return false
			});
		
		

		
	});
}
function resetBoard() {
	$(".card").removeClass("card-found");
    $(".gameboard").animate({"opacity": "0"}, 1500).promise().done(function(){
		$(".win").fadeOut(400);
        $(".card").css("opacity", 1);
        $(".gameboard").animate({
            opacity: 1
        },
        400);
	});
}
// extras options //
// license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o
//image sizes http://www.flickr.com/services/api/misc.urls.html
$(document).ready(function() {
	init();
    var set = '72157632327841845', 
		id = '38375704@N00', 
		api_key = '557dcdb8aad85372702a29f9d95b5290', 
		per_page = cards, 
		page = 1, 
		extras = "date_taken,url_s,s_dims,description";
    $.ajax({
        dataType: 'jsonp',
        url: 'http://api.flickr.com/services/rest/?format=json&api_key=' + api_key + '&method=flickr.photosets.getPhotos&photoset_id=' + set + '&extras=' + extras + '&per_page=' + per_page + '&page=' + page + '&jsoncallback=?',
        success: function(data) {
            $.each(data.photoset.photo, function(index) {
                var data_index = {
                    item: index + 1
                }

                $("#photos").append(ich.flickr(this).addClass("card-" + data_index.item));
            });
        },
        complete: function() {
            //do something with photos here
            $("#photos li").clone().appendTo("#photos");
            $("#photos li").each(function(index, value) {
                $(this).attr("id", "card-" + index);
            });

			(function ($) {
			    $.fn.shuffle = function () {
			        return this.each(function () {
			            var items = $(this).children();
			            return (items.length) ? $(this).html($.shuffle(items)) : this;
			        });
			    }

			    $.shuffle = function (arr) {
			        for (
			        var j, x, i = arr.length; i;
			        j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
			        return arr;
			    }
			})(jQuery);
			$('#photos').shuffle();
            $(".card").on('touchstart click', selectCard);
			
        }
    });
});
