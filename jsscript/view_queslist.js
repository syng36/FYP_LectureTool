// Written by Shea Yuin Ng
// Created 22 March 2013
// To list the questions added by lecturers

// Use jquery ajax to get data from php server
$.ajax({
	//url: "http://syngtest.myproject/view_queslist.php",
	url: "view_queslist.php",
	type: 'post',
	dataType: "xml",  
	success: function (xml) {
		
		// Read xml file
		$(xml).find('Ques').each(function(){ 
			var id = $(this).find('ID').text(); 
			var ques = $(this).find('Question').text(); 		
			
			if (ques== "0"){// means there's no units registered for the lecturer
				// Empty list, show this msg
				$("#msg").text('No questions found!!');
			}
			else{// list the units in an unordered list
				$("#msg").text('Please choose a question');	
				$("#lecturer_queslist").append('<li class="chooseques" data-name="'+id+'"><a href="#">'+ques+'</a></li>');
				//console.log ('<li class="chooseques" data-name="'+id+'"><a href="#">'+ques+'</a></li>');
			} 
		})
		//$.mobile.changePage("#view_unitpage", "slideup");
	},  
	complete:function(){
		//$("#lecturer_queslist").listview();
		$("#lecturer_queslist").listview('refresh');
	},
	error: function() {  
		alert("An error occurred while processing XML file.");  
	}  

})
