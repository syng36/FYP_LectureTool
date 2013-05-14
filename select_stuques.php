<?php
// Written by Shea Yuin Ng
// Created 3 May 2013
// For both lecturers and students to choose which students' question to view

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get question from lecturer
$id = $_POST['ques_chosen'];// holds the id number of the ques

// Save id in session variable
$_SESSION['stu_ques_chosen'] = $id;

?>