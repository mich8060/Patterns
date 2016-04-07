$(document).ready(function(){
	$(document).on({
		click:function(e){
			e.preventDefault();
			$breakpoint = $(this).attr('data-class');
			$('.frame').removeClass('iframe-full iframe-lg iframe-default iframe-md iframe-sm iframe-xs');
			$('.frame').addClass($breakpoint);
		}
	},'.resizer-ruler-size');
	
	$(document).on({
		keydown:function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13){
				e.preventDefault();
				$('iframe').attr('src',$(this).val());
			}
		}
	},'.preview-address');
	
});