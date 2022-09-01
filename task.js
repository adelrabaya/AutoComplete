$("#search").autocomplete({
    source: function (request, response) {
        console.log(request.term);
        $.ajax({
            url:"http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                action: "opensearch",
                // Output format
                format: "json",
                search: request.term,
                namespace: 0,
                limit: 8,
            },
            success: function (data) {
                response(data[1]);
            },
        });
    },
});
var result =[];
var endValues = [];
function searchResult(data){
    let $div=$('#results');  
    var baseurl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=";
    var url;
    for(let i = 0;i<8;i++){
        url=baseurl+result[i].title; 
        $.ajax({
            type: "GET", 
            url: url,
            dataType: 'jsonp',
            success: function(data){
                for(let key in data.query.pages)
                {   console.log(data.query.pages[key]);
                    endValues.push(data.query.pages[key]);
                    
                }
                insertResult(); 
                
            },
            error: function(errorMessage) {
                 console.log("damnn");
              }
              
        });
    }  
    
}

function insertResult(){
        console.log("IN INSERT")
        let $div=$('#results'); 
        if(endValues.length==8)
        {   
            var $resdiv;
            var $p1=$('<p>',{"class":"resP"});
            var $p2=$('<p>',{"class":"resP"});
            $div=$('#results');
            for(let i=0;i<result.length;i++){
                $resdiv=$('<div>',{"class":"resDiv"});
                $p1=$('<p>',{"class":"resP"});  
                $p2=$('<p>',{"class":"resP"}); 
                $p1.text(endValues[i].title + " - ");
                $p2.text(endValues[i].extract); 
                $resdiv.append($p1); 
                $resdiv.append($p2);   console.log($p2);
                $div.append($resdiv); 
            }
        }
         
}

$("#searchBtn").click(function(){
    let $div=$('#results'); $div.empty();
    result =[]; 
    endValues=[];
    console.log("Button Clicked!");
    var value = $("#search").val();
    var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+value+"&srlimit=8";
    // var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow"
    if(value!="")
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'jsonp',
        success: function(data){
            for(let i =0;i<8;i++){ 
                result.push(data.query.search[i]);
            }
            searchResult(result);
        },
        error: function(errorMessage) {
             console.log("damnn");
          }
    });
});
