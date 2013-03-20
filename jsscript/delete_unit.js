// Written by Shea Yuin Ng
// Created 11 September 2012
// To delete unit 

$('#delete_unitsubmit').live('click',function(){

	//Pop-up to ask if really want to delete unit
	var answer = confirm ("Are you sure you want to delete this unit?")
	if (answer)
	  	//use jquery ajax to post data to php server
		$.ajax({
			//url: "http://syngtest.myproject/delete_unit.php",
			url: "http://118.138.154.21/delete_unit.php",
			type: 'post',
			success: function (result) {
			//results sent by PHP

				alert(result);
				$.mobile.changePage($(document.location.href="view_unitpage.html"), "slideup");
				 
			},
			error: function(){	
			alert('There was an error deleting unit');	
			}
			
		});
  	return false;
});