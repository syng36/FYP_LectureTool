// Written by Shea Yuin Ng
// Created 18 January 2013
// For lecturers to add students into the student list of a unit
 
//$('#add_student_submit').live('click',function(){
$(document).on('click','#add_student_submit', function(){
	
	// get student's username
	var stud_name = $('#stud_name').val();
  	if (!stud_name) { alert('Please enter a username.'); return false; }
	stud_name = escape(stud_name);
	stud_name = stud_name.replace(/\+/g, "%2B");
	
	//get student's first name
	var fname = $('#fname').val();
  	if (!fname) { alert('Please enter a first name.'); return false; }
	fname = escape(fname);
	fname = fname.replace(/\+/g, "%2B");
	
	//get student's last name
	var lname = $('#lname').val();
  	if (!lname) { alert('Please enter a last name.'); return false; }
	lname = escape(lname);
	lname = lname.replace(/\+/g, "%2B");
	
	//get student's email
	var email = $('#email').val();
  	if (!email) { alert('Please enter email address.'); return false; }
	email = escape(email);
	email = email.replace(/\+/g, "%2B");
	
	//get student's status
  	var status = $('#status').val();
  
  	//use jquery ajax to post data to php server
  	$.ajax({
		url: "add_student.php",
      	type: 'post',
      	data: 'stud_name='+stud_name+'&fname='+fname+'&lname='+lname+'&status='+status+'&email='+email,
      	success: function (result) {
			//results sent by PHP
			if (result=="1"){
				alert("Student added successfully.");
			}
			else if (result=="0"){
				alert("Student already registered!!");
			}
			else{
				//print errors sent by PHP
				alert(result);
			}	
			
			// Clear all textboxes
			$("#stud_name").val('');
			$("#fname").val('');
			$("#lname").val('');
			$("#email").val('');
		},
      	error: function(){	
			alert('There was an error adding student');	
		}
  	});// ajax
  	return false;
});//onclick submit student button