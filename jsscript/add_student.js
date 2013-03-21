//Written by Shea Yuin Ng
//Date:18/1/13
 
$('#add_student_submit').live('click',function(){
	
	// get student's username
	var stud_name = $('#stud_name').val();
  	if (!stud_name) { alert('Please enter a username.'); return false; }
	
	//get student's first name
	var fname = $('#fname').val();
  	if (!fname) { alert('Please enter a first name.'); return false; }
	
	//get student's last name
	var lname = $('#lname').val();
  	if (!lname) { alert('Please enter a last name.'); return false; }
	
	//get student's email
	var email = $('#email').val();
  	if (!email) { alert('Please enter email address.'); return false; }
	
	//get student's status
  	var status = $('#status').val();
  
  	//use jquery ajax to post data to php server
  	$.ajax({
      	//url: "http://syngtest.myproject/add_student.php",
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
				
			$("#stud_name").val('');
			$("#fname").val('');
			$("#lname").val('');
			$("#email").val('');
		},
      	error: function(){	
			alert('There was an error adding student');	
		}
		
  	});
  	return false;
});