import * as $ from 'jquery';
import 'datatables';

export default (function () {
  //$('#dataTable2').DataTable();
  
  
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
		$.get("https://api.birkankolcu.com/akkol/company/getCompletedFormList/50/0", function(data, status){
			console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
			initTable("completed-forms-table", data.extras.result);
			$.get("https://api.birkankolcu.com/akkol/company/getAnonymousFormList/50/0", function(data, status){
				console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
				initTable("anonymous-forms-table", data.extras.result);
			});
		});
	}
	runApplication();
}());
