(function($) {
    $.fn.fadeIn = function(speed, callback) {
        return this.animate({opacity: 'show'}, speed, function() {
                if ( $.browser.msie )
                {
                        this.style.removeAttribute('filter');
                }
                if ( $.isFunction(callback) )
                {
                        callback.call(this);
                }
        });
    };

    $.fn.fadeOut = function(speed, callback) {
        return this.animate({opacity: 'hide'}, speed, function() {
                if ( $.browser.msie )
                {
                        this.style.removeAttribute('filter');
                }
                if ( $.isFunction(callback) )
                {
                        callback.call(this);
                }
        });
    };

    $.fn.fadeTo = function(speed, to, callback) {
        return this.animate({opacity: to}, speed, function() {
                if ( to == 1 && $.browser.msie )
                {
                        this.style.removeAttribute('filter');
                }
                if ( $.isFunction(callback) )
                {
                        callback.call(this);
                }
        });
    };
})(jQuery);

function init() {
	$('#curtain').snowfall({
		flakeCount : 24, 
		maxSpeed : 5, 
		maxSize : 500,
		minSize : 500,
		flakeIndex: 999999
	});
	
	var set = '72157625595152272',
		id = '38375704@N00',
		api_key = '557dcdb8aad85372702a29f9d95b5290',
		per_page = 200,
		page = 1,
		extras = "date_upload,date_taken,owner_name,icon_server,original_format,last_update,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_m,url_z,url_l,url_o,description"
	$.ajax({
	 	  dataType: 'jsonp',
		  url: 'http://api.flickr.com/services/rest/?format=json&api_key='+ api_key +'&method=flickr.photosets.getPhotos&photoset_id='+ set +'&extras='+ extras +'&per_page='+ per_page +'&page='+ page +'&jsoncallback=?',
		  success: function (data) {
		      $.each(data.photoset.photo, function(index, value){
				var d = Date.parse(''+this.datetaken+''),
				 	my_data = {
						title: this.title,
						date: d.toString('dddd, MMMM dd, yyyy h:mm:ss tt'),
						square: this.url_sq,
						thumb: this.url_t,
						small: this.url_s,
						medium: this.url_m,
						original: this.url_o,
						views: this.views,
						description: this.description._content
			        	},
					user = ich.flickr(my_data);
					book = ich.book(my_data);
					$('#photos').append(user);
					$('#mybook .b-load').append(book);
					if ( index == per_page - 1 ) return false;					
	          	});
					$("a[rel='flickr']").click(function(){
						$("#curtain").show().fadeTo(300,1);
						setTimeout ('$(".book_wrapper").show().fadeTo(900,1)', 300);
						return false
					});
					
					$("a#close, #curtain").click(function(){
						$(".book_wrapper").fadeTo(500,0, function(){
								$(this).hide();
								$("#curtain").fadeTo(250,0, function(){
									$(this).hide();
								});
						});
						return false
					});
		  },
			complete: function(){
			setTimeout ('$("section#top h2").fadeTo(300,1)', 1000);
			setTimeout ('$("section#top p").fadeTo(300,1)', 3000);
			$("#ho1").cyclicFade({repeat: 1, params: [{fadeout:500, stayout:800, opout:0, fadein:250, stayin:2200, opin:1.0}]});
			$("#ho2").cyclicFade({repeat: 1, params: [{fadeout:500, stayout:1300, opout:0, fadein:250, stayin:1700, opin:1.0}]});
			$("#ho3").cyclicFade({repeat: 1, params: [{fadeout:500, stayout:1800, opout:0, fadein:250, stayin:1200, opin:1.0}]});
			$(function() {
							var $mybook 		= $('#mybook');
							var $bttn_next		= $('#next_page_button');
							var $bttn_prev		= $('#prev_page_button');
							var $loading		= $('#loading');
							var $mybook_images	= $mybook.find('img');
							var cnt_images		= $mybook_images.length;
							var loaded			= 0;
							$mybook_images.each(function(){
								var $img 	= $(this);
								var source	= $img.attr('src');
								$('<img/>').load(function(){
									++loaded;
									if(loaded == cnt_images){
										$loading.hide();
										$bttn_next.show();
										$bttn_prev.show();
										$mybook.show().booklet({
											name:               null,
											width:              800,
											height:             500,
											speed:              600,
											direction:          'LTR',
											startingPage:       0,
											easing:             'easeInOutQuad',
											easeIn:             'easeInCirc',
											easeOut:            'easeOutCirc',
											closed:             true,
											closedFrontChapter: null,                            
											closedBackTitle:    null,
											closedBackChapter:  null,
											covers:             false, 
											pagePadding:        10,
											pageNumbers:        true,
											hovers:             false,
											overlays:           false,
											tabs:               false,
											tabWidth:           60,
											tabHeight:          20,
											arrows:             false,
											cursor:             'pointer',
											hash:               false,                           
											keyboard:           true,
											next:               $bttn_next,
											prev:               $bttn_prev,

											menu:               null,
											pageSelector:       false,
											chapterSelector:    false,
											shadows:            true,
											shadowTopFwdWidth:  166,
											shadowTopBackWidth: 166,
											shadowBtmWidth:     50,
											before:             function(){},
											after:              function(){}
										});
									}
								}).attr('src',source);
							});

						});
			
					}
				});
			}