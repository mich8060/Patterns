<?php
	include_once('../libraries/dom.php');

	//$article = 'http://www.backcountry.com/explore/winter-camping-101-gear-tips-for-staying-warm';
	$article = $_POST['article'];
	
	$options = array(
	    'http'=>array(
	        'method'=>"GET",
	        'header'=>"User-Agent: Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.102011-10-16 20:23:10\r\n" 
	    )
	);
	$context = stream_context_create($options);
	$html = file_get_html($article,false,$context);

	$data['image'] = $html->find('.blog-primary-img-cont', 0)->getAttribute('style');
	$data['image'] = str_replace("background-image: url('","",$data["image"]);
	$data['image'] = str_replace("');","",$data["image"]);
	$data['title'] = $html->find('.post-title', 0)->innertext;
	$data['description'] = $html->find('.body p', 0)->innertext;
	
	header('Content-Type: application/json');
	echo json_encode($data);

?>