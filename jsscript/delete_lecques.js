// Written by Shea Yuin Ng
// Created 6 May 2013
// To list the students taking the unit

// Use jquery ajax to get data from php server
$.ajax({
	url: "view_queslist.php",
	type: 'post',
	dataType: "xml",  
	success: function (xml) {
		
		var counter = 1;
		
		// Read xml file
		$(xml).find('Ques').each(function(){ 
			var id = $(this).find('ID').text(); 
			var ques = $(this).find('Question').text(); 		
			
			if (ques== "0"){// means there's no units registered for the lecturer
				// Empty list, show this msg
				$("#msg").text('No questions found!!');
			}
			else{// list the units in an unordered list
				$("#msg").text('Question List');	
				$("tbody").append('<tr><td align="center"><input type="checkbox" class="cbox" id="'+id+'"/></td><td>'+counter+'</td><td>'+ques+'</td></tr>');
				counter = counter+1;
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

// Select all functionality
$(document).on('click',"#selectall",function(){
	  $('.cbox').prop('checked', true);
});

// Unselect all funtionality
$(document).on('click',"#unselectall",function(){
	  $('.cbox').prop('checked', false);
});

// Select all functionality
$(document).on('click',"#delete_lecques",function(){
	var List = [];
	$(':checkbox:checked').each(function(i){
		name = $(this).prop('id');
		name = escape(name);
		name = name.replace(/\+/g, "%2B");
		List[i] = name;
    });
	
	if(List != ""){
		$.ajax({
			url: "delete_lecques.php",
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
			alert('There was an error deleting question');	
			}
			
		});
	}
	else
	alert("No question selected!");
});
