<?php
// Written by Shea Yuin Ng
// Created 23 October 2012
// To add the username to the list when joining session

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];
//$unit_name = $_SESSION['unit_name'];
$lec_uname = $_SESSION['lec_uname'];

// Create database for the unit to hold sessions
//$database_name = $unit_code.'_'.$lec_uname;
	
// Select database to connect
//mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

/*// Check the account to log in existed account in the database
$sql="SELECT username FROM participant WHERE username = '$uname'";
mysql_query($sql)or die("Cannot access table!");

// If username or password is incorrect
if(mysql_affected_rows()==0){
	// Insert question into table
	mysql_query("INSERT INTO participant(username, mcq_answer) VALUES('$uname',0)")  or die("Participant cannot be added!!");
}*/

// Reply http post with username
echo($uname.'_'.$unit_code.'_'.$lec_uname);
?>