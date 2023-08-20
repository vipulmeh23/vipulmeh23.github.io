$(document).ready(function(){

    // About Section
    $.ajax({
        url: 'https://people.rit.edu/~sarics/web_proxy.php?path=about',
        beforeSend: function(){
            $("#info-box").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw';></i>")
        },
        data: {
            format: 'json'
        },
        error: function() {
            $('#info').html('<p>An error has occurred</p>');
        },
        dataType: 'json',
        success: function(data){
            var aboutData = "";
            var title = data.title;
            var description = data.description;
            aboutData = "<h1>"+title+"</h1><p>"+description+"</p>";
            $("#info-box").html(aboutData);
        },
        type: 'GET'
    });

    // Get faculty
    $.ajax({
        url: 'https://people.rit.edu/~sarics/web_proxy.php?path=people/faculty',
        beforeSend: function(){
            $("#ourPeopleContainer").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw';></i>")
        },
        data: {
            format: 'json'
        },
        error: function() {
            $('#info').html('<p>An error has occurred</p>');
        },
        dataType: 'json',
        success: function(data){
            var dataToInput = "";
            for(i=0; i<data.faculty.length; i++){
                var bgColor = "#FFF";
                var textColor = "#000";
                var name = data.faculty[i].name;
                var title = data.faculty[i].title;
                if(i % 2 == 0){
                    bgColor = "#000";
                    textColor = "#FFF"
                }
                dataToInput += "<div class='col-lg-2' style='padding-top: 10px; color:"+textColor+"; text-align: center; margin: 3px; height: 70px; background-color:"+bgColor+"'>"+name+"<br />"+title+"</div>";
            }
            $("#ourPeopleContainer").html(dataToInput);
        },
        type: 'GET'
    });

    //Load contact form
    $( "#contactForm" ).load( "https://people.rit.edu/~sarics/web_proxy.php?path=contactForm" );

    //Load Employment Table Data
    var dataSet = [];
    $.ajax({
        url: 'https://people.rit.edu/~sarics/web_proxy.php?path=employment/employmentTable',
        data: {
            format: 'json'
        },
        error: function() {
            $('#info').html('<p>An error has occurred</p>');
        },
        dataType: 'json',
        success: function(data){
            console.log(data.employmentTable.professionalEmploymentInformation);
            for(i=0; i<data.employmentTable.professionalEmploymentInformation.length; i++) {
                var row = [];
                row.push(data.employmentTable.professionalEmploymentInformation[i].employer);
                row.push(data.employmentTable.professionalEmploymentInformation[i].degree);
                row.push(data.employmentTable.professionalEmploymentInformation[i].title);
                row.push(data.employmentTable.professionalEmploymentInformation[i].city);
                row.push(data.employmentTable.professionalEmploymentInformation[i].startDate);
                dataSet.push(row)
            }
        },
        complete: function(){
            insertIntoDataTable(dataSet);
        },
        type: 'GET'
    });
    function insertIntoDataTable(dataSet){
        $('.employmentTable').DataTable({
            data: dataSet,
            columns: [
                { title: "Employer" },
                { title: "Degree" },
                { title: "Title" },
                { title: "City." },
                { title: "Start date" }
            ]
        });
    }
});
var news = [];
var newsCount = 0;
var pageCount = 1;

//Getting news for the first time
$.ajax({
    url: 'https://people.rit.edu/~sarics/web_proxy.php?path=news',
    beforeSend: function(){
        $("#news").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw';></i>")
    },
    data: {
        format: 'json'
    },
    error: function() {
        $('#info').html('<p>An error has occurred</p>');
    },
    dataType: 'json',
    success: function(data){
        news.push(data.older);
    },
    complete: function(){
        generateNewsStrip(news, pageCount);
    },
    type: 'GET'
});

// Pagination for the news and then fetching it
function paginateTheNews(id){
    if(id == "back") {
        if($("#forward:hidden")){
            $("#forward").show();
        }
        if(pageCount != 1){
            pageCount--;
        }
    }else if(id == "forward"){
        pageCount++;
    }
    $.ajax({
        url: 'https://people.rit.edu/~sarics/web_proxy.php?path=news',
        beforeSend: function(){
            $("#news").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw';></i>")
        },
        data: {
            format: 'json'
        },
        error: function() {
            $('#info').html('<p>An error has occurred</p>');
        },
        dataType: 'json',
        success: function(data){
            console.log(data.older);
            news.push(data.older);
        },
        complete: function(){
            generateNewsStrip(news, pageCount);
        },
        type: 'GET'
    });

}

//To generate the news strip
function generateNewsStrip(news, pageCount){
    var data = "";
    var page = pageCount;
    var newsItemsPerPage = 4;
    var start = (page - 1) * newsItemsPerPage;
    var end = start + newsItemsPerPage;
    for(i=start; i<end; i++){
        if(i == (news[0].length-1)){
            $("#forward").hide();
            data += "<li><i><b><font color='#000'>"+news[0][i].date+"</font></b></i><br />"+news[0][i].title+"</li>";
            $("#news").html(data);
            break;
        }
        data += "<li><i><b><font color='#000'>"+news[0][i].date+"</font></b></i><br />"+news[0][i].title+"</li>";
        $("#news").html(data);
    }
}

// Get Degrees Being Offered
var dat = "";
$.ajax({
    url: 'https://people.rit.edu/~sarics/web_proxy.php?path=degrees',
    data: {
        format: 'json'
    },
    error: function() {
        $('#info').html('<p>An error has occurred</p>');
    },
    dataType: 'json',
    success: function(data){
        var webAndMobile = "<h2>"+data.undergraduate[0].title+"</h2><p>"+data.undergraduate[0].description+"</p>";
        $("#wmc").html(webAndMobile);

        var hcc = "<h2>"+data.undergraduate[1].title+"</h2><p>"+data.undergraduate[1].description+"</p>";
        $("#hcc").html(hcc);

        var cit = "<h2>"+data.undergraduate[2].title+"</h2><p>"+data.undergraduate[2].description+"</p>";
        $("#cit").html(cit);

        console.log(data.graduate);
        var ist = "<h2>"+data.graduate[0].title+"</h2><p>"+data.graduate[0].description+"</p>";
        $("#ist").html(ist);

        var hci = "<h2>"+data.graduate[1].title+"</h2><p>"+data.graduate[1].description+"</p>";
        $("#hci").html(hci);

        var nsa = "<h2>"+data.graduate[2].title+"</h2><p>"+data.graduate[2].description+"</p>";
        $("#nsa").html(nsa);

        var gac = "<h2>"+data.graduate[3].title+"</h2><p>"+data.graduate[3].description+"</p>";
        $("#gac").html(gac);
    },
    type: 'GET'
});

//Get footer Content
$.ajax({
    url: 'https://people.rit.edu/~sarics/web_proxy.php?path=footer',
    data: {
        format: 'json'
    },
    error: function() {
        $('#info').html('<p>An error has occurred</p>');
    },
    dataType: 'json',
    success: function(data){
        var socialData = "";
        var copyrightData = "";
        var quickLinksData = "";
        socialData = "<h2><i class='fa fa-twitter fa-3x' aria-hidden='true'></i>"+data.social.tweet+"</h2><br/> By:" + data.social.by;
        copyrightData = "<h2>We are social:</h2> <a href='"+data.social.facebook+"'><i class='fa fa-facebook fa-3x' aria-hidden='true'></i>" +
            "</a>&nbsp;&nbsp;&nbsp;<a href='"+data.social.twitter+"'><i class='fa fa-twitter fa-3x' aria-hidden='true'></i></a><p><br />"+data.copyright.html+"</p>";
        for(i=0; i<data.quickLinks.length; i++)
        {
            var text = data.quickLinks[i].title;
            var link = data.quickLinks[i].href;
            quickLinksData += "<li><a href='"+link+"'>"+text+"</a></li>";
        }
        $("#tweetSocial").html(socialData);
        $("#copyright").html(copyrightData);
        $("#quickies").html("<ul>"+quickLinksData+"</ul>");
    },
    type: 'GET'
});

//Load the employmentDiv 2 with the map
$("#employmentDiv2").attr("src", "https://people.rit.edu/~vm8176/Project2/ist/curl.php");