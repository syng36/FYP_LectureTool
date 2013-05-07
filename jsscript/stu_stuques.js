// Written by Shea Yuin Ng
// Created 3 May 2013
// Student view the questions from students

$.post("join_session.php", function(data){
	
	var string = data.split('_');
	var name = string[0];
	var unit_code = string[1];
	
	var socket = io.connect('http://melts.eng.monash.edu:8000');
	 
	 // at document read (runs only ones).
	 $(document).ready(function(){
		// Use jquery ajax to get data from php server
		$.ajax({
			url: "stu_ques.php",
			type: 'post',
			dataType: "xml",  
			success: function (xml) {
				
				// Read xml file
				$(xml).find('Ques').each(function(){  
					var ques_title = $(this).find('Title').text(); 
					var question = $(this).find('Question').text();
					var votenum = $(this).find('VoteNum').text();
						
					$("#ques_title").append(ques_title);
					$("#question").append(question);
					$("#numOfVotes").append('Total Number of Votes: '+votenum);

				})
			},  
			error: function() {  
			alert("An error occurred while processing XML file.");  
			}  
		});

		socket.on('updated_vote', function (data){
			if (unit_code == data.unit_code){
					$("#numOfVotes").html('Total Number of Votes: '+data.votenum);
			}// if it is the correct unit
		});//socket on receive ques
		
		// ask user to log in again if no username available.
		while (name == '') {
		   name = alert("Please log in!");
		   $.mobile.changePage($(document.location.href="index.html"), "slideup");
		}
		
		$(document).on('click','#vote',function(){
				
			$.ajax({
				url: "vote.php",
				type: 'post',
				success: function (data) {
					$("#numOfVotes").html('Total Number of Votes: '+data);
					socket.emit('updated_vote',{
						unit_code: unit_code,
						votenum: data,
					});//socket emit
				},
				error: function(){	
				alert('There was an error selecting the unit');	
				}
			});
		});
	});//document ready
});//post join_session

