// Written by Shea Yuin Ng
// Created 18 September 2012
// Lecturer/student choosing a unit

//$('.chooseunit').live('click',function(){
$(document).on('click','.chooseunit',function(){
	var unit_chosen = $(this).attr('data-name');
	  	
	$.ajax({
      	//url: "http://syngtest.myproject/select_unit.php",
		url: "select_unit.php",
      	type: 'post',
      	data: 'unit_chosen='+unit_chosen,
      	success: function (status) {
			if(status=="L"){
				$.mobile.changePage($(document.location.href="unit.html"), "slideup"); 
			}
			else{
				$.mobile.changePage($(document.location.href="stud_unit.html"), "slideup"); 
			}
		},
      	error: function(){	
      	alert('There was an error selecting the unit');	
		}
  	});
});