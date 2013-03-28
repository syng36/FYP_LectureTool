<?php
// Written by Shea Yuin Ng
// Created 22 March 2013
// To view questions added by lecturer

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];

// Create database for the unit to hold sessions
$database_name = $unit_code.'_'.$uname;
	
// Select database to connect
mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

// Check whether the username for the unit already existed
$sql="SELECT id,lec_ques FROM lecturer_ques";
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
	echo "<ID>0</ID>";
	echo "<Question>0</Question>";
	echo "</Ques>";
	echo "</QuesList>";
}
else{
	// Output data in XML format
	header("Content-type: text/xml"); //Declare saving data in XML form
	echo '<?xml version="1.0" encoding="utf-8"?>'; // Print XML tag
	echo "<QuesList>"; //Top root directory
	while($row = mysql_fetch_array($r,MYSQL_ASSOC)){
		//Get each element
		$id = $row["id"];
		$lec_ques = $row["lec_ques"];
		
		// Print each element in XML
		echo "<Ques>";
		echo "<ID>$id</ID>";
		echo "<Question>$lec_ques</Question>";
		echo "</Ques>";
	}
	echo "</QuesList>";
}

// Close connection to mySOL
mysql_close($dbcon);
?>