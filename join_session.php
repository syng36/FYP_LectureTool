<?php
// Written by Shea Yuin Ng
// Created 23 October 2012
// To get the username and unit code when joining session

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];
$status = $_SESSION['status'];

if ($status=='S'){
	// Get lecturer's name
	$lec_uname = $_SESSION['lec_uname'];
	
	// Reply http post
	echo($uname.'_'.$unit_code.'_'.$lec_uname);
}
else{
	echo($uname.'_'.$unit_code);
}

?>