$(document).ready(function(){
	
	var href = window.location.href;
		href = href.substr(href.lastIndexOf('/') + 1);
		href = href.split("-")[0];
		$("a[name='"+href+"']").addClass('active');
	
	$(document).on({
		'click':function(e){
			if($(e.target).hasClass('aside-primary')){
				e.preventDefault();
				$(e.target).toggleClass('active');
			}else if($(e.target).parent().hasClass('tier')){
				e.preventDefault();
				$href = $(e.target).attr('href');
				$content = $('.guide-load-container');
				$content.animate({
					opacity:0
				},300,function(){
					$content.load($href+" .guide-load",function(){
						$content.animate({
							opacity:1
						},300);
						history.pushState({}, $(this).attr('title'), $href);
						prettyPrint();
					});
				});
			}

		}
	},'.guide-menu');  
});


$(document).on({
	click:function(e){
		if($('body').hasClass('guide-open')){
			$('body').toggleClass('guide-open');
		}
	}
},'.guide');

$(document).on({
	click:function(e){
		e.stopPropagation();
		$('body').toggleClass('guide-open');
	}
},'.hamburger');