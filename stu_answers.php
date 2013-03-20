<?php
// Written by Shea Yuin Ng
// Created 22 October 2012
// To save the answers from students

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];
$unit_name = $_SESSION['unit_name'];
$lec_uname = $_SESSION['lec_uname'];

// Get student's answer
$stumcqanswer = $_POST['stumcqanswer'];

////////Check whether have a list of students before start session

// Create database for the unit to hold sessions
$database_name = $unit_code.'_'.$lec_uname;
	
// Select database to connect
mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

// Create table of the unit added in main database to insert list of students
//mysql_query("CREATE TABLE $table_name (lec_ques VARCHAR(30), uscale TINYINT(1))")  or die("Unit table cannot be added!!");
	
mysql_query("UPDATE participant SET mcq_answer='$stumcqanswer' WHERE username='$uname'")  or die("Answer not updated!!");


// Close connection to mySOL
mysql_close($dbcon);
?>