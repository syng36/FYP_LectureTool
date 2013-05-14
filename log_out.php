<?php
// Written by Shea Yuin Ng
// Created 11 September 2012
// To logout

// Resume session from previous session
session_start();

// Destroy session when logging out
session_destroy();

echo("Log out successful");
?>