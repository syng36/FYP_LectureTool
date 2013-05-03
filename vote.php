<?php
// Written by Shea Yuin Ng
// Created 26 April 2013
// To reset the u-scale response from students

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$lec_uname = $_SESSION['lec_uname'];
$unit_code = $_SESSION['unit_chosen'];
$id = $_SESSION['stu_ques_chosen'];

// Create database for the unit to hold sessions
$database_name = $unit_code.'_'.$lec_uname;
	
// Select database to connect
mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

// Add one to number of vote
$r = mysql_query("SELECT * FROM students_ques WHERE id = '$id'") or die("Cannot query student's question!");
$stu_ques = mysql_fetch_array($r);
//Get each element
$votes = htmlspecialchars($stu_ques["votes"]);
$votes = $votes + 1;
mysql_query("UPDATE students_ques SET votes='$votes' WHERE id = '$id'")  or die("Answer not updated!!");

// Send info back to JS
echo $votes;

// Close connection to mySOL
mysql_close($dbcon);
?>