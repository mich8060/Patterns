$(document).ready(function(){
	
	$.fn.showUtilities = function(){
		$('.editor-media').removeClass('active');
		$('.editor-photo-layout').removeClass('active');
		$('figure.focused').removeClass('focused');
		$('.editor-manager-publish').hide();
	}
	
	$.fn.buildGrid = function(){
		$el = $(this);
		$container = $('<div />').attr({
			class: 'editor-grid',
			contenteditable: false
		});

		for(x = 0;x <= 3;x++){
			$box = $('<div />').attr({
				class: 'editor-grid-item',
				contenteditable: false
			});
			
			$control = $('<div />').attr({
				class: 'editor-grid-item-control',
				contenteditable: false
			});
			
			$text = $('<a />').attr({
				class: 'icons',
				type: 'text'
			});
			
			$image = $('<a />').attr({
				class: 'icons',
				type: 'image'
			});
			
			$shop = $('<a />').attr({
				class: 'icons',
				type: 'shop'
			});
			
			$instagram = $('<a />').attr({
				class: 'icons',
				type: 'instagram'
			});
			
			$video = $('<a />').attr({
				class: 'icons',
				type: 'video'
			});
			
			$look = $('<a />').attr({
				class: 'icons',
				type: 'look'
			});
			
			$control.append($text).append($image).append($shop).append($instagram).append($video).append($look);
			$box.append($control);
			
			$container.append($box);
		}
		
		$el.before($container);
	}
	
	$(document).on({
		click:function(e){
			if($(this).attr('type') == 'shop'){
				$el = $(this).parents('.editor-grid-item');
				$div = $('<div />').attr({
					class: 'content',
					contenteditable: false
				});
				$input = $('<span />').attr({
					class: 'editor-product-input',
					contenteditable: true,
					placeholder:'7-Digit SKU Number'
				});

				$div.append($input);
				$el.html($div);
				console.log($el);
			}

		}
	},'.editor-grid-item-control a');
	
	$.fn.buildProduct = function(){
		$el = $(this);
		$div = $('<div />').attr({
			class: 'editor-product',
			contenteditable: false
		});
		$input = $('<span />').attr({
			class: 'editor-product-input',
			contenteditable: true,
			placeholder:'7-Digit SKU Number'
		});
		
		$div.append($input);
		$el.before($div);
		$input.focus();
		
		$(document).on({
			keyup:function(e){
				if($input.text().length >= 7){
					//RAI
					if($input.text().length == 7){
						var sku = $input.text().substring(0,7).toUpperCase();
						$.getJSON("http://localhost:8888/patterns/proxy/products.php?sku="+sku,function(data){
							$link = $('<a />').attr({
								href:'#'
							});
							$image = $('<img />').attr({
								class:'editor-product-image',
								src: data.images[0].largeUrl
							}).html(data.title);
							$brand = $('<div />').attr('class','editor-product-brand').html(data.brand.name);
							$title = $('<div />').attr('class','editor-product-title').html(data.title);
							$desc = $('</p>').attr('contenteditable',true).html(data.plainTextDescription.substring(0, 300)+'...');
							$more = $('<a />').attr({
								class: 'hint underline'
							}).html('See Full Product Details');
							$link.append($image).append($brand).append($title).append($desc).append($more);
							$div.find('a').remove();
							$div.prepend($link);
						});
					}
					
					if($input.text().length > 7){
						if($input.text().split("-")){
							var colorway = $input.text().split("-");
								colorway = colorway[1];
							var src = $image.attr('src').split('/');
								src[8] = colorway+'.jpg';
								src = src.join('/');
								$('.media-image-exists').attr('src',src).load(function() {
								  $image.attr('src',src);
								});
						}
					}
				}
			}
		},$input);
	}
	
	$.fn.insertBlockquote = function(){
		$quote = $('<blockquote />').attr({
			placeholder: 'Insert your quote'
		});
		$(this).before($quote);
	}
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$type = $(this).attr('type');
			if($type == "publish"){
				$('.editor-manager-publish').show();
			}
		}
	},'.editor-manager-controller a');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$('figure.focused').removeClass('full left normal wide right').addClass($(this).attr('type'));
		}
	},'.editor-photo-layout a')
	
	$(document).on({
		change:function(){
			$editing = $('.editing');
			$figure = $('<figure />').attr({
				class: 'focused'
			});
			$figcaption = $('<figcaption />').attr({
				contenteditable: true
			})
			
			$span = $('<span />').attr({
				placeholder: 'Type caption for image (optional)'
			});
			$figcaption.append($span);
			
			$img = $('<img />').attr({
				contenteditable: false,
				src:''
			});
			$file = $(this)[0].files[0];
			
			var reader = new FileReader();
				reader.addEventListener("load",function(){
					$img.attr('src',reader.result);
				},false);
				
			if($file){
				reader.readAsDataURL($file);
				$figure.append($img);
			}
			$figure.append($figcaption);
			
			$editing.before($figure);	
			$editing.removeClass('editing');
			$('.editor-photo-layout').css('top',($figure.offset().top - 40)).addClass('active');
		}
	},'.media-photo-upload:file');
		
		
	$(document).on({
		change:function(){
			$hero = $('.editor-hero');

			$img = $('<img />').attr({
				contenteditable: false,
				src:''
			});
			$file = $(this)[0].files[0];
			
			var reader = new FileReader();
				reader.addEventListener("load",function(){
					$img.attr('src',reader.result);
				},false);
				
			if($file){
				reader.readAsDataURL($file);
				$hero.html($img);
				$hero.addClass('active');
			};
		}
	},'.media-hero-upload:file');
		
	$(document).on({
		click:function(e){
			e.stopPropagation();
			e.preventDefault();
			$command = $(this).attr('type');
			switch($command){
				case "createLink":
					document.execCommand("CreateLink", false, "http://www.backcountry.com");
					break;
				case "bold":
					document.execCommand('bold',false,true);
					break;
				case "h2":
					document.execCommand('formatBlock', false, '<h2>'); 
					break;
				case "h3":
					document.execCommand('formatBlock', false, '<h3>'); 
					break;
				case "blockquote":
					document.execCommand('formatBlock', false, '<blockquote>'); 
					break;
			}		
				$('.editor-format').removeClass('active');
		}
	},'.editor-format a')
		
	$(document).on({
		click:function(e){
			$(this).showUtilities();
		},
		keydown:function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13){
				// Detect if user hit enter
				$(window.getSelection().focusNode.parentNode).removeClass('focused');
			}
		},
		keyup:function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			var element = $(window.getSelection().focusNode);
			var parent = $(window.getSelection().focusNode.parentNode);
			if(code == 13){
				// Save Draft
				$status = $('.editor-status');
				$status.html("Saving...");
				$data = {
					author: $('.editor-author-name').html(),
					title: $('h1').html(),
					content: $('.editor').html()
				};
				$data = $.param($data);
				$.ajax({
					data: $data,
					type: 'POST',
				  	url: 'http://localhost:8888/patterns/proxy/drafts.php',
				}).done(function(){
					// False sense of security feeling like we are making sure it's saved :)
					window.setTimeout(function(){
						$status.html("Draft");
					},1000);
				});
				parent.addClass('focused');
			}
			if(!$(element).text().length){
				element.html('');
			}
			
			var text = $(this).text().split(" ").length / 200;
				text = Math.round(text);
				$('.editor-read').html(text);
		},
		paste:function(e){
			e.preventDefault();
			// Remove content styling from copy & paste
			if(e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData){
				var text = (e.originalEvent || e).clipboardData.getData('text/plain');
				window.document.execCommand('insertText', false, text);
				// Call Save Function
			}
		},
		mouseup:function(e){
			e.stopPropagation();
			$el = $(e.target);
	    	var pos = $('<span />').css({
				display:'inline-block',
				position:'absolute',
				background: 'rgba(0,0,255,0.2)'
			}).html(window.getSelection().toString());
			var range = window.getSelection().getRangeAt(0);
			if(window.getSelection().toString() != ""){
				range.insertNode(pos[0]);
				var box = pos[0].getBoundingClientRect();
					box = {
						top: (Math.round(box.top) - 50) + $(document).scrollTop(),
						left: Math.round(box.left) + (pos.width() / 2)
					}
				pos[0].parentNode.removeChild(pos[0]);
				var tag = window.getSelection().focusNode.parentNode.tagName;
				if(tag == 'P' || tag == "BLOCKQUOTE"){
					$('.editor-format').css({
						left:(box.left),
						top:(box.top)
					}).addClass('active');
				}else{
					$('.editor-format').removeClass('active');
				}
			}else{
				$('.editor-format').removeClass('active');
			}
		}
		
	},'.editor');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).showUtilities();
			if(e.offsetX < 0){
				// Add Media Button
				$(this).toggleClass('editing');
				$('.editor-media').toggleClass('active').css('top',$(this).offset().top - 15);
			}else{
				// Clicked on Text
				$('.editor-media').removeClass('active');
				$(this).removeClass('editing');
				$('.editor p').removeClass('focused');
				$(e.target).addClass('focused');
			}
		},
	},'.editor p');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$type = $(this).attr('type');
			$('.editor-media').removeClass('active');
			switch($type){
				case 'video':
					break;
				case 'camera':
					$('.media-photo-upload').trigger('click');
					break;
				case 'grid':
					$('.editing').buildGrid();
					break;
				case 'list':
					break;
				case 'bag':
					$('.editing').buildProduct();
					break;
			}
		}
	},'.editor-media a');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			e.stopPropagation();
			$('figure.focused').removeClass('focused');
			$top = $(this).offset().top - 40;
			$(this).addClass('focused');
			$('.editor-photo-layout').css('top',$top).addClass('active');
			$('html, body').animate({
				scrollTop: $top
			},300);
		}
	},'figure');
	
	$(document).on({
		click:function(e){
			$('.media-hero-upload').trigger('click');
		}
	},'.editor-hero');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$index = $(this).index() + 1;
			console.log($index);
			$('.editor-manager-section').hide();
			$('.editor-manager-section').eq($index).show();
		}
	},'.editor-manager-tab');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$('.editor-manager-section').hide();
			$('.editor-manager-section').eq(0).show();
		}
	},'.editor-manager-cancel');
});