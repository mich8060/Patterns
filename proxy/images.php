<?php

	$file = 'http://www.domain.com/somefile.jpg';
	$file_headers = @get_headers($file);
	if($file_headers[0] == 'HTTP/1.1 404 Not Found') {
	    return false;
	}else{
	    return true;
	}

?>