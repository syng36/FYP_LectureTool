<?php
// Written by Shea Yuin Ng
// Created 11 September 2012
// To get username through IP address

// Resume session from previous session
session_start();

// Get first name from session variable
$fname = $_SESSION['fname'];

// Reply http post with first name
echo($fname);
?>