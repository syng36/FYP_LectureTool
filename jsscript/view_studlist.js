// Written by Shea Yuin Ng
// Created 3 April 2013
// To list the students taking the unit

// Use jquery ajax to get data from php server
$.ajax({
	//url: "http://syngtest.myproject/view_studlist.php",
	url: "view_studlist.php",
	type: 'post',
	dataType: "xml",  
	success: function (xml) {
		
		var counter = 1;

		// Read xml file
		$(xml).find('Student').each(function(){ 
			var stud_uname = $(this).find('Username').text(); 
			var stud_fname = $(this).find('FirstName').text(); 
			var stud_lname = $(this).find('LastName').text(); 			

			if (stud_uname== "0"){// means there's no students
				// Empty table, show this msg
				$("#msg").text('No student found!!');
			}
			else{// list the students in a table format
				$("#msg").text('Student List');	
				$("tbody").append('<tr><td align="center"><input type="checkbox" class="cbox" id="'+stud_uname+'"/></td><td>'+counter+'</td><td>'+stud_uname+'</td><td>'+stud_fname+'</td><td>'+stud_lname+'</td></tr>');
				counter = counter+1;
			}
		})
		//$.mobile.changePage("#view_unitpage", "slideup");
	},  
	complete:function(){
		//$("#lecturer_queslist").listview();
		$("#stud_list").listview('refresh');
	},
	error: function() {  
		alert("An error occurred while processing XML file.");  
	}  

});

// Select all functionality
$(document).on('click',"#selectall",function(){
	  $('.cbox').prop('checked', true);
});

// Unselect all funtionality
$(document).on('click',"#unselectall",function(){
	  $('.cbox').prop('checked', false);
});

// Select all functionality
$(document).on('click',"#delete_stud",function(){
	var List = [];
	$(':checkbox:checked').each(function(i){
		List[i] = $(this).prop('id');
    });
	
	if(List != ""){
		$.ajax({
			//url: "http://syngtest.myproject/delete_stud.php",
			url: "delete_stud.php",
			type: 'post',
			data: 'list='+List,
			success: function (result) {
				//results sent by PHP
				if (result==""){
					location.reload(true);
				}
				else
				alert(result);
			},
			error: function(){	
			alert('There was an error deleting students');	
			}
			
		});
	}
	else
	alert("No students selected!");
});
