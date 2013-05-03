<?php
// Written by Shea Yuin Ng
// Created 3 May 2013
// To use session variable to determine which student's question was chosen

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username and unit code from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];
$status = $_SESSION['status'];

// Get question from lecturer
$id = $_POST['ques_chosen'];// holds the id number of the ques

// Save id in session variable
$_SESSION['stu_ques_chosen'] = $id;

// Close connection to mySOL
mysql_close($dbcon);
?>