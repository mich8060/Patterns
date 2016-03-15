$(document).ready(function(){
	$(document).on({
		'click':function(e){
			if($(e.target).hasClass('aside-primary')){
				e.preventDefault();
				$(e.target).toggleClass('active');
			}

		}
	},'aside');
	
	$aside = $('aside').offset().top - 20;
	
	$(document).on({
		scroll:function(){
			if($('aside').length){
				$scrolltop = $(window).scrollTop();
				if($scrolltop >= $aside){
					$('aside').addClass('fixed');
				}else{
					$('aside').removeClass('fixed');
				}
			}
		}
	});
});