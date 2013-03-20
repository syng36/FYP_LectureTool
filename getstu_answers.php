<?php
// Written by Shea Yuin Ng
// Created 22 October 2012
// To get username through IP address

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];
$unit_name = $_SESSION['unit_name'];

// Create database for the unit to hold sessions
$database_name = $unit_code.'_'.$uname;
	
// Select database to connect
mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

/*$result = mysql_query("SELECT mcq_answer, COUNT(username) FROM participant GROUP BY mcq_answer")  or die("Cannot count number of answers!!");

$counter = 1;
while($row = mysql_fetch_array($result)){
	if ($row['mcq_answer']=="btnA") 
		$cntA = $row['COUNT(username)'] ;
	if ($row['mcq_answer']=="btnB") 
		$cntB = $row['COUNT(username)'] ;
	if ($row['mcq_answer']=="btnC") 
		$cntC = $row['COUNT(username)'] ;
	if ($row['mcq_answer']=="btnD") 
		$cntD = $row['COUNT(username)'] ;
}*/
$btnA = 'btnA';
$result = mysql_query("SELECT * FROM participant WHERE mcq_answer = '$btnA'", $dbcon);
$cntA = mysql_num_rows($result); 
$btnB = 'btnB';
$result = mysql_query("SELECT * FROM participant WHERE mcq_answer = '$btnB'", $dbcon);
$cntB = mysql_num_rows($result); 
$btnC = 'btnC';
$result = mysql_query("SELECT * FROM participant WHERE mcq_answer = '$btnC'", $dbcon);
$cntC = mysql_num_rows($result); 
$btnD = 'btnD';
$result = mysql_query("SELECT * FROM participant WHERE mcq_answer = '$btnD'", $dbcon);
$cntD = mysql_num_rows($result); 

$total = $cntA+$cntB+$cntC+$cntD;
//echo $total;
// Output data in XML format
header("Content-type: text/xml"); //Declare saving data in XML form
echo '<?xml version="1.0" encoding="utf-8"?>'; // Print XML tag
echo "<MCQAnswer>"; //Top root directory

// Print each element in XML
echo "<Answer>";
echo "<CntA>$cntA</CntA>";
echo "<CntB>$cntB</CntB>";
echo "<CntC>$cntC</CntC>";
echo "<CntD>$cntD</CntD>";
echo "<Total>$total</Total>";
echo "</Answer>";
echo "</MCQAnswer>";

// Close connection to mySOL
mysql_close($dbcon);
?>