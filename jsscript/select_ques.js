// Written by Shea Yuin Ng
// Created 22 March 2013
// Lecturer/student choosing a unit

//$('.chooseques').live('click',function(){
$(document).on('click','.chooseques',function(){

	// Get the ID of the question
	var ques_chosen = $(this).attr('data-name');
	  	
	$.ajax({
      	//url: "http://syngtest.myproject/select_ques.php",
		url: "select_ques.php",
      	type: 'post',
      	data: 'ques_chosen='+ques_chosen,
      	success: function (data) {
			if(data==""){
				$.mobile.changePage($(document.location.href="lec_sessionpage.html"), "slideup"); 
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