<?php
// Written by Shea Yuin Ng
// Created 18 September 2012
// For both lecturers and students to choose a unit

// Resume session from previous session
session_start();

// Save unit selected in session variable
$unit_chosen = $_POST['unit_chosen'];
$status = $_SESSION['status'];

if ($status=="S"){
	// Split the data into lines to determine the number of students
	$data = explode("_", $unit_chosen);
	// Save unit selected and the lecturer in session variable
	$_SESSION['unit_chosen'] = $data[0];
	$_SESSION['lec_uname'] = $data[1];
}
else{
	// Save unit selected in session variable
	$_SESSION['unit_chosen'] = $unit_chosen;
}
// Send status to JS to determine page change 
echo $status;

?>