<?php
// Written by Shea Yuin Ng
// Created 18 April 2013 
// To delete students from lecturer's unit

// Resume session from previous session
session_start();

// Connect to mySQL
include('connections.php');

// Get username from session variable
$uname = $_SESSION['uname'];
$unit_chosen = $_SESSION['unit_chosen'];
$unit_name = $_SESSION['unit_name'];
$list = $_POST['list'];

$stud_uname = explode(',', $list);
$j = count($stud_uname);

for ($i=0; $i<$j; $i++){
	//Access the student list of the unit
	$database_name = $unit_chosen.'_'.$uname;
	mysql_select_db($database_name,$dbcon) or die("Cannot select unit database!");
	
	// Delete the unit from the list of units
	$sql="DELETE FROM student_list WHERE  username='$stud_uname[$i]'";
	$r = mysql_query($sql) or die("Unit cannot be deleted!!");
	
	// Check if there is a same unit of different lecturers has the same student in units
	// Connect to main database
	mysql_select_db("main_database",$dbcon) or die("Cannot select database!");

	// Check if another unit have the same unit code in units
	$query=mysql_query("SELECT * FROM units WHERE unit_code = '$unit_chosen'")or die("Cannot access table!");
	
	//If no, 
	if(mysql_affected_rows()==1){// if 1 means it is the current unit
		$get_details="SELECT * FROM students WHERE username = '$stud_uname[$i]'";
		
		//Search for the unit code
		// Get ID of the array
		$query_details = mysql_query($get_details)  or die("Cannot query details!!");
		// Get the whole row of information of the user
		$fetch_details = mysql_fetch_array($query_details) or die("Cannot fetch details!!");
		// Extract 'unit1','unit2','unit3','unit4' and 'unit5' field from the array
		$unit1 = $fetch_details['unit1'];
		$unit2 = $fetch_details['unit2'];
		$unit3 = $fetch_details['unit3'];
		$unit4 = $fetch_details['unit4'];
		$unit5 = $fetch_details['unit5'];
		
		// Delete unit code from the record of what units the students are taking
		if($unit1 == $unit_chosen){
			mysql_query("UPDATE students SET unit1 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
		}
		elseif($unit2 == $unit_chosen){
			mysql_query("UPDATE students SET unit2 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
		}
		elseif($unit3 == $unit_chosen){
			mysql_query("UPDATE students SET unit3 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
		}
		elseif($unit4 == $unit_chosen){
			mysql_query("UPDATE students SET unit4 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
		}
		elseif($unit5 == $unit_chosen){
			mysql_query("UPDATE students SET unit5 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
		}
		else{
			echo("Error");
		}	
	}//main if
	else{
		// Get the lecturer's name/s
		$k=0;
		 while ($row = mysql_fetch_array($query)) {
			// Get lecturer's name
			$lecturer[$k] = $row['lecturer'] ;
			$k++;
		}
		
		$flag = 0;

		for ($l=0; $l<$k; $l++){
			$lecturer_uname = $lecturer[$l];
			
			$database_name2 = $unit_chosen.'_'.$lecturer_uname;
			mysql_select_db($database_name2,$dbcon) or die("Cannot select unit database!");
			$query_stud_list=mysql_query("SELECT * FROM student_list WHERE username = '$stud_uname[$i]'")or die("Cannot access table!");
			
			//Check if student's name in the unit's student list		
			if(mysql_affected_rows()!=0){
				$flag = 1;
			}
		}

		//If no
		if($flag == 0)
		{	
			//Access students in main database
			mysql_select_db("main_database",$dbcon) or die("Cannot select database!");
			$get_details="SELECT * FROM students WHERE username = '$stud_uname[$i]'";
			
			//Search for the unit code
			// Get ID of the array
			$query_details = mysql_query($get_details)  or die("Cannot query details!!");
			// Get the whole row of information of the user
			$fetch_details = mysql_fetch_array($query_details) or die("Cannot fetch details!!");
			// Extract 'unit1','unit2','unit3','unit4' and 'unit5' field from the array
			$unit1 = $fetch_details['unit1'];
			$unit2 = $fetch_details['unit2'];
			$unit3 = $fetch_details['unit3'];
			$unit4 = $fetch_details['unit4'];
			$unit5 = $fetch_details['unit5'];
			
			// Delete unit code from the record of what units the students are taking
			if($unit1 == $unit_chosen){
				mysql_query("UPDATE students SET unit1 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
			}
			elseif($unit2 == $unit_chosen){
				mysql_query("UPDATE students SET unit2 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
			}
			elseif($unit3 == $unit_chosen){
				mysql_query("UPDATE students SET unit3 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
			}
			elseif($unit4 == $unit_chosen){
				mysql_query("UPDATE students SET unit4 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
			}
			elseif($unit5 == $unit_chosen){
				mysql_query("UPDATE students SET unit5 = '' WHERE username='$stud_uname[$i]'") or die("Cannot delete the unit from student!!");
			}
			else{
				echo("Error");
			}
		}
	}//main if
}//for every student
?>