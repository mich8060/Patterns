<?php
	$sku = $_GET['sku'];

	$api = "http://api.backcountry.com/mobile/products/".$sku;
	$options = array(
	    'http'=>array(
	        'method'=>"GET",
	        'header'=>"User-Agent: Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.102011-10-16 20:23:10\r\n" 
	    )
	);
	$context = stream_context_create($options);
	header('Content-Type: application/json');
	$json = file_get_contents($api,false,$context);
	echo $json;
?>