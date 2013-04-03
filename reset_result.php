<?php
// Written by Shea Yuin Ng
// Created 3 April 2013
// To reset the results from students

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];
$unit_name = $_SESSION['unit_name'];
$id = $_SESSION['id'];

// Create database for the unit to hold sessions
$database_name = $unit_code.'_'.$uname;
	
// Select database to connect
mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

// Create table of the unit added in main database to insert list of students
//mysql_query("CREATE TABLE $table_name (lec_ques VARCHAR(30), uscale TINYINT(1))")  or die("Unit table cannot be added!!");
$table_name='q_'.$id;	
mysql_query("UPDATE $table_name SET mcq_answer='0'")  or die("Answer not updated!!");

// Send info back to JS
echo $unit_code.'_'.$id;

// Close connection to mySOL
mysql_close($dbcon);
?>