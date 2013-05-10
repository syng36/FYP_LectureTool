// Written by Shea Yuin Ng
// Created 22 March 2013
// To list the questions added by lecturers

// Use jquery ajax to get data from php server
$.ajax({
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
			} 
		})
	},  
	complete:function(){
		$("#lecturer_queslist").listview('refresh');
	},
	error: function() {  
		alert("Please log in!");
		$.mobile.changePage($(document.location.href="index.html"), "slideup");  
	}  
})// ajax
