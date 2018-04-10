import '../styles/index.scss';
import * as $ from 'jquery';
import 'datatables';

import './masonry';
// import './charts';
import './popover';
import './scrollbar';
import './search';
// import './sidebar';
import './skycons';
// import './vectorMaps';
// import './chat';
import './datatable';
// import './panel_index';
// import './datepicker';
// import './email';
// import './fullcalendar';
// import './googleMaps';
import './utils';
import './signin'


function getTableRows(result) {
		var resultString = "";
		for(var i=0; i<result.length; i++) {
			var happiness = "unhappy";
			var date = new Date(result[i].submissionDate);
			var formatted_date = date.getFullYear() + "/" + (date.getMonth() + 1) +"/" + date.getDate()+" "; //need to add 0 as prefix to 1-9 months and days
			if (result[i].isLiked == 1) happiness = "happy";
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


	function initTable(table_id, data_array) {
		$('#'+table_id+' > tbody').append(getTableRows(data_array));
		$('#'+table_id).DataTable();
	}
	
	function runApplication() {
		
			//made this change otherwise tables were empty
		$.ajaxSetup({
             crossDomain: true,
             xhrFields: {
                 withCredentials: true
             }
			});
			
		$.get("http://163.172.158.47:5000/akkol/company/getCompletedFormList/50/0", function(data, status){
			console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
			initTable("completed-forms-table", data.extras.result);
			$.get("http://163.172.158.47:5000/akkol/company/getAnonymousFormList/50/0", function(data, status){
				console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
				initTable("anonymous-forms-table", data.extras.result);
			});
		});
	}
runApplication();