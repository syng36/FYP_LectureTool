// Written by Shea Yuin Ng
// Created 22 March 2013
// To add questions

$('#add_ques_submit').live('click',function(){
		
   // get question
	var lec_ques = $("#lec_ques").val();
	if (!lec_ques) { alert('Please enter your question.'); return false;} 
	lec_ques = escape(lec_ques);
	lec_ques =lec_ques.replace(/\+/g, "%2B");

	//get answer A
	var A = $("#A").val();
	if (!A) { alert('Please enter your answer for A.'); return false; }
	A = escape(A);
	A = A.replace(/\+/g, "%2B");

	//get answer B
	var B = $("#B").val();
	if (!B) { alert('Please enter your answer for B.'); return false; }
	B = escape(B);
	B = B.replace(/\+/g, "%2B");

	//get answer C
	var C = $("#C").val();
	if (!C) { alert('Please enter your answer for C.'); return false; }
	C = escape(C);
	C = C.replace(/\+/g, "%2B");

	//get answer D
	var D = $("#D").val();
	if (!D) { alert('Please enter your answer for D.'); return false; }
	D = escape(D);
	D = D.replace(/\+/g, "%2B");
  
	//use jquery ajax to post data to php server
	$.ajax({
		//url: "http://syngtest.myproject/lec_question.php",
		url: "lec_add_ques.php",
		type: 'post',
		data: 'lec_ques='+lec_ques+'&A='+A+'&B='+B+'&C='+C+'&D='+D,
		success: function (result) {
			if (result==""){
				$("#msg").text("Question added successfully.");
				
				//clear the text spaces
				$("#lec_ques").val('');
				$("#A").val('');
				$("#B").val('');
				$("#C").val('');
				$("#D").val('');
			}
			else{
				$("#msg").text(result);
			}	 
			

		},
		error: function(){	
			alert('There was an error saving lecturers question');	
		}
		
	});
});