// Written by Shea Yuin Ng
// Created 29 August 2012
// To manage log in

$('#page_login_submit').live('click',function(){

	//disable login button
	//$("#page_login_submit",this).attr("disabled","disabled");
	
	//get username
	var uname = $('#uname').val();
  	if (!uname) { alert('Please enter your user name.'); return false; }
  	
  	//get password
  	var pswd = $('#pswd').val();
  	if (!pswd) { alert('Please enter your password.'); return false; }
  
  	//use jquery ajax to post data to php server
  	$.ajax({
      	//url: "http://syngtest.myproject/log_in.php",
		url: "log_in.php",
      	type: 'post',
      	data: 'uname='+uname+'&pswd='+pswd,
      	success: function (result) {
			//results sent by PHP
			//$(".puname").text(uname);
			if (result=="S"){
				$.mobile.changePage($(document.location.href="student_homepage.html"), "slideup");
			}
			else if (result=="L"){
				$.mobile.changePage($(document.location.href="lecturer_homepage.html"), "slideup");
			}
			else{
				alert(result);
				$.mobile.changePage("#page_login", "slideup");
			}	 
		},
      	error: function(){	
      	alert('There was an error logging in');	
		}
		
  	});
  	return false;
});