import * as $ from 'jquery';
import Chart from 'chart.js';	


export default (function() {
	var totalLikes = 0;
	var totalDislikes = 0;
	
	const  CHART = $('#doughChart');
	var myChart = new Chart(CHART, {
		type: 'doughnut',
		data: {
			labels: ["Dislike", "Like"],
			datasets: [{
				label: '# of Votes',
				data: [0,0],
				backgroundColor: [
					'rgba(216, 135, 131, 1)',
					'rgba(136, 132, 216, 1)'
				],
				borderColor: [
					'rgba(216, 135, 131,1)',
					'rgba(136, 132, 216, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Overview: Like-Dislike'
					},
					animation: {
						animateScale: true,
						animateRotate: true
					}
		}
	});
	console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	console.log(myChart.data.datasets[0].data[0]);
	console.log(myChart.data.datasets[0].data[1]);

	
	function addData(chart, data1, data2) {
		chart.data.datasets[0].data[0] =data1;
		chart.data.datasets[0].data[1] =data2;
		chart.update();
	}

	  function countLikes(result1, result2) {
			for(var i=0; i<result1.length; i++) {
				if (result1[i].isLiked == 1) {
					totalLikes++;
				}
				else if(result1[i].isLiked == 0) {
					totalDislikes++;
				}
				
			}
			
			for(var i=0; i<result2.length; i++) {
				if (result2[i].isLiked == 1) {
					totalLikes++;
				}
				else if(result2[i].isLiked == 0) {
					totalDislikes++;
				}
				
			}
		}

	function fetchGraphData() {
			
			//made this change otherwise tables were empty
			$.ajaxSetup({
				 crossDomain: true,
				 xhrFields: {
					 withCredentials: true
				 }
				});
				
			$.get("http://163.172.158.47:5000/akkol/company/getCompletedFormList/50/0", function(data1, status){
				console.log("Data: " + JSON.stringify(data1) + "\nStatus: " + status);
				$.get("http://163.172.158.47:5000/akkol/company/getAnonymousFormList/50/0", function(data2, status){
					console.log("Data: " + JSON.stringify(data2) + "\nStatus: " + status);
					countLikes(data1.extras.result,data2.extras.result);
					console.log("++++totalLikes+++++++++++++++++"+totalLikes);
					console.log("++++totalLikes+++++++++++++++++"+totalDislikes);
					addData(myChart, totalDislikes, totalLikes);
				});
			});
		}
	fetchGraphData();
})();