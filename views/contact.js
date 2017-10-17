$(document).ready(function() {
	document.getElementById("Submit").addEventListener("click", function() {
		var name = document.getElementById("name").value;
		var email = document.getElementById("email").value;
		var subject = document.getElementById("subject").value;
		var message = document.getElementById("message").value;

		console.log(name, email, subject, message);

		var data = {"name" : name, "email" : email, "subject" : subject, "message" : message};

		$.ajax({
			type: 'post',
			url: '/sendemail',   
			data: {hello : "hello"},
			xhrFields: {
				withCredentials: false
			},  
			headers: {
				"data" : JSON.stringify(data)
			}, 
			success: function (data) {
				console.log('Success');
			},  
			error: function () {
				console.log('We are sorry but our servers are having an issue right now');
			}
		});
	});
});