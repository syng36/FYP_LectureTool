<?php
// Written by Shea Yuin Ng
// Created 18 March 2013
// To list the units taken by students

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Select database to connect
mysql_select_db("main_database",$dbcon) or die("Cannot select database!");

// Get username from session variable
$uname = $_SESSION['uname'];

// Check whether the username for the unit already existed
$sql="SELECT unit1, unit2,unit3,unit4,unit5 FROM students WHERE username = '$uname'";
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
	echo "<Units>"; //Top root directory
	echo "<Unit>";
	echo "<UnitCode>0</UnitCode>";
	echo "<UnitName>0</UnitName>";
	echo "<LecName>0</LecName>";
	echo "</Unit>";
	echo "</Units>";
}
else{
	// Output data in XML format
	header("Content-type: text/xml"); //Declare saving data in XML form
	echo '<?xml version="1.0" encoding="utf-8"?>'; // Print XML tag
	echo "<Units>"; //Top root directory

	// Get the whole row of information of the unit
	$fetch_details = mysql_fetch_array($r) or die("Cannot fetch details!!");
	//Get each element
	$unit1_code = $fetch_details["unit1"];
	$unit2_code = $fetch_details["unit2"];
	$unit3_code = $fetch_details["unit3"];
	$unit4_code = $fetch_details["unit4"];
	$unit5_code = $fetch_details["unit5"];
		
	// Get the details of unit1
	$get_details="SELECT * FROM units WHERE unit_code = '$unit1_code'";
	// Get ID of the array
	$query_details = mysql_query($get_details)  or die("Cannot query details!!");
	// Get the whole row of information of the unit
	$fetch_details = mysql_fetch_array($query_details) or die("Cannot fetch details!!");
	// Extract 'unit_name' field from the array
	$unit1_name = $fetch_details['unit_name'];
	$unit1_lecname = $fetch_details['lecturer'];

	// Print each element in XML
	echo "<Unit>";
	echo "<UnitCode>$unit1_code</UnitCode>";
	echo "<UnitName>$unit1_name</UnitName>";
	echo "<LecName>$unit1_lecname</LecName>";
	echo "</Unit>";
	
	if($unit2_code!=""){
		// Get the details of the unit
		$get_details="SELECT * FROM units WHERE unit_code = '$unit2_code'";
		// Get ID of the array
		$query_details = mysql_query($get_details)  or die("Cannot query details!!");
		// Get the whole row of information of the unit
		$fetch_details = mysql_fetch_array($query_details) or die("Cannot fetch details!!");
		// Extract 'unit_name' field from the array
		$unit2_name = $fetch_details['unit_name'];
		$unit2_lecname = $fetch_details['lecturer'];

		// Print each element in XML
		echo "<Unit>";
		echo "<UnitCode>$unit2_code</UnitCode>";
		echo "<UnitName>$unit2_name</UnitName>";
		echo "<LecName>$unit2_lecname</LecName>";
		echo "</Unit>";
	}
	
	if($unit3_code!=""){
		// Get the details of the unit
		$get_details="SELECT * FROM units WHERE unit_code = '$unit3_code'";
		// Get ID of the array
		$query_details = mysql_query($get_details)  or die("Cannot query details!!");
		// Get the whole row of information of the unit
		$fetch_details = mysql_fetch_array($query_details) or die("Cannot fetch details!!");
		// Extract 'unit_name' field from the array
		$unit3_name = $fetch_details['unit_name'];
		$unit3_lecname = $fetch_details['lecturer'];

		// Print each element in XML
		echo "<Unit>";
		echo "<UnitCode>$unit3_code</UnitCode>";
		echo "<UnitName>$unit3_name</UnitName>";
		echo "<LecName>$unit3_lecname</LecName>";
		echo "</Unit>";
	}
	
	if($unit4_code!=""){
		// Get the details of the unit
		$get_details="SELECT * FROM units WHERE unit_code = '$unit4_code'";
		// Get ID of the array
		$query_details = mysql_query($get_details)  or die("Cannot query details!!");
		// Get the whole row of information of the unit
		$fetch_details = mysql_fetch_array($query_details) or die("Cannot fetch details!!");
		// Extract 'unit_name' field from the array
		$unit4_name = $fetch_details['unit_name'];
		$unit4_lecname = $fetch_details['lecturer'];

		// Print each element in XML
		echo "<Unit>";
		echo "<UnitCode>$unit4_code</UnitCode>";
		echo "<UnitName>$unit4_name</UnitName>";
		echo "<LecName>$unit4_lecname</LecName>";
		echo "</Unit>";
	}
	
	if($unit5_code!=""){
		// Get the details of the unit
		$get_details="SELECT * FROM units WHERE unit_code = '$unit5_code'";
		// Get ID of the array
		$query_details = mysql_query($get_details)  or die("Cannot query details!!");
		// Get the whole row of information of the unit
		$fetch_details = mysql_fetch_array($query_details) or die("Cannot fetch details!!");
		// Extract 'unit_name' field from the array
		$unit5_name = $fetch_details['unit_name'];
		$unit5_lecname = $fetch_details['lecturer'];

		// Print each element in XML
		echo "<Unit>";
		echo "<UnitCode>$unit5_code</UnitCode>";
		echo "<UnitName>$unit5_name</UnitName>";
		echo "<LecName>$unit5_lecname</LecName>";
		echo "</Unit>";
	}
		
	echo "</Units>";
}

// Close connection to mySOL
mysql_close($dbcon);
?>