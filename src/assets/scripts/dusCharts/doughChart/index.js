var config = "https://api.dusuncembu.com";
import * as $ from 'jquery';
import Chart from 'chart.js';	

function initializePage(){
	var totalLikes = 0;
	var totalDislikes = 0;
	
	const  CHART = $('#doughChart');
	var myChart = new Chart(CHART, {
		type: 'doughnut',
		data: {
			labels: ["Unhappy", "Happy"],
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
						text: 'Customer Satisfaction Chart'
					},
					animation: {
						animateScale: true,
						animateRotate: true
					}
		}
	});

	
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

	function fetchGraphData(company) {
			$.ajaxSetup({
				 crossDomain: true,
				 xhrFields: {
					 withCredentials: true
				 }
				});
				
			$.get(config+"/"+company+"/company/getCompletedFormList/50/0", function(data1, status){
				if(data1.isSucceed) {
					$.get(config+"/"+company+"/company/getAnonymousFormList/50/0", function(data2, status){
						countLikes(data1.extras.result,data2.extras.result);
						addData(myChart, totalDislikes, totalLikes);
					});
				} else {
					console.log("Script of dusChart says unable to fetch data");
				}
			});
		}
	if(window.location.pathname==="/admin/") {
		var company = localStorage.getItem('company');
		fetchGraphData(company);
	} else {
		console.log("Script of dusChart says that it is not dashboard");
	}
}

export {initializePage}; 