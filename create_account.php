<?php
// Written by Shea Yuin Ng
// Created 20 September 2012
// To insert data into database to create account

// Connect to mySQL
include('connections.php');
	
// Get username, password, first name, last name, email and status from form
$uname = $_POST['uname'];
$pswd = $_POST['pswd'];
$pswd = md5($pswd);
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$status = $_POST['status'];

// Select database to connect
mysql_select_db("main_database",$dbcon) or die("Cannot select database!");
	
// Check whether the username already existed
$sql="SELECT username FROM account WHERE username = '$uname'";
$r = mysql_query($sql);
	
// If error in selecting table
if(!$r) {
$err=mysql_error();
print $err;
exit();
}
	
// If username not used before
if(mysql_affected_rows()==0){//no username exist in database
	// Insert username and password into database
	mysql_query("INSERT INTO account(username, password, first_name, last_name, status, email) VALUES('$uname','$pswd','$fname','$lname','$status','$email')")  or die("Account not created!!");
	echo('1');// Represent success
}
else{
	echo('Account existed!');// Represents failure
}

// Close connection to mySOL
mysql_close($dbcon);
?>