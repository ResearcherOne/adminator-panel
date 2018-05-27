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
import * as signinModule from "./signin";
import * as chartsModule from "./dusCharts";
//here are the table fetch functions
import * as dashboardModule from "./dashboard";

var apiUrl = "http://localhost:3000";
//"https://api.dusuncembu.com";

if(window.location.pathname==="/dashboard.html") {
	console.log("This is /")
	dashboardModule.initializePage(apiUrl);
	chartsModule.initializePage(apiUrl);
} else if(window.location.pathname==="/" || window.location.pathname==="/index.html") {
	console.log("This is /signin.html")
	signinModule.initializePage(apiUrl);
} else {
	console.log("NOT / or /signin.html");
}