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
		 
			$.post( "http://163.172.158.47:5000/akkol/company/login", { username: username, password: password })
				.done(function( data ) {
				console.log(data.isSucceed)
				if(data.isSucceed){
					window.location.href = "http://163.172.158.47:3000/";
				}
				else {
				
				}
			});
	})
 
}());
