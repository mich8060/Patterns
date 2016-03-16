<?php 
    include_once('libraries/template.php');
    include_once('libraries/functions.php');
    include_once('libraries/dom.php');
    $template = new Template;
    $filename = basename($_SERVER["REQUEST_URI"]);
	if(strpos($filename,'.php') !== false){
		ob_start();
		include('pages/'.$filename);
		$source .= ob_get_contents();
		ob_end_clean();
	}else{	
    	$source = file_get_contents('pages/'.$filename);
	}
    $html = str_get_html($source);
    
    /* Pre Tags Prettifying Format */
    if($html->find('pre')){
        $preformatted = $html->find('pre');
        foreach($preformatted as $item){
            $item->innertext = $template->preformat($item->innertext);
        }
    }
    
    /* Header */
    if($html->find('header')){
        $header = $html->find('header');
        foreach($header as $h){
            $h->outertext = $template->header($h);
        }
    }
    
    /* Main Navigation */
    if($html->find('nav')){
        $nav = $html->find('nav');
        foreach($nav as $n){
            /* Pull the dropdowns */
            $navigation = $template->nav($n);
            $nav = str_get_html($navigation);
            if($nav->find('dropdown')){
                $dropdown = $nav->find('dropdown');
                foreach($dropdown as $d){
                    $d->outertext = $template->dropdown($d);
                }
            }
                    
            $n->outertext = $nav;
        }
        
    }

    /* Footer */
    if($html->find('footer')){
        $footer = $html->find('footer');
        foreach($footer as $f){
            $f->outertext = $template->footer($f);
        }
        
    }
    
    /* Menu */
    if($html->find('menu')){
        $menu = $html->find('menu');
        foreach($menu as $m){
            $m->outertext = $template->menu($m);
        }
    }
    
    /* Group Listing */
    if($html->find('.group-listing-card')){
        $group = $html->find('.group-listing-card');
        foreach($group as $item){
            $item->outertext = $template->group_listing_card($item);
        }
    }
    
    /* Product Listing */
    if($html->find('.listing')){
        $listing = $html->find('.listing');
        foreach($listing as $item){
            if(!trim($item->innertext)){
                if(isset($item->attr['sku'])){
                    $item->outertext = $template->listing($item);
                }elseif(isset($l->attr['term'])){
                    $item->outertext = '{{Search Results}}';
                }
            }
        }
    }
    
    echo $html;
    $html->clear(); 
    unset($html);
?>