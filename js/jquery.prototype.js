$(document).ready(function(){
	$(document).on({
		click:function(e){
			e.preventDefault();
			$('.group-menu-container').animate({scrollLeft:1400}, 1000);
		}
	},'.group-menu-container-right');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$('.group-menu-container').animate({scrollLeft:0}, 1000);
		}
	},'.group-menu-container-left');
});