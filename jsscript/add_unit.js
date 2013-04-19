// Written by Shea Yuin Ng
// Created 4 September 2012
// To add units into database

//$('#add_unit_submit').live('click',function(){
$(document).on('click','#add_unit_submit', function(){
	
	//get unit code
	var unit_code = $('#unit_code').val();
  	if (!unit_code) { alert('Please enter a unit code.'); return false; }
  	
  	//get unit name
  	var unit_name = $('#unit_name').val();
  	if (!unit_name) { alert('Please enter a unit name.'); return false; }
  	
  	//var uname = $('.puname').val();
  
  	//use jquery ajax to post data to php server
  	$.ajax({
      	//url: "http://syngtest.myproject/add_unit.php",
		url: "add_unit.php",
      	type: 'post',
      	data: 'unit_code='+unit_code+'&unit_name='+unit_name,
      	success: function (result) {
      	//results sent by PHP
			if (result=="1"){
				$("#message").text("Unit added successfully.");
				
				// Clear the textboxes
				$("#unit_code").val('');
				$("#unit_name").val('');
			}
			else if (result=="0"){
				$("#message").text("Unit existed!!");
				
				// Clear the textboxes
				$("#unit_code").val('');
				$("#unit_name").val('');
			}
			else{
				alert(result);
			}	 
		},
      	error: function(){	
			alert('There was an error adding unit');	
		}
		
  	});
  	return false;
});