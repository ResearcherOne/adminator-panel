//import config from '../dusuncembu-config.js';
var config = "https://api.dusuncembu.com";
import * as $ from 'jquery';

export default (function () {

	$("#login-form").submit( function(e) {
		
		e.preventDefault();
		
		var $form = $(this),
			username = $form.find("input[name='username']").val(),
			password = $form.find("input[name='password']").val();
			
			$.ajaxSetup({
             crossDomain: true,
             xhrFields: {
                 withCredentials: true
             }
			});
		 
			$.post( config+"/akkol/company/login", { username: username, password: password })
				.done(function( data ) {
				if(!data.isSucceed) alert("Invalid Username or Password");
				if(data.isSucceed){
					window.location.href = "/admin";
				}
				else {
				
				}
			});
	})
 
}());
