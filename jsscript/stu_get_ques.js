// Written by Shea Yuin Ng
// Created 30 April 2013
// To list the questions posted by students in student's view

// Use jquery ajax to get data from php server
$.ajax({
	//url: "http://syngtest.myproject/stu_view_ques.php",
	url: "stu_view_ques.php",
	type: 'post',
	dataType: "xml",  
	success: function (xml) {
		
		// Read xml file
		$(xml).find('Ques').each(function(){ 
			var id = $(this).find('ID').text(); 
			var title = $(this).find('Title').text();
					
			if (id == "0"){// means there's no units registered for the lecturer
				// Empty list, show this msg
				$("#view_quesmsg").text('No questions found!!');
			}
			else{// list the units in an unordered list
				$("#view_quesmsg").text('Please choose a question');	
				$("#stu_queslist").append('<li class="chooseques" data-name="'+id+'"><a href="#">'+title+'</a></li>');
			} 
		})
		//$.mobile.changePage("#view_unitpage", "slideup");
	},  
	complete:function(){
		//$("#stu_queslist").listview();
		$("#stu_queslist").listview('refresh');
	},
	error: function() {  
	alert("An error occurred while processing XML file.");  
	}  

});

$(document).on('click','.chooseques',function(){
	var ques_chosen = $(this).attr('data-name');
	console.log(ques_chosen);
	  	
	$.ajax({
		url: "select_stuques.php",
      	type: 'post',
      	data: 'ques_chosen='+ques_chosen,
      	success: function (data) {
			if(data==""){
				$.mobile.changePage($(document.location.href="stu_stuques.html"), "slideup"); 
			}
			else{
				alert(data); 
			}
		},
      	error: function(){	
      	alert('There was an error selecting the unit');	
		}
  	});
});
