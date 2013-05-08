// Written by Shea Yuin Ng
// Created 3 April 2013
// To list the students taking the unit

$.post("join_session.php", function(data){
//$.post("http://syngtest.myproject/join_session.php", function(data){
	
	var string = data.split('_');
	var name = string[0];
	var unit_code = string[1];
	var socket = io.connect('http://melts.eng.monash.edu:8000');
	 
	 // at document read (runs only ones).
	 $(document).ready(function(){
		// Use jquery ajax to get data from php server
		$.ajax({
			url: "stu_view_ques.php",
			type: 'post',
			dataType: "xml",  
			success: function (xml) {
				
				var counter = 1;

				// Read xml file
				$(xml).find('Ques').each(function(){ 
					var id = $(this).find('ID').text(); 
					var ques_title = $(this).find('Title').text(); 
					var numOfVotes = $(this).find('VoteNum').text(); 		

					if (ques_title== "0"){// means there's no students
						// Empty table, show this msg
						$("#msg").text('No question found!!');
					}
					else{// list the students in a table format
						$("#msg").text('Questions from Students');	
						$("tbody").append('<tr><td align="center"><input type="checkbox" class="cbox" id="'+id+'"/></td><td>'+counter+'</td><td class="chooseques" data-name="'+id+'"><a href="#">'+ques_title+'</a></td><td>'+numOfVotes+'</td></tr>');
						counter = counter+1;
					}
				})
				//$.mobile.changePage("#view_unitpage", "slideup");
			},  
			complete:function(){
				//$("#lecturer_queslist").listview();
				$("#stud_queslist").listview('refresh');
			},
			error: function() {  
				alert("An error occurred while processing XML file.");  
			}  
		});

		// When lecturer chose to view a question
		$(document).on('click','.chooseques',function(){
			var ques_chosen = $(this).attr('data-name');
			console.log(ques_chosen);
				
			$.ajax({
				//url: "http://syngtest.myproject/stu_select_ques.php",
				url: "select_stuques.php",
				type: 'post',
				data: 'ques_chosen='+ques_chosen,
				success: function (data) {
					if(status==""){
						$.mobile.changePage($(document.location.href="lec_stuques.html"), "slideup"); 
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


		// Select all functionality
		$(document).on('click',"#selectall",function(){
			  $('.cbox').prop('checked', true);
		});

		// Unselect all funtionality
		$(document).on('click',"#unselectall",function(){
			  $('.cbox').prop('checked', false);
		});

		// Select all functionality
		$(document).on('click',"#delete_studques",function(){
			var List = [];
			$(':checkbox:checked').each(function(i){
				qid = $(this).prop('id');
				List[i] = qid;
			});
			
			if(List != ""){
				$.ajax({
					url: "delete_stuques.php",
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
					alert('There was an error deleting questions');	
					}
					
				});
			}
			else
			alert("No questions selected!");
		});
		
		socket.on('stu_add_ques', function (data) {
			if (unit_code==data.unit_code){
					// Use jquery ajax to get data from php server
				$.ajax({
					url: "stu_view_ques.php",
					type: 'post',
					dataType: "xml",  
					success: function (xml) {
						
						var counter = 1;
						// Clear the table
						$("tbody").html("");
						
						// Read xml file
						$(xml).find('Ques').each(function(){ 
							var id = $(this).find('ID').text(); 
							var ques_title = $(this).find('Title').text(); 
							var numOfVotes = $(this).find('VoteNum').text(); 		

							if (ques_title== "0"){// means there's no students
								// Empty table, show this msg
								$("#msg").text('No question found!!');
							}
							else{// list the students in a table format
								$("#msg").text('Questions from Students');	
								$("tbody").append('<tr><td align="center"><input type="checkbox" class="cbox" id="'+id+'"/></td><td>'+counter+'</td><td class="chooseques" data-name="'+id+'"><a href="#">'+ques_title+'</a></td><td>'+numOfVotes+'</td></tr>');
								counter = counter+1;
							}
						})
						//$.mobile.changePage("#view_unitpage", "slideup");
					},  
					complete:function(){
						//$("#lecturer_queslist").listview();
						$("#stud_queslist").listview('refresh');
					},
					error: function() {  
						alert("An error occurred while processing XML file.");  
					}  
				});
			}
		});			
	});//document ready
});//post join_session