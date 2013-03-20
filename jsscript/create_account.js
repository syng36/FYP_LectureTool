// Written by Shea Yuin Ng
// Created 20 September 2012
// To create account for lecturers

$('#create_account_submit').live('click',function(){

	//get username
	var uname = $('#uname').val();
  	if (!uname) { alert('Please enter your user name.'); return false; }
  	
  	//get password
  	var pswd = $('#pswd').val();
  	if (!pswd) { alert('Please enter your password.'); return false; }
	
	//get first name
  	var fname = $('#fname').val();
  	if (!fname) { alert('Please enter your first name.'); return false; }
	
	//get last name
  	var lname = $('#lname').val();
  	if (!lname) { alert('Please enter your last name.'); return false; }
	
	//get email
  	var email = $('#email').val();
  	if (!email) { alert('Please enter your email address.'); return false; }
	
	//get status
  	var status = $('#status').val();
	console.log(status);
  
  	//use jquery ajax to post data to php server
  	$.ajax({
      	//url: "http://syngtest.myproject/create_account.php",
		url: "create_account.php",
      	type: 'post',
      	data: 'uname='+uname+'&pswd='+pswd+'&fname='+fname+'&lname='+lname+'&status='+status+'&email='+email,
      	success: function (result) {
      	//results sent by PHP
      	//$(".puname").text(uname);
      	if (result=="1"){
			alert('Account successfully created. You may login now.=)');
       		$.mobile.changePage($(document.location.href="index.html"), "slideup");
       	}
       	else{
			alert(result);
       		$.mobile.changePage("#create_accountpage", "slideup");
       	}	 
		},
      	error: function(){	
      	alert('There was an error in creating account');	
		}
		
  	});
  	return false;
});