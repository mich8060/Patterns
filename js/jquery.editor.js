$(document).ready(function(){
	
	
	$.fn.mapDOM = function(element, json) {
		var treeObject = {};

	    // If string convert to document Node
	    if (typeof element === "string") {
	        if (window.DOMParser){
	              parser = new DOMParser();
	              docNode = parser.parseFromString(element,"text/xml");
	        }else{
	              docNode = new ActiveXObject("Microsoft.XMLDOM");
	              docNode.async = false;
	              docNode.loadXML(element); 
	        } 
	        element = docNode.firstChild;
	    }

	    //Recursively loop through DOM elements and assign properties to object
	    function treeHTML(element, object) {
	        object["type"] = element.nodeName;
	        var nodeList = element.childNodes;
	        if(nodeList != null){
	            if(nodeList.length){
	                object["content"] = [];
	                for (var i = 0; i < nodeList.length; i++) {
	                    if (nodeList[i].nodeType == 3) {
	                        object["content"].push(nodeList[i].nodeValue);
	                    } else {
	                        object["content"].push({});
	                        treeHTML(nodeList[i], object["content"][object["content"].length -1]);
	                    }
	                }
	            }
	        }
	        if(element.attributes != null) {
	            if(element.attributes.length){
	                object["attributes"] = {};
	                for (var i = 0; i < element.attributes.length; i++) {
	                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
	                }
	            }
	        }
	    }
	    treeHTML(element, treeObject);

	    var result = (json) ? JSON.stringify(treeObject) : treeObject;
			result = jQuery.parseJSON(result);
		return result;
	}
	
	$.fn.showUtilities = function(){
		$('.editor-media').removeClass('active');
		$('.editor-photo-layout').removeClass('active');
		$('figure.focused').removeClass('focused');
		$('.editor-grid').removeClass('focused')
		$('.editor-manager-publish').hide();
		$('.editor-grid-units').hide();
		$('.editor-grid-format').removeClass('active');
	}
	
	$.fn.buildGrid = function(columns){
		$el = $(this);
		$container = $('.editor-grid.focused');
		$container.removeClass('options');
		
		var num = (columns.replace("columns-", "") * 1);
		var icons = ['text','image','shop','instagram','video','look','createLink','align-left'];
		
		$('.editor-grid-format').removeClass('limited');
		if(num == 2){
			$('.editor-grid-format').addClass('limited');
		}

		for(x = 1;x <= num;x++){
			
			$box = $('<div />').attr({
				class: 'editor-grid-item '+columns,
				contenteditable: false,
			});
			
			$control = $('<div />').attr({
				class: 'editor-grid-item-control',
				contenteditable: false,
			});

			$.each(icons,function(index, value){
				$icon = $('<a />').attr({
					class: 'icons',
					href: '#',
					type: value
				});
				$control.append($icon);
			});
			
			$box.append($control);
			$container.append($box);
		}

		$('.editor-grid-format').addClass('active').css('top',($container.offset().top - 45));
	}

	$.fn.buildGridLayout = function(){
		$container = $('<div />').attr({
			class: 'editor-grid focused options',
			contenteditable: false
		});
		
		$units = $('<div />').attr({
			class: 'editor-grid-units'
		});
		
		var icons = ['columns-4','columns-3','columns-2'];
		$.each(icons,function(index, value){
			$icon = $('<a />').attr({
				class: 'icons',
				href: '#',
				type: value
			});
			$units.append($icon);
		});
		
		$container.append($units);
		$(this).before($container).removeClass('editing');
	}

	$.fn.buildArticle = function(){
		$article = $('<div />').attr({
			class: 'editor-article',
			contenteditable: false
		});
		
		$context = $('<select />').attr({
			class: 'editor-article-source',
		});
		
		$context.append('<option value="0">Please select an artice</option>')
		
		$image = $('<div />').attr({
			class: 'editor-article-image',
			contenteditable: false
		});
		
		$display = $('<div />').attr({
			class: 'editor-article-image-display',
			contenteditable: false
		}).css({
			'background-image': 'url(http://www.backcountry.com/wp-content/uploads/2016/02/fmarmsater_150313_4967.jpg)',
			'background-size':'cover',
			'background-position':'center center'
		});
		
		$text = $('<div />').attr({
			class:'editor-article-body',
			contenteditable: false
		});
		
		$icon = $('<div />').attr({
			class: 'icons',
			contenteditable: false,
			type: 'align-left'
		}).html("Article");
		
		$title = $('<h4 />').html('How to Build a Trad Rack');
		$paragraph = $('<p />').attr({
			contenteditable:true
		}).html('If you want to mix up your workout routine, we recommend finding a beach, a yoga mat, and some kettle bells. Hope you like sand!');
		
		$text.append($icon);
		$text.append($title);
		$text.append($paragraph);
		$text.append($context);
		$image.append($display);
		
		$link = $('<a />').attr({
			class: 'editor-article-more',
			contenteditable: false
		}).html('Read More');
		
		$image.append($text);
		$article.append($image);
		$article.append($link);
		
		$(this).before($article);
	}
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).addClass('focused');
			$('.editor-grid-format').addClass('active').css('top',$(this).offset().top);
		}
	},'.editor-grid');
	
	$(document).on({
		click:function(e){
			$el = $(this).parents('.editor-grid-item');
			$type = $(this).attr('type');
			switch($type){
				case 'shop':
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
					break;
				case 'image':
					$el.addClass('uploaded');
					$('.grid-photo-upload').trigger('click');
					break;
			}

		}
	},'.editor-grid-item-control a');
	
	$(document).on({
		click:function(e){
			e.preventDefault();
			$type = $(this).attr('type');
			$focused = $('.editor-grid.focused');
			$('.editor-grid.focused').removeClass('full wide');
			switch($type){
				case 'full':
					$focused.addClass('full');
					break;
				case 'wide':
					$focused.addClass('wide');
					break;
				case 'normal':
					break;
				case 'grid-stacked':
					$focused.addClass('stacked');
					$(this).attr('type','grid-unified');
					break;
				case 'grid-unified':
					$focused.removeClass('stacked');
					$(this).attr('type','grid-stacked');
					break;
			}
		}
	},'.editor-grid-format a');
	
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
		$el.removeClass('editing');
		
		$(document).on({
			keydown:function(e){
				var code = (e.keyCode ? e.keyCode : e.which);
				if(code == 13){
					e.preventDefault(); 
				}
			},
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
			$('.editing').buildGrid($(this).attr('type'));
			$('.editor-grid-units').hide();
		}
	},".editor-grid-units a");
	
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
			$figure = $('figure.focused');
			$type = $(this).attr('type');
			if($type == 'slideshow'){
				$slides = $('<div />').attr({
					class: 'editor-photo-slides'
				});
				
				for(x = 0;x <= 3;x++){
					$slide = $('<div />').attr({
						class: 'editor-photo-slide'
					});
				}
				
				$figure.find('.editor-photo-wrapper').append($slides);
			}else{
				$figure.removeClass('full left normal wide right').addClass($type);
			}
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
			});
			$wrapper = $('<div />').attr({
				class: 'editor-photo-wrapper',
				contenteditable: false
			});
			
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
				$wrapper.append($img);
				$figure.append($wrapper);
			}
			$figure.append($figcaption);
			
			$editing.before($figure);	
			$editing.removeClass('editing');
			$('.editor-photo-layout').css('top',($figure.offset().top - 40)).addClass('active');
		}
	},'.media-photo-upload:file');
		
	$(document).on({
		change:function(){
			$focused = $('.editor-grid.focused .uploaded');
			$content = $('<div />').attr({
				class: 'content'
			});
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
				$content.append($img);
			}
			$focused.html($content);	
		}
	},'.grid-photo-upload:file');
		
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
				case "italic":
					document.execCommand('italic',false,true);
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
				case "align-center":
					$('p.focused').removeClass('text-center');
					break;
				case "align-left":
					$('p.focused').addClass('text-center');
					break;
			}		
		}
	},'.editor-format a')
		
	$(document).on({
		click:function(e){
			$(this).showUtilities();
		},
		keydown:function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13){
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
				if($(pos[0].parentNode).hasClass('text-center')){
					$('.editor-format a[type="align-left"]').attr("type","align-center");
				}else{
					$('.editor-format a[type="align-center"]').attr("type","align-left");
				}
				pos[0].parentNode.removeChild(pos[0]);
				var tag = window.getSelection().focusNode.parentNode.tagName;
				if(tag != "H1" && tag != "H2" && tag != "H3"){
					$('.editor-format').css({
						left:(box.left),
						top:(box.top)
					}).addClass('active');
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
				$('.editor-media').toggleClass('active').css('top',$(this).offset().top - 30);
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
					$('.editing').buildGridLayout();
					break;
				case 'list':
					break;
				case 'align-left':
					$('.editing').buildArticle();
					break;
				case 'shop':
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
			$top = $(this).offset().top;
			$(this).addClass('focused');
			$('.editor-photo-layout').css('top',$top - 50).addClass('active');
			$('html, body').animate({
				scrollTop: $top - 100
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
	

		var initElement = $('.editor')[0];
		json = $(this).mapDOM(initElement, true);
		//console.log(JSON.stringify(json,0,2));

});