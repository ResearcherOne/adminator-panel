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


if(window.location.pathname==="/admin/") {
	console.log("This is /admin/")
	dashboardModule.initializePage();
	chartsModule.initializePage();
} else if(window.location.pathname==="/admin/signin.html") {
	console.log("This is /admin/signin.html")
	signinModule.initializePage();
	//run signin script
} else {
	console.log("NOT /admin/ or /admin/signin.html");
}