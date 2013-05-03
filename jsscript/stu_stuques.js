// Written by Shea Yuin Ng
// Created 3 May 2013
// Student view the questions from students

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

$(document).on('click','#vote',function(){
	  	
	$.ajax({
		url: "vote.php",
      	type: 'post',
      	success: function (data) {
			$("#numOfVotes").html('Total Number of Votes: '+data);
		},
      	error: function(){	
      	alert('There was an error selecting the unit');	
		}
  	});
});

