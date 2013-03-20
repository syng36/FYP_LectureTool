// Written by Shea Yuin Ng
// Created 19 September 2012
// Go to the page of the unit chosen from the list
 
// Use jquery ajax to post data to php server
$.ajax({
	//url: "http://syngtest.myproject/get_unit.php",
	url: "get_unit.php",
	type: 'post',
	dataType: "xml",  
	success: function (xml) {
		//xml format results sent by PHP
		$(xml).find('Unit').each(function(){  
		var unit_code = $(this).find('UnitCode').text(); 
		var unit_name = $(this).find('UnitName').text();
		
		//$("#viewunit_optionlist").append('<li id="'+unit_code+'"><a href="unit_page.html" rel="external">'+unit_code+'  '+unit_name+'</a></li>');
		//$("#viewunit_optionlist").append('<li class="chooseunit" data-name="'+unit_code+'"><a href="#">'+unit_code+'  '+unit_name+'</a></li>');
		//Print the results
		document.getElementById("unitcode").innerHTML=unit_code+' '+unit_name;
		})
	},  
	error: function() {  
		alert("An error occurred while processing XML file.");  
	}  

});