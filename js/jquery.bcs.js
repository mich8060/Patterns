$(document).ready(function(){
	
	var timer;
	$(document).on({
		mouseenter: function(){
			window.clearTimeout(timer);
			$el = $(this).find('dropdown');
			timer = window.setTimeout(function(){
				$('dropdown').removeClass('active');
				$el.addClass('active');
				$('nav').stop(true).delay(300).animate({
					height: ($el.outerHeight() + $('nav ul').outerHeight()) + 'px'
				},300);
			},250);

		},
		mouseleave: function(){
			window.clearTimeout(timer);
			$el = $(this).find('dropdown');
			timer = window.setTimeout(function(){
				$el.removeClass('active');
				$('nav').stop(true).animate({
					height: $('nav ul').outerHeight() + 'px'
				},250, function(){
					$('body').removeClass('flyout-open');
				});
			},250);
		}
	},'nav li');
	
	if($('.sticky').length > 0){
		$sticky = $('.sticky');
		$stickyTop = $sticky.offset().top;
		$sticky.wrap($('<div />').attr({
			class: 'sticky-container'
		}).css({
			height: $sticky.outerHeight()
		}));
		$(document).on({
			scroll:function(e){
				$scrolltop = $(window).scrollTop();
				if($scrolltop >= $stickyTop){
					$sticky.addClass('active');
				}else{
					$sticky.removeClass('active');
				}
			}
		});
	}
	
	if($('.sticky-strict').length > 0){
		$sticky = $('.sticky-strict');
		$stickyTop = $sticky.offset().top;
		$sticky.wrap($('<div />').attr({
			class: 'sticky-container'
		}).css({
			height: '1px'
		}));
		$sticky.css('width',$sticky.width());
		$(document).on({
			scroll:function(e){
				$scrolltop = $(window).scrollTop();
				if($scrolltop >= $stickyTop){
					$sticky.addClass('active');
				}else{
					$sticky.removeClass('active');
				}
			}
		});
	}
	
	$('a[href*="#"]:not([href="#"])').click(function() {
		if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
	      		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      	if(target.length){
	        	$('html, body').animate({
	          		scrollTop: target.offset().top
	        	},500);
	        	return false;
	      	}
	    }
	});
	
	$(document).on({
		click:function(e){
			if($(window).width() < 900){
				e.preventDefault();
				$('body').toggleClass('menu-open');
			}
		}
	},'.branding, overlay');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			console.log();
			$(this).next().addClass('active');
		}
	},'.menu-navigation a');
	
	$(document).on({
		click:function(e){
			$el = $(this);
			if($(this).hasClass('load')){
				e.preventDefault();
				$el.removeClass('load').addClass('loading');
				$el.html($el.attr('data'));
				for(x = 0;x < 3;x++){
					$dot = $('<span />').attr({
						class: 'loading-dot'
					});
					$el.append($dot);
				}
			}
		}
	},'.btn, .btn-sm, .btn-lg');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$buybox = $('.buybox');
			$('.product-gallery').toggleClass('full');
			if($buybox.hasClass('zoom')){
				$buybox.removeClass('zoom');
				window.setTimeout(function(){
					$buybox.css('position','relative');
				},300);
			}else{
				$buybox.addClass('zoom');
				$buybox.css('position','absolute');
			}
		}
	},'.product-gallery-image');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$el = $(this);
			$el.parents('.select').find('.select-option').removeClass('selected');
			$el.addClass('selected');
		}
	},'.select-option');
	
	$('.select').each(function(){
		$(this).find('.select-options div').eq(0).addClass('selected');
	});
	
});