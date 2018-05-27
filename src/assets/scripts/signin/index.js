var apiUrl = ""; //"https://api.dusuncembu.com";
var loginSucceedForwardPage = "/dashboard.html";

import * as $ from 'jquery';

function initializePage(inputApiUrl){
		apiUrl = inputApiUrl
		console.log("Page is Initialized");
		$("#login-form").submit( function(e) {
			
			e.preventDefault();
			
			var $form = $(this),
				company = $form.find("input[name='company']").val(),
				username = $form.find("input[name='username']").val(),
				password = $form.find("input[name='password']").val();
				
				localStorage.setItem('company', company);
				localStorage.setItem('username', username);
				
				$.ajaxSetup({
				 crossDomain: true,
				 xhrFields: {
					 withCredentials: true
				 }
				});
			 
				$.post( apiUrl+"/"+company+"/company/login", { username: username, password: password })
					.done(function( data ) {
						if(data.isSucceed){
							window.location.href = loginSucceedForwardPage;
						} else {
							if(data.description==="The user is already logged in."){
								window.location.href = loginSucceedForwardPage;
							} else {
								alert("Invalid Username or Password");
							}
						}
				});
		})
	}

export {initializePage}; 