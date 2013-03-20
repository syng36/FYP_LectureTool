//Written by Shea Yuin Ng
//Date:11/9/12

$('#page_logout_submit').live('click',function(){
  
  	//use jquery ajax to post data to php server
  	$.ajax({
      	//url: "http://syngtest.myproject/log_out.php",
		url: "log_out.php",
      	type: 'post',
      	success: function (result) {
      	//results sent by PHP

       		alert(result);
       		$.mobile.changePage($(document.location.href="index.html"), "slideup");
       		 
		},
      	error: function(){	
      	alert('There was an error logging out');	
		}
		
  	});
  	return false;
});