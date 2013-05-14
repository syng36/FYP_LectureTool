// Written by Shea Yuin Ng
// Created 19 April 2013
// Displaying understanding scale

$.post("join_session.php", function(data){

	//$.getScript(location.host + ":8000/socket.io/socket.io.js", null);
	var string = data.split('_');
	var name = string[0];
	var unit_code = string[1];
	var socket = io.connect('http://melts.eng.monash.edu:8000');
	//var socket = io.connect(location.host + ':8000/socket.io/socket.io.js');
	 
	 // at document read (runs only ones).
	 $(document).ready(function(){
	 
		// Function that delete all the answers from students
		$(document).on('click',"#reset_uscale",function(){
			// Clear all results in database
			$.get("reset_uscale.php", function(data){
				$(function() {
					// Reset progress bar to 0
					$( "#UScale" ).progressbar({
						value: 0
					});
					
					// Style the bar graph
					$("#UScale").css({ 'background': 'Orange' });	
				});	

				// Give signal to reset student's buttons
				socket.emit('reset_uscale', { 
					unit_code: data,
				});
			});
		});
		
		// Query database for previous result
		$.ajax({
			url: "getu_scale.php",
			type: 'post',
			dataType: "xml",  
			success: function (xml) {

				//results sent by PHP
				cntY = xml.getElementsByTagName("CntY")[0].childNodes[0].nodeValue;
				cntN = xml.getElementsByTagName("CntN")[0].childNodes[0].nodeValue;
				total = xml.getElementsByTagName("Total")[0].childNodes[0].nodeValue;
				
				if (total==0)
				{
					$(function() {
						$( "#UScale" ).progressbar({
							value: 0
						});
					});	
					
					// Style the bar graph
					$("#UScale").css({ 'background': 'Orange' });
					
					$('#uresult').html('');
				}
				else{
					$(function() {
						$( "#UScale" ).progressbar({
							value: cntY/total*100
						});
					});	

					// Style the bar graph
					$("#UScale").css({ 'background': 'Red' });
					$("#UScale > div").css({ 'background': 'Green' });
					
					$('#uresult').html(cntY+' out of '+total+' understands AND '+cntN+' out of '+total+' panicking');
				}
			},
			error: function(){	
				alert("Please log in!");
				$.mobile.changePage($(document.location.href="index.html"), "slideup");  
			}
		});	
		
		// When there is student responding to the uscale
		socket.on('updated_uscale', function (data) {
			if (unit_code==data.unit_code){
				$.ajax({
					//url: "http://syngtest.myproject/getu_scale.php",
					url: "getu_scale.php",
					type: 'post',
					dataType: "xml",  
					success: function (xml) {

						//results sent by PHP
						cntY = xml.getElementsByTagName("CntY")[0].childNodes[0].nodeValue;
						cntN = xml.getElementsByTagName("CntN")[0].childNodes[0].nodeValue;
						total = xml.getElementsByTagName("Total")[0].childNodes[0].nodeValue;
						
						if (total==0)
						{
							$(function() {
								$( "#UScale" ).progressbar({
									value: 0
								});
							});	
							
							// Style the bar graph
							$("#UScale").css({ 'background': 'Orange' });
							
							$('#uresult').html('');
						}
						else{
							$(function() {
								$( "#UScale" ).progressbar({
									value: cntY/total*100
								});
							});	

							// Style the bar graph
							$("#UScale").css({ 'background': 'Red' });
							$("#UScale > div").css({ 'background': 'Green' });
							
							$('#uresult').html(cntY+' out of '+total+' understands AND '+cntN+' out of '+total+' panicking');
						}
					},
					error: function(){	
						alert("Please log in!");
						$.mobile.changePage($(document.location.href="index.html"), "slideup");  
					}
				});// ajax
			}// execute only if the correct unit
		});	// socket on student response		
	});//document ready
});//post join_session