// Written by Shea Yuin Ng
// Created 16 April 2013
// To enable students to view and answer questions from lecturer

$.post("join_session.php", function(data){
//$.post("http://syngtest.myproject/join_session.php", function(data){
	
	var string = data.split('_');
	var name = string[0];
	var unit_code = string[1];
	var socket = io.connect('http://118.138.154.21:8000');
	 
	 // at document read (runs only ones).
	 $(document).ready(function(){
		
		// Query the database when student first logged in
		$.ajax({
			//url: "http://syngtest.myproject/stud_query_db.php",
			url: "stud_query_db.php",
			dataType: "xml",  
			success: function (xml) {
			//results sent by PHP	
			
				// Read xml file
				$(xml).find('Ques').each(function(){ 	
					var lec_ques = $(this).find('Question').text(); 
					var A = $(this).find('A').text();
					var B = $(this).find('B').text(); 	
					var C = $(this).find('C').text(); 	
					var D = $(this).find('D').text(); 	
					var prev_ans = $(this).find('PrevAns').text();
					
					if (lec_ques!= "0"){// means there's question posted by lecturer
						$("h1#lec_ques").html(lec_ques);
						$('#btnA').parent().find('.ui-btn-text').text(A);
						//$('#btnA').text(data.A); not working
						$('#btnB').parent().find('.ui-btn-text').text(B);
						$('#btnC').parent().find('.ui-btn-text').text(C);
						$('#btnD').parent().find('.ui-btn-text').text(D);
						
						if(prev_ans !="0"){ 
							var button = "#"+prev_ans;
							$(button).buttonMarkup({ theme: "e" });
							//$(button).attr('data-theme', 'e'); not working
						}
						// print data (jquery thing)
						$("p#data_received").append("<br />\r\n" + lec_ques + ': A.' + A+ '     B.'+ B+'     C.'+ C+'     D.'+ D);
						
						// to check messenger
						$("p#log").html('from: ' );
					}
				});				
			},
			error: function(){	
				alert('There was an error query database');	
			}
			
		});
		
		// On receiving questions
		socket.on('ques', function (data){
			if (unit_code == data.unit_code){
				var id = data.id;
				var lec_name = data.lec_name;

				$.ajax({
					//url: "http://syngtest.myproject/update_quesID.php",
					url: "update_quesID.php",
					type: 'post',
					data: 'id=' + id,
					success: function (prev_ans) {
						console.log(prev_ans);
						$(".ans_button").buttonMarkup({ theme: "c" });
						if(prev_ans !='0'){ 
							var button = "#" + prev_ans;
							$(button).buttonMarkup({ theme: "e" });
						}
					},
					error: function(){	
						alert('There was an error updating question ID');
					}
				});
				
				// display data
				$('#lec_ques').html(data.ques);
				$('#btnA').parent().find('.ui-btn-text').text(data.A);
				//$('#btnA').text(data.A); not working
				$('#btnB').parent().find('.ui-btn-text').text(data.B);
				$('#btnC').parent().find('.ui-btn-text').text(data.C);
				$('#btnD').parent().find('.ui-btn-text').text(data.D);

				// print data (jquery thing)
				$("p#data_received").append("<br />\r\n" + data.ques + ': A.' + data.A+ '     B.'+ data.B+'     C.'+ data.C+'     D.'+ data.D);
				
				// to check messenger
				$("p#log").html('from: ' + data.msgr);
			}// if it is the correct unit
			
		});//socket on receive ques
		
		// ask user to log in again if no username available.
		while (name == '') {
		   name = alert("Please log in!");
		   $.mobile.changePage($(document.location.href="index.html"), "slideup");
		}
		
		// send the name to the server, and the server's 
		// register wait will recieve this.
		socket.emit('register', name );
		
		
		// When a button is clicked / Student answers question
		//$("button").live('click',function(){
		$(document).on('click','button', function(){
			
			// Get the id of the button clicked
			var lec_ques = $('#lec_ques').val();
			var mcq_answer = $(this).prop("id");

			$.ajax({
				//url: "http://syngtest.myproject/stu_answers.php",
				url: "stu_answers.php",
				type: 'post',
				data: 'mcqanswer='+ mcq_answer,
				success: function (data) {
				//results sent by PHP
					var result = data.split('_');
					var unit_code = result[0];
					var id = result[1];
					var flag = result[2];
					
					if(flag==1){// Change answer
						$(".ans_button").buttonMarkup({ theme: "c" });
						var button = "#" + mcq_answer;
						$(button).buttonMarkup({ theme: "e" });
					}
					else{// Unanswer
						$(".ans_button").buttonMarkup({ theme: "c" });
					}
					
					socket.emit('updated',{
						unit_code: unit_code,
						id: id,
						mcq_answer: mcq_answer
					});//socket emit
					
				},
				error: function(){	
					alert('There was an error in student answering question');	
				}
			});// ajax stu_answers

			return false;
		});// answer button clicked
	});//document ready
});//post join_session