var config = require('./config');
var async = require('async');
//var swig = require('swig');
var cons = require('consolidate');
//var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(morgan('tiny'));

//var Datastore = require('nedb');
 
//var tasksdb = new Datastore({
//  filename: 'data/tasks.db',
//  autoload: true
//});

var team = {apps: [
                    {title: "", description:"", link:"", image: "", footer:"", tooltip:"", x:1, y:1},
                    {title: "", description:"Analysis and Operations manager working to deliver self-serve analytical capabilities to the business through Qlikview and QlikSense", link:"/testRoaming", image: "images/brian_duggan.jpg", footer:"Brian Duggan", tooltip:"Brian Duggan", x:2, y:1},
                    {title: "", description:"usiness Insights Reporting Manager focused on OBIEE/Reporting for Growth across Mobile and Media", link:"/testRoaming", image: "images/martin_hare.jpg", footer:"Martin Hare", tooltip:"Martin Hare", x:3, y:1},
                    {title: "", description:"", link:"", image: "", footer:"", tooltip:"", x:4, y:1},
                    {title: "", description:"Senior Insight Analyst focusing on Media and TiVo reporting", link:"/testRoaming", image: "images/johanna_saladas.jpg", footer:"Johanna Saladas", tooltip:"Johanna Saladas", x:1, y:2},
                    {title: "", description:"Senior Insight Analyst focusing on the development of Media reporting", link:"/testRoaming", image: "images/julian_wallond.jpg", footer:"Julian Wallond", tooltip:"Julian Wallond", x:2, y:2},
                    {title: "", description:"Senior Insight Analyst focused on the development/Analysis/Updating of OBIEE and Qlikview reports", link:"/testMBP", image: "images/bertus_lubbe.jpg", footer:"Bertus Lubbe", tooltip:"Bertus Lubbe", x:3, y:2},     
                    {title: "", description:"Senior Insight Analyst focusing on OBIEE / Reporting for Growth - Mobile", link:"/testRoaming", image: "images/jithin_sankar.jpg", footer:"Jithin Sankar", tooltip:"Jithin Sankar", x:4, y:2},
                    //{title: "", description:"", link:"", image: "", footer:"", tooltip:"", x:4, y:2},
                    {title: "", description:"Senior Qlikview Analyst focusing on the development of Mobile Reporting & Exploitation layer", link:"/testRoaming", image: "images/karthika_varri.jpg", footer:"Karthika Varri", tooltip:"Karthika Varri", x:1, y:3},
                    {title: "", description:"Senior Qlikview Analyst focused on development of Media applications", link:"/testRoaming", image: "images/lucas_demoraes.png", footer:"Lucas Vallinoto", tooltip:"Lucas Vallinoto", x:2, y:3},
                    {title: "", description:"", link:"", image: "", footer:"", tooltip:"", x:3, y:3},
                    {title: "", description:"", link:"", image: "", footer:"", tooltip:"", x:4, y:3},
                    {title: "", description:"Senior Qlikview Developer responsible for developing Media apps in Qlikview and QlikSense", link:"/testRoaming", image: "images/stefan_stoichev.jpg", footer:"Stefan Stoichev", tooltip:"Stefan Stoichev", x:1, y:4}
                                     
                  ],
           descr: "<b>Meet The Team</b><br>We prefer a personal approach rather than a formal request process as this allows us to get closer to the business and helps us prioritise the different pieces of work we do. For updates on any of the projects/reports/apps, please contact one of us directly using the details below. For all new requests, please contact <a href='mailto:brian.duggan@virginmedia.co.uk'>Brian Duggan</a> who manages our current workstack and plan. <b>We are located at 270-1-18 (Hook)</b>."
           };
           
           /*
           */

var fakeAreaData = [
    {name: "Qlik", subareas: [
        {name: "MTP", descr: '<b>TiVo Analytics</b><br>Welcome to the TiVo analytics page, where you will find information and user applications relating to TiVo data. By using the TiVo data, we are able to answer key questions about our TiVo base at the top level including more specific questions that could be used for upsell, analysis of viewing habits in relation to churn, negotiations and effectiveness of advertising. <br><br>If you would like a demo of any of the dashboards listed, or for more general enquiries relating to TiVo data, please contact <a href="mailto:Business.Insights@virginmedia.co.uk">Business Insights</a>. <br><br><b>User Documentation:</b> We recommend first looking at the user documentation for the apps in order to gain useful information on using the apps, plus further information about the data upon which they are built. <br><br>For weekly channel dashboard please see our <a href=".\img\TiVo_Weekly_Channel_Dashboard.pdf" download=""> Weekly Channel Dashboard User Documentation</a><br>For daily features dashboard please see our <a href=".\img\TiVo_Daily_Features_App.pdf" download=""> Daily Features Dashboard User Documentation</a> <br>For daily content dashboard please see our <a href=".\img\TiVo_Daily_Content_App.pdf" download=""> Daily Content Dashboard User Documentation</a><br>'
         , apps: [{title: "", description:"Profiles customers of different telecoms providers based on market research survey data including product holding and segmentation information.", link:"/testMBP", image: "images/qlikview.png", footer:"Mobile Base Profiler", tooltip:"", x:1, y:1, beta: false, soon: false}, 
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qlikview.png", footer:"Mobile Cohort Tracker", tooltip:"", x:2, y:1, beta: false, soon: false},
                  {title: "", description:"Descr", link:"", image: "", footer:"In Life Base Tracker", tooltip:"", x:3, y:1, beta: false, soon: false},
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qliksense.png", footer:"Handset Profiler", tooltip:"", x:4, y:1, beta: false, soon: false},
                  {title: "", description:"Descr", link:"/testRoaming", image: "", footer:"International", tooltip:"", x:1, y:2, beta: false, soon: true},
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qlikview.png", footer:"Roaming", tooltip:"", x:2, y:2, beta: false, soon: false},
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qlikview.png", footer:"VM Usage", tooltip:"", x:3, y:2, beta: false, soon: false},
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qlikview.png", footer:"Sales / Upgrades", tooltip:"", x:4, y:2, beta: false, soon: false},
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qlikview.png", footer:"B Party (Number called)", tooltip:"", x:1, y:3, beta: false, soon: false},
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qlikview.png", footer:"Mobile AdHoc Reporting", tooltip:"", x:2, y:3, beta: false, soon: false},
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qlikview.png", footer:"Excess Usage", tooltip:"", x:3, y:3, beta: false, soon: false},
                  {title: "", description:"Descr", link:"/testRoaming", image: "images/qlikview.png", footer:"Customer Value Management", tooltip:"", x:4, y:3, beta: true, soon: false}                  
                 ]},
        {name: "Media", descr: '<b>Media</b><br>Below you will find a list of all our QlikView analytical profiling tools. Click on a link to enter the application.<br><br>If you have never used QlikView before or you are having trouble with any of our applications, visit our <a href="http://qlikview/qlikview/growthbi/qlikviewhelp.htm">QlikView Help page</a>, which has instructions for gaining access and other information about the tools.', footer:""
         ,apps: [{title: "Cable Base Profiler", description:"CBP Descr", link:"/testCBP", image: "", footer:"Updated at: test1", tooltip:""}, {title: "Billing Code Profiler", description:"BCP Descr", link:"/testBCP", image: "", footer:"Updated at: test2", tooltip:""}]},
        {name: "TiVo", descr: '<b>TiVo Apps</b>', apps: []},
        {name: "Qlik Help", descr:'<b>Qlik Help</b><br>If you have never used QlikView before on your machine you will need to install the Internet Explorer Plugin. This can be done in RequestIT by searching for Install Qlikview Plugin. You will have the option to select either "GrowthBI Media" or "GrowthBI Mobile" to gain access to the required group of applications. <br><br>If you already have the Plugin installed and you require access to another group of applications (Media or Mobile) there is another RequestIT for QlikView Folder Access <br><br><b>Troubleshooting</b><br>We recommend using Internet Explorer instead of any other browser you may have as QlikView is optimised using the Internet Explorer Plugin. The applications are still accessible in other browsers via the AccessPoint page but certain features (e.g. exporting to Excel) may not work properly. <br><br>You may also need to use the AccessPoint page if you are accessing the network remotely, e.g. via workaway. <br><br>If you are using an application and it stops working, the first thing to try is closing your Internet Explorer and opening the tool again as your user session may have expired. You can also try clearing your browser cache by pressing Ctrl+F5 in Internet Explorer. <br><br>If you have been granted access to QlikView but the links on the Applications page and on the AccessPoint page are still not working then please contact a member of our team. Contact details can be found on our home page. <br><br><b>Tutorials</b><br>Below are some tutorial videos to guide you through some of our applications. The links will take you to a post in tap where you can view the video.<br>'
        , apps: [
            {title: '', image: "images/video.png", description: 'Video showing how to access the applications.', footer: 'Opening QlikView', x: 1, y: 1},
            {title: '', image: "images/video.png", description: 'Video explaining standard QlikView features.', footer: 'Introduction to QlikView', x: 2, y: 1},
            {title: '', image: "images/video.png", description: 'An overview of the profiler including the Data Export function.', footer: 'Cable Base Profiler Example', x: 3, y: 1},
            {title: '', image: "images/video.png", description: 'An walk-through of the Market Share QlikView application.', footer: 'Market Share Profiler Example', x: 4, y: 1},
        ]}
    ]},
    {name: "OBIEE", subareas: [ 
        {name: "Dashboards", descr: '<b>OBIEE Reporting Portal</b><br><br>The OBIEE Portal is the home of our daily, weekly and monthly KPI Reporting for the business including Overlap, Official Customer Numbers, Revenue and Service margin.<br><br>If you would like to know what`s in OBIEE before you dive in, please have a browse of the content guide below. <br>Use the following <a href="http://qlikview/qlikview/growthbi/img/OBIEE%2011G%20Introduction%20and%20new%20features.ppt">User Guide</a> to familiarise yourself with the OBIEE environment or for more information on the dashboards and details of how to gain access, take a look at our <a href="http://qlikview/qlikview/growthbi/obiee_help.htm">OBIEE Help page</a>. ', footer:'<b>OBIEE Evo Content Guide</b><br>Any reporting in grey font is not yet available for general release.<br><br><img src="images/obiee.png"></img>'
         , apps: [
             {title: "", description:"", link:"", image: "", footer:"", tooltip:"", x:1, y:1, beta: false, soon: false},
             {title: "EVO", description:"For NGBSS Reporting", link:"/testMBP", image: "", footer:"Evo", tooltip:"", x:2, y:1, beta: false, soon: false}, 
             {title: "Dashboards", description:"For Mobile Mart (legacy) reporting", link:"/testRoaming", image: "", footer:"Mobile Mart", tooltip:"", x:3, y:1, beta: false, soon: false},
             {title: "", description:"", link:"", image: "", footer:"", tooltip:"", x:4, y:1, beta: false, soon: false}
        ]},
        {name: "OBIEE Help"} ]}
];



//tasksdb.loadDatabase(function(err) {
//  console.log('tasks db is loaded');
//});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.get('/main', function (req, res) {
  res.render('index', {data: fakeAreaData});
});

app.get('/data/:area/:query', function (req, res) {
    var area = req.params.area.toLowerCase();
    var query = req.params.query.toLowerCase();
    
    //console.log(area + '/' + query)
    if(query != 'team') {
        async.each(fakeAreaData, function(fakeData, callback) {            
            if(fakeData.name.toLowerCase() == area) {                
                async.each(fakeData.subareas, function(data, callback) {                     
                    if(data.name.toLowerCase() == query) {
                        //console.log(data)
                        res.send(data);
                        callback();
                    } else {
                        callback();   
                    }                

                }, function(err) {
                });
            } else {
                callback();
            }

        }, function(err){
        });    

    } else {
        res.send(team);
    }   
});

app.listen(config.main.port, function () {
  console.log('Example app listening on port '+ config.main.port +'!');
});