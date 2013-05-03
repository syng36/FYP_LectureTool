// Written by Shea Yuin Ng
// Created 19 April 2013
// For a lecturer to post questions

$(document).on('click',"#end_ques",function(){
	$.get("end_session.php", function(data){
	//$.get("http://syngtest.myproject/end_session.php", function(data){
		window.location.href = "lec_ques_list.html";
	});
});

$.post("join_session.php", function(data){
//$.post("http://syngtest.myproject/join_session.php", function(data){
	
	var string = data.split('_');
	var name = string[0];
	var unit_code = string[1];
	var socket = io.connect('http://melts.eng.monash.edu:8000');
	
	 
	// at document read (runs only once).
	$(document).ready(function(){
	
		// Function that delete all the answers from students
		$(document).on('click',"#reset",function(){
			$.get("reset_result.php", function(data){
				$(function() {
					$( "#barA" ).progressbar({
						value: 0
					});
					
					$( "#barB" ).progressbar({
						value: 0
					});
					
					$( "#barC" ).progressbar({
						value: 0
					});
					
					$( "#barD" ).progressbar({
						value: 0
					});
					
					// Style the bar graph
					$(".resultbar").css({ 'background': 'Transparent' });
					$(".resultbar").css({ 'border': 'None' });
					$(".resultbar > div").css({ 'background': 'Orange' });
				});	
				
				socket.emit('reset_answers', { 
					unit_code: unit_code,			
				});
				
				$('#resulta').html('0 out of 0');
				$('#resultb').html('0 out of 0');
				$('#resultc').html('0 out of 0');
				$('#resultd').html('0 out of 0');
			});
		});
		
		//use jquery ajax to post data to php server
		$.ajax({
			//url: "http://syngtest.myproject/lec_question.php",
			url: "lec_post_ques.php",
			type: 'post',
			dataType: "xml",  
			success: function (xml) {
			//results sent by PHP	
			
				// Read xml file
				$(xml).find('Ques').each(function(){ 
					var unit_code = $(this).find('UnitCode').text(); 	
					var id = $(this).find('ID').text(); 	
					var lec_ques = $(this).find('Question').text(); 
					var A = $(this).find('A').text();
					var B = $(this).find('B').text(); 	
					var C = $(this).find('C').text(); 	
					var D = $(this).find('D').text(); 
					cntA = xml.getElementsByTagName("CntA")[0].childNodes[0].nodeValue;
					cntB = xml.getElementsByTagName("CntB")[0].childNodes[0].nodeValue;
					cntC = xml.getElementsByTagName("CntC")[0].childNodes[0].nodeValue;
					cntD = xml.getElementsByTagName("CntD")[0].childNodes[0].nodeValue;
					total = xml.getElementsByTagName("Total")[0].childNodes[0].nodeValue;
					
					if (lec_ques== "0"){// means there's no question posted by lecturer
						// Empty list, show this msg
						$("p#log").text('No question posted!!');
					}
					else{// list the units in an unordered list
						// send message on inputbox to server
						socket.emit('ques', { 
							unit_code: unit_code,
							id: id,
							ques: lec_ques,
							lec_name: name,
							A: A,
							B: B,
							C: C,
							D: D,
							
						});
						
						$(function() {
							$( "#barA" ).progressbar({
								value: cntA/total*100
							});
							
							$( "#barB" ).progressbar({
								value: cntB/total*100
							});
							
							$( "#barC" ).progressbar({
								value: cntC/total*100
							});
							
							$( "#barD" ).progressbar({
								value: cntD/total*100
							});
							
							// Style the bar graph
							//$(".resultbar").css({ 'background': 'Grey' });
							$(".resultbar").css({ 'background': 'Transparent' });
							$(".resultbar").css({ 'border': 'None' });
							$(".resultbar > div").css({ 'background': 'Orange' });
						});	
						
						$('#lec_ques').html(lec_ques);
						$('#A').html(A);
						$('#B').html(B);
						$('#C').html(C);
						$('#D').html(D);
						
						$('#resulta').html(cntA+' out of '+total);
						$('#resultb').html(cntB+' out of '+total);
						$('#resultc').html(cntC+' out of '+total);
						$('#resultd').html(cntD+' out of '+total);
					} 
				})
				
				
			},
			error: function(){	
			alert('There was an error posting lecturers question');	
			}
			
		});
	
		// Updated answers from students
		socket.on('updated', function (data) {
			console.log('Answer: ', data.mcq_answer);
			var unit_code = data.unit_code;
			var id = data.id;
			var mcq_answer = data.mcq_answer;
			
			$.ajax({
				//url: "http://syngtest.myproject/getstu_answers.php",
				url: "getstu_answers.php",
				type: 'post',
				dataType: "xml",  
				success: function (xml) {
		
					//results sent by PHP
					cntA = xml.getElementsByTagName("CntA")[0].childNodes[0].nodeValue;
					cntB = xml.getElementsByTagName("CntB")[0].childNodes[0].nodeValue;
					cntC = xml.getElementsByTagName("CntC")[0].childNodes[0].nodeValue;
					cntD = xml.getElementsByTagName("CntD")[0].childNodes[0].nodeValue;
					total = xml.getElementsByTagName("Total")[0].childNodes[0].nodeValue;
					//$(xml).find('Answer').each(function(){  
					//var cntA = $(this).find('CntA').text(); 
					//var cntB = $(this).find('CntB').text(); 
					//var cntC = $(this).find('CntC').text(); 
					//var cntD = $(this).find('CntD').text(); 
					//var total = $(this).find('Total').text(); 
				
					//});
					// Display data
					$(function() {
						$( "#barA" ).progressbar({
							value: cntA/total*100
						});
						
						$( "#barB" ).progressbar({
							value: cntB/total*100
						});
						
						$( "#barC" ).progressbar({
							value: cntC/total*100
						});
						
						$( "#barD" ).progressbar({
							value: cntD/total*100
						});
						
					});					
					
					$('#resulta').html(cntA+' out of '+total);
					$('#resultb').html(cntB+' out of '+total);
					$('#resultc').html(cntC+' out of '+total);
					$('#resultd').html(cntD+' out of '+total);
				},
				error: function(){	
					console.log('There was an error in student answering question');	
				}
			});		
		});			
	
		// ask user to log in again if no username available.
		while (name == '') {
		   name = alert("Please log in!");
		   window.location.href = "index.html";
		   //$.mobile.changePage($(document.location.href="index.html"), "slideup");
		};
		
		// send the name to the server, and the server's 
		// register wait will recieve this.
		socket.emit('register', name );
	}); 
});