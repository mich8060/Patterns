<?php
$db = array(
	'host'		=>	'localhost',
	'username'	=>	'root',
	'password'	=>	'root',
	'database'	=>	'editor'
);

// Create connection
$conn = new mysqli($db['host'], $db['username'], $db['password'], $db['database']);

// Check connection
if($conn->connect_error){
    die("Connection failed: ".$conn->connect_error);
} 

$sql = "INSERT INTO posts(post_author, post_content, post_title, post_status, post_slug, post_type) VALUES ('".$_POST['author']."','".trim($_POST['content'])."','".$_POST['title']."','draft','text-title','article')";

if($conn->query($sql) === TRUE){
    echo "New record created successfully";
}else{
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
/*
	post_id
	post_author
	post_date
	post_excerpt
	post_content
	post_title
	post_status
	post_slug
	post_type
*/

?>