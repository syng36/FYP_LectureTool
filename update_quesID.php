<?php
// Written by Shea Yuin Ng
// Created 27 March 2013
// To update the question ID for the question received

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username, unit code and unit name from session variable
$id = $_POST['id'];
$_SESSION['id'] = $id;

?>