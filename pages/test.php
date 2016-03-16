<!DOCTYPE HTML>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<title></title>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0" />
<link rel="stylesheet" href="http://localhost:8888/patterns/css/screen.css" />
</head>
<body>
<header></header>
<nav></nav>
<main class="bg-gray-4">
	<div class="container-lg">
		<?php

			for($x = 1;$x <= 8;$x++){
				echo '<a href="#" class="listing" sku="BNG000'.$x.'"></a>';
			}
		?>
	</div>
	<div class="clear"></div>
</main>
<footer></footer>
<script src="js/jquery-1.12.0.min.js"></script>
<script src="js/jquery.bcs.js"></script>
<script src="js/jquery.prototype.js"></script>
</body>
</html>