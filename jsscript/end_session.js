$('#end_session').live('click',function(){
	//pop-up to ensure wants to end session
	//delete all the tables and grab data
	
  	//use jquery ajax to post data to php server
  	$.ajax({
      	//url: "http://syngtest.myproject/log_out.php",
		url: "http://118.138.154.21/log_out.php",
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