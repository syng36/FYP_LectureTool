<?php
// Written by Shea Yuin Ng
// Created 14 March 2013
// To register a student

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, first name, last name, email and status 
$stud_name = $_POST['stud_name'];
$stud_fname = $_POST['fname'];
$stud_lname = $_POST['lname'];
$stud_email = $_POST['email'];
$status = $_POST['status'];
$pswd = "12345";
$pswd = md5($pswd);

// Get username from session variable
$uname = $_SESSION['uname'];
$unit_code = $_SESSION['unit_chosen'];

// Connect to database and insert into the database
 $database_name = $unit_code.'_'.$uname;
 mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");

// Check whether the username already existed
$sql="SELECT * FROM student_list WHERE username = '$stud_name'";
$r = mysql_query($sql);

// If error in selecting table
if(!$r) {
	$err=mysql_error();
	print $err;
	exit();
}

// If student not registered
if(mysql_affected_rows()==0){//name does not exist in unit database
	mysql_query("INSERT INTO student_list(username, first_name, last_name) VALUES('$stud_name','$stud_fname','$stud_lname')")  or die("Student cannot be added!!");
	// Check main database whether name already registered
	// Connect to database and insert into the database
	mysql_select_db("main_database",$dbcon) or die("Cannot select main database!");

	// Check whether the username already existed
	$sql="SELECT * FROM account WHERE username = '$stud_name'";
	$r = mysql_query($sql);

	// If error in selecting table
	if(!$r) {
		$err=mysql_error();
		print $err;
		exit();
	}
	
	if(mysql_affected_rows()==0){// If no then add into main list of users
		mysql_query("INSERT INTO account(username, password, first_name, last_name, status, email) VALUES('$stud_name','$pswd','$stud_fname','$stud_lname','$status','$stud_email')")  or die("Account not created!!");
		mysql_query("INSERT INTO students(username, unit1, unit2, unit3, unit4, unit5) VALUES('$stud_name','$unit_code','','','','')")  or die("Account not created!!");
		echo("1");
	}
	else{// If yes then just update the units taken by student
		// Get the details of login username
		$get_details="SELECT * FROM students WHERE username = '$stud_name'";
		// Get ID of the array
		$query_details = mysql_query($get_details)  or die("Cannot query details!!");
		// Get the whole row of information of the user
		$fetch_details = mysql_fetch_array($query_details) or die("Cannot fetch details!!");
		// Extract 'unit2','unit3','unit4' and 'unit5' field from the array
		$unit2 = $fetch_details['unit2'];
		$unit3 = $fetch_details['unit3'];
		$unit4 = $fetch_details['unit4'];
		$unit5 = $fetch_details['unit5'];
		if($unit2 == ""){
			mysql_query("UPDATE students SET unit2 = '$unit_code' WHERE username='$stud_name'");
			echo("1");
		}
		elseif($unit3 == ""){
			mysql_query("UPDATE students SET unit3 = '$unit_code' WHERE username='$stud_name'");
			echo("1");
		}
		elseif($unit4 == ""){
			mysql_query("UPDATE students SET unit4 = '$unit_code' WHERE username='$stud_name'");
			echo("1");
		}
		elseif($unit5 == ""){
			mysql_query("UPDATE students SET unit5 = '$unit_code' WHERE username='$stud_name'");
			echo("1");
		}
		else{
			mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");
			mysql_query("DELETE FROM student_list WHERE  username='$stud_name'") or die("Student cannot be deleted!!");
			echo("Student exceeded the limited number of units");
		}
	}
}
else{
	echo("0");
}

// Close connection to mySOL
mysql_close($dbcon);
?>