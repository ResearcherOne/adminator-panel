var apiUrl = "";//"https://api.dusuncembu.com";
import * as $ from 'jquery';
import 'datatables';

function getTableRows(result) {
	var resultString = "";
	var totalLikes = 0;
	var totalDislikes = 0;
	for(var i=0; i<result.length; i++) {
		var happiness = "unhappy";
		var date = new Date(result[i].submissionDate);
		var formatted_date = date.getFullYear() + "/" + (date.getMonth() + 1) +"/" + date.getDate()+" "; //need to add 0 as prefix to 1-9 months and days
		if (result[i].isLiked == 1) {
			happiness = "happy";
			totalLikes++;
		}
		else if(result[i].isLiked == 0) {
			totalDislikes++;
		}
		
		if(result[i].mail) {
			resultString += "<tr>"+
								"<td>"+formatted_date+"</td>"+
								"<td>"+happiness+"</td>"+
								"<td>"+result[i].userText+"</td>"+
								"<td>"+result[i].mail+"</td>"+
							"</tr>";
		} else {
			resultString += "<tr>"+
								"<td>"+formatted_date+"</td>"+
								"<td>"+happiness+"</td>"+
								"<td>"+result[i].userText+"</td>"+
							"</tr>";
		}
	}
	
	return resultString;
}

var loginPage = "/index.html";

function initTable(table_id, data_array) {
	$('#'+table_id+' > tbody').append(getTableRows(data_array));
	$('#'+table_id).DataTable();
}

function runApplication(company, username) {
	
	console.log("PATHNAME:"+window.location.pathname);
	if(window.location.pathname==="/dashboard.html") {
		
		$.ajaxSetup({
			 crossDomain: true,
			 xhrFields: {
				 withCredentials: true
			 }
			});
			
		$.get(apiUrl+"/"+company+"/company/getCompletedFormList/50/0", function(data, status){
			if(!data.isSucceed) window.location.href = loginPage;
			else console.log("DATA FETCH SUCCEED");
			initTable("completed-forms-table", data.extras.result);
			$.get(apiUrl+"/"+company+"/company/getAnonymousFormList/50/0", function(data, status){
				initTable("anonymous-forms-table", data.extras.result);
				if(data.isSucceed) $("#dusuncembu-username").text(username);
				else if(data.isSucceed) $("#dusuncembu-username").text("Not Logged In");
			});
		});
		$(document).on('click', '#dusuncembu-logout', function () {
			console.log("TROLOHO");
			$.get(apiUrl+"/"+company+"/company/logout", function(data, status){
				if(data.isSucceed) window.location.href = loginPage;
				else alert("Unable to log out.");
			});
			return false;
		});
	} else {
		console.log("NOT /admin/");
	}
}

function initializePage(inputApiUrl){
	apiUrl = inputApiUrl
	var company = localStorage.getItem('company');
	var username= localStorage.getItem('username');
	runApplication(company, username);
}

export {initializePage}; 