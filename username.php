<?php
// Written by Shea Yuin Ng
// Created 11 September 2012
// Get the first name to be printed on the page header

// Resume session from previous session
session_start();

// Get first name from session variable
$fname = $_SESSION['fname'];

// Reply http post with first name
echo($fname);
?>