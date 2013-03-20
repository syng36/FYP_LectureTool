<?php
// Written by Shea Yuin Ng
// Created 19 September 2012
// To delete units from lecturer's account

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username from session variable
$uname = $_SESSION['uname'];
$unit_chosen = $_SESSION['unit_chosen'];
$unit_name = $_SESSION['unit_name'];

// Select database to connect
mysql_select_db("main_database",$dbcon) or die("Cannot select database!");

// Delete the unit from the list of units
$sql="DELETE FROM units WHERE  unit_code='$unit_chosen' and unit_name='$unit_name' and lecturer = '$uname'";
$r = mysql_query($sql) or die("Unit cannot be deleted!!");

// Drop the deleted unit's database
$database_name = $unit_chosen.'_'.$uname;
$sql = 'DROP DATABASE '.$database_name;
if (mysql_query($sql, $dbcon)) {
    echo("Unit successfully deleted!!");
} else {
    echo 'Error dropping database: ' . mysql_error() . "\n";
}
?>