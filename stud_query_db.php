<?php
// Written by Shea Yuin Ng
// Created 27 March 2013
// For student to get the question from database

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$lec_uname = $_SESSION['lec_uname'];
$unit_code = $_SESSION['unit_chosen'];

// Create database for the unit to hold sessions
$database_name = $unit_code.'_'.$lec_uname;
	
// Select database to connect
mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

// Check whether the username for the unit already existed
$sql="SELECT * FROM current_lecques";
$r = mysql_query($sql);

// If error in selecting table
if(!$r) {
	$err=mysql_error();
	print $err;
	exit();
}

if(mysql_affected_rows()==0){//no units exist in database
	// Output data in XML format
	header("Content-type: text/xml"); //Declare saving data in XML form
	echo '<?xml version="1.0" encoding="utf-8"?>'; // Print XML tag
	echo "<QuesList>"; //Top root directory
	echo "<Ques>";
	echo "<Question>0</Question>";
	echo "<A>0</A>";
	echo "<B>0</B>";
	echo "<C>0</C>";
	echo "<D>0</D>";
	echo "</Ques>";
	echo "</QuesList>";
}
else{
	// Output data in XML format
	header("Content-type: text/xml"); //Declare saving data in XML form
	echo '<?xml version="1.0" encoding="utf-8"?>'; // Print XML tag
	echo "<QuesList>"; //Top root directory
	$current_ques = mysql_fetch_array($r);
	//Get each element
	$lec_ques = $current_ques["lec_ques"];
	$A = $current_ques["A"];
	$B = $current_ques["B"];
	$C = $current_ques["C"];
	$D = $current_ques["D"];
	
	// Print each element in XML
	echo "<Ques>";
	echo "<Question>$lec_ques</Question>";
	echo "<A>$A</A>";
	echo "<B>$B</B>";
	echo "<C>$C</C>";
	echo "<D>$D</D>";
	echo "</Ques>";
	echo "</QuesList>";
}

// Close connection to mySOL
mysql_close($dbcon);
?>