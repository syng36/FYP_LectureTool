<?php
// Written by Shea Yuin Ng
// Created 22 September 2012
// To add units into lecturer's account

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];
$unit_name = $_SESSION['unit_name'];

////////Check whether have a list of students before start session

// Create database for the unit to hold sessions
$database_name = $unit_code.'_'.$uname;
	
// Select database to connect
mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

// Create table of the unit added in main database to insert list of students
//mysql_query("CREATE TABLE $table_name (lec_ques VARCHAR(30), uscale TINYINT(1))")  or die("Unit table cannot be added!!");

// Create table to save lecturer's question
mysql_query("CREATE TABLE lecturer_ques (lec_ques VARCHAR(500), A VARCHAR(500), B VARCHAR(500), C VARCHAR(500), D VARCHAR(500), cntA INT(4), cntB INT(4), cntC INT(4), cntD INT(4))")  or die("Lecturer's question table cannot be added!!");

// Close connection to mySOL
mysql_close($dbcon);
?>
