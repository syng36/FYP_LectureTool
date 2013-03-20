<?php
// Written by Shea Yuin Ng
// Created 11 October 2012
// To save question into database to create account

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

//Get question from lecturer
$lec_ques = $_POST['lec_ques'];
$A = $_POST['A'];
$B = $_POST['B'];
$C = $_POST['C'];
$D = $_POST['D'];
//$ip = $_SERVER['REMOTE_ADDR'];

// Enable saving special characters
$lec_ques = mysql_real_escape_string($lec_ques);
$A = mysql_real_escape_string($A);
$B = mysql_real_escape_string($B);
$C = mysql_real_escape_string($C);
$D = mysql_real_escape_string($D);


// Get username from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];

// Select database to connect
$database_name = $unit_code.'_'.$uname;
mysql_select_db("$database_name",$dbcon) or die("Cannot select database for unit!");

// Insert question into table
mysql_query("INSERT INTO lecturer_ques(lec_ques, A, B, C, D, cntA, cntB, cntC,cntD) VALUES('$lec_ques','$A','$B','$C','$D',0,0,0,0)")  or die("Unit cannot be added!!");
mysql_query("UPDATE participant SET mcq_answer = 0")  or die("Unit cannot be added!!");

// Close connection to mySOL
mysql_close($dbcon);
?>