<?php

$EMAIL_ID = 385362101; // 9-digit integer value (i.e., 123456789)

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE
function authenticateUser($username, $password)
{
	$arr = validateUser($username, $password);
	//print_r(array_values($arr));

	if(isset($arr)){
		session_start();
		$_SESSION["userId"] = $arr[0];
		$_SESSION["displayName"] = $arr[1];
		$_SESSION["emailAddress"] = $arr[2];
		header("location: ./index.php");
		exit();
		return true;
	} else {
		displayLoginForm("Invalid username or password. Please try again");
		return false;
	}
}

function displayLoginForm($message = "")
{
	require_once ("./templates/logon_form.html");
}

function processPageRequest()
{
	if(!empty($_POST) && $_POST["action"] == "login")
		authenticateUser($_POST["username"], $_POST["password"]);
	else
		displayLoginForm();
	// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE BELOW THIS LINE
	if(session_status() == PHP_SESSION_ACTIVE)
	{
		session_destroy();
	}
	// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE
}

?>
