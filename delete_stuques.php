<?php
// Written by Shea Yuin Ng
// Created 3 May 2013 
// To delete students from lecturer's unit

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username from session variable
$uname = $_SESSION['uname'];
$unit_chosen = $_SESSION['unit_chosen'];
$unit_name = $_SESSION['unit_name'];
$list = $_POST['list'];

$qid= explode(',', $list);
$j = count($qid);

for ($i=0; $i<$j; $i++){
	//Access the student list of the unit
	$database_name = $unit_chosen.'_'.$uname;
	mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");
	
	mysql_query("DELETE FROM students_ques WHERE  id='$qid[$i]'") or die("Question cannot be deleted!!");
	
}//for every question
?>