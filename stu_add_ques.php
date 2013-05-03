<?php
// Written by Shea Yuin Ng
// Created 2 May 2013
// For students to save questions into the database to ask lecturers

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

//Get question from students
$ques_title = $_POST['ques_title'];
$question = $_POST['question'];

// Enable saving special characters
$ques_title = mysql_real_escape_string($ques_title);
$question = mysql_real_escape_string($question);

// Get username and unit code from session variable
$lec_uname = $_SESSION['lec_uname'];
$unit_code = $_SESSION['unit_chosen'];

// Select database to connect
$database_name = $unit_code.'_'.$lec_uname;
mysql_select_db("$database_name",$dbcon) or die("Cannot select database for unit!");

// Insert question into table
mysql_query("INSERT INTO students_ques(title, stu_ques, votes) VALUES('$ques_title','$question','0')")  or die("Question cannot be added!!");

// Close connection to mySOL
mysql_close($dbcon);
?>