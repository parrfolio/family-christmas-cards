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
	var set = '72157632336021646',
		id = '38375704@N00',
		api_key = '557dcdb8aad85372702a29f9d95b5290',
		per_page = 200,
		page = 1,
		extras = "date_taken,url_m,url_s,description"
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
			        	}
					$('#mybook .b-load').append(ich.book(my_data));
					if ( index == per_page - 1 ) return false;					
	          	});
					
		  },
			complete: function(){
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
											setTimeout(function(){
													$(".b-load").show(300, function(){
														$loading.fadeTo(1000,0,function(){
															$(this).hide();
														});
													});
												
											}, 2000);
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

						
						$("a#book").fadeTo(600,1).click(function(){
							$("#curtain").show().fadeTo(600,1,function(){
								$("header").fadeTo(300,0);
								$("#album").show().fadeTo(900,1);
								$(this).parents("body").addClass("open");
							});
							return false
						});

						$("a#close").click(function(){
							$("#album").fadeTo(300,0, function(){
										$(this).hide();
											$("#curtain").fadeTo(300,0, function(){
												$(this).hide();
												$("header").fadeTo(600,1, function(){
													$("body").removeClass("open");
												});
											});
								
							});
							return false
						});
			
					}
				});
			}