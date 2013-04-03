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
				$("#stud_list").append('<tr><td>'+counter+'</td><td>'+stud_uname+'</td><td>'+stud_fname+'</td><td>'+stud_lname+'</td></tr>');
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

})
