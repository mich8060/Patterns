<?php

class Template {
    
    private function service($url){
        $options = array(
            'http'=>array(
                'method'=>"GET",
                'header'=>"User-Agent: Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.102011-10-16 20:23:10\r\n" 
            )
        );
        $context = stream_context_create($options);
        return json_decode(file_get_contents($url,false,$context));
    }
    
    public function dropdown($item){
        $template = $item->attr['template'];
        return $this->compile('modules/dropdowns/'.$template.'.php',null);
    }

	public function footer() {
		return $this->compile('modules/footer.php',null);
	}
    
    public function header(){
        return $this->compile('modules/header.php',null);
    }
    
    public function menu(){
        return $this->compile('modules/menu.php',null);
    }
    
    public function nav(){
        return $this->compile('modules/nav.php',null);
    }
    
    public function preformat($item){
        $item = str_replace("<", "&lt;", $item);
        $item = str_replace(">", "&gt;", $item);
        return $item;
    }
    
    public function group_listing_card($item){
        $data = array(
            "title"         => $item->attr['title'],
            "description"   => $item->attr['description'],
            "image"         => $item->attr['image']
        );
        return $this->compile('modules/group_listing_card.php', $data);
    }
    
    public function listing($item){
        $sku = $item->attr['sku'];
        
        if($item->attr['cache']){
            $filename = './cache/'.$sku.'.json';
            if(file_exists($filename)) {
                $data = get_object_vars(json_decode(file_get_contents($filename)));
            }else{
                $file = fopen($filename, "w");
                $json = $this->service("http://api.backcountry.com/v1/products/".$item->attr['sku']."?site=bcs&fields=id,title,skus,brand.name,customerReviews,listPrice,tags");
                $data = array(
                    "href"          => $item->attr['href'],
                    "classes"       => $item->attr['class'],
                    "sku"           => $sku,
                    "brand"         => $json->products[0]->brand->name,
                    "title"         => $json->products[0]->title,
                    "image"         => 'http://content.backcountry.com'.$json->products[0]->skus[0]->image->url,
                    "reviews"       => $json->products[0]->customerReviews->average,
                    "listPrice"     => '$'.$json->metadata->productSummary->$sku->listPrice->max,
                    "salePrice"     => '$'.$json->metadata->productSummary->$sku->salePrice->min,
                    "discount"      => $json->metadata->productSummary->$sku->discountPercent->max.'% off',
                    "exclusives"    => '',
                );
                fwrite($file,json_encode($data));
                fclose($file);
            }
        }else{
            $json = $this->service("http://api.backcountry.com/v1/products/".$item->attr['sku']."?site=bcs&fields=id,title,skus,brand.name,customerReviews,listPrice,tags");
            $data = array(
                "href"          => $item->attr['href'],
                "classes"       => $item->attr['class'],
                "sku"           => $sku,
                "brand"         => $json->products[0]->brand->name,
                "title"         => $json->products[0]->title,
                "image"         => 'http://content.backcountry.com'.$json->products[0]->skus[0]->image->url,
                "reviews"       => $json->products[0]->customerReviews->average,
                "listPrice"     => '$'.$json->metadata->productSummary->$sku->listPrice->max,
                "salePrice"     => '$'.$json->metadata->productSummary->$sku->salePrice->min,
                "discount"      => $json->metadata->productSummary->$sku->discountPercent->max.'% off',
                "exclusives"    => '',
            );
        }
        

        
        if($data['listPrice'] == $data['salePrice']){ $data['salePrice'] = ''; }
        if($data['discount'] == '0% off'){ $data['discount'] = ''; }
        //if(isset($json->products[0]->tags)){ $data['exclusives'] = $json->products[0]->tags[0]; }
        
        return $this->compile('modules/listing.php', $data);
    }
    
    private function compile($file, $data) {
        $file = "./libraries/".$file;
        if(file_exists($file)){
            $output = file_get_contents($file);
            if(isset($data)){
                foreach($data as $key => $value){
                    $tags = "{".$key."}";
                    $output = str_replace($tags, $value, $output);
                }
            }
            return $output;
        }
    }
}

?>