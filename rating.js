
// Adds ratings to Duckduckgo------------------------------------------------------------------------
function addRatingToWebsite(){
    URL_likes = []
    URL_dislikes = []
    //URLlist = getLinksDuckDuckGo()
    refresh()
    
    var likeButton = document.getElementById("likeButton");
    var dislikeButton = document.getElementById("dislikeButton");
    var specialButton = document.getElementById("specialButton");

    try{
        //LIKE-------------------------------------------------------------------------
        likeButton.onclick = function likePage(){  
            chrome.browserAction.setIcon({
                path :{
                    "38": "greenStar_38_round.png",
                }
            });  
            chrome.tabs.query(
                {active:true, currentWindow: true},
                tabs=>{ const tab=tabs[0];
                        var url = new URL(tab.url)
                        var domain = url.hostname

                        chrome.storage.sync.get("Likes", function(result) {
                            var allValues = Object.values(result);
                            var test = []

                            storageURL = allValues[0]
                            if(storageURL != null){
                                storageURL.forEach(item => {test.push(item) });
                            }
                            test.push(domain)
 
                            chrome.storage.sync.set({"Likes": test}, function() {
                                alert(domain + " has been liked!");
                            });
                        });
                    })
        }
        //DISLIKE-------------------------------------------------------------------------
        dislikeButton.onclick = function likePage(){
            chrome.browserAction.setIcon({
                path : {
                    "38": "redStar_38_round.png"
                }
            })  
            chrome.tabs.query(
                {active:true, currentWindow: true},
                tabs=>{ const tab=tabs[0];
                        var url = new URL(tab.url)
                        var domain = url.hostname
                        
                        
                        chrome.storage.sync.get("Dislikes", function(result) {
                            var allValues = Object.values(result);
                            var test = []

                            
                            storageURL = allValues[0]
                            if(storageURL != null){
                                storageURL.forEach(item => { test.push(item) });
                            }
                            test.push(domain)

                            chrome.storage.sync.set({"Dislikes": test}, function() {
                                alert(domain + " has been disliked!");
                            });
                        
                    })   
        }
            )}
            //SPECIAL-------------------------------------------------------------------------
            specialButton.onclick = function likePage(){
                chrome.browserAction.setIcon({
                    path : {
                        "38": "./icons/blueCircle.png"
                    }
                })  //DISLIKE
                chrome.tabs.query(
                    {active:true, currentWindow: true},
                    tabs=>{ const tab=tabs[0];
                            var url = new URL(tab.url)
                            var domain = url.hostname
                            
                            
                            chrome.storage.sync.get("Specials", function(result) {
                                var allValues = Object.values(result);
                                var test = []
    
                                
                                storageURL = allValues[0]
                                if(storageURL != null){
                                    storageURL.forEach(item => { test.push(item) });
                                }
                                test.push(domain)
    
                                chrome.storage.sync.set({"Specials": test}, function() {
                                    alert(domain + " has been specialed!");
                                });
                            
                        })   
            }
                )}

            var clearLikeDataButton = document.getElementById("clearLikeDataButton");
            var cleardislikeDataButton = document.getElementById("clearDislikeDataButton");
            var clearSpecialsDataButton = document.getElementById("clearSpecialButton");
            
            //Deletes LIKE history------------------------------------------------------------------------
            clearLikeDataButton.onclick = function likePage(){
                if(confirm("Do you want to delete history?")){
                    chrome.storage.sync.set({"Likes": null}, function() {
                        alert("Likedata has been deleted");
                    });
                }
                
            }

            //Deletes DISLIKE history------------------------------------------------------------------------
            cleardislikeDataButton.onclick = function likePage(){
                if(confirm("Do you want to delete history?")){
                    chrome.storage.sync.set({"Dislikes": null}, function() {
                        alert("Dislikedata has been deleted");
                    });
                }
            }

            //Deletes Specials history------------------------------------------------------------------------
            clearSpecialsDataButton.onclick = function likePage(){
                if(confirm("Do you want to delete history?")){
                    chrome.storage.sync.set({"Specials": null}, function() {
                        alert("Dislikedata has been deleted");
                    });
                }
            }
    }
    catch(error){
        console.log("IT'S AN ERROR: " + error)
    }

     
}
//Supposed to change upper right icon based on active website------------------------------------------------------------------------
function checkWebsiteRatingGREEN(){
    var likeBoolean = false;
    var dislikeBoolean = false;

    try{
        chrome.storage.sync.get("Likes", function(result) {
            var allValues = Object.values(result);
    
            if(allValues[0] != null){
               // console.log(window.location.href)
                allValues[0].forEach(item => {
                    
                    if(window.location.href.includes(item)){
                        likeBoolean = true;
                        console.log("LIKED:" + item)
                        
                    }
                })
            }
            //console.log(likeBoolean)
            
            if(likeBoolean == true){
                /*
                chrome.browserAction.setIcon({
                    path :{
                        "38": "greenStar_38_round.png",
                    }
                });
                */
                console.log('matched');
                chrome.browserAction.setPopup({tabId: info.tabId, popup: './options.html'});
                chrome.browserAction.setIcon({path :{
                    "38": "greenStar_38_round.png"
                }, tabId: info.tabId});
                
            } 
            

        });
        
    
        chrome.storage.sync.get("Dislikes", function(result) {
            var allValues = Object.values(result);
    
            if(allValues[0] != null){
                allValues[0].forEach(item => {
                    if(window.location.href.includes(item)){
                        console.log("DISLIKED:" + item)
                        chrome.browserAction.setIcon({
                            path :{
                                "38": "redStar_38_round.png"
                            }
                        })
                    }
                })
            }

        });
    }catch(error ){
        console.log("ERROR: " + error)
    } 
    
    try{
        /*
        chrome.tabs.query(
            {active:true, currentWindow: true},
            tabs=>{ const tab=tabs[0];
                    var url = new URL(tab.url)
                    var domain = url.hostname

                    chrome.storage.sync.get("Likes", function(result) {
                        var allValues = Object.values(result);
                        if(allValues[0] != null){
                            allValues[0].forEach(item => {
                                if(domain == item){
                                    chrome.browserAction.setIcon({
                                        path :{
                                            "38": "greenStar_38_round.png",
                                        }
                                    });
                                }
                            });
                        }
                    });
            }
        );
        */
        
        var alertError = function(arg){
            console.log("INSIDE FUNCTION")
            console.log(arg.url)
            if(arg.url.match(/https:\/\/google\.com\/*/) == null){
                alert('Something');
            }
        };
        
        chrome.browserAction.onClicked.addListener(alertError);
        chrome.tabs.onActivated.addListener(function(info){
            console.log("HEJ")
            chrome.tabs.get(info.tabId, function(change){
                console.log(change.url);
                if(change.url == undefined){
                    chrome.browserAction.setPopup({tabId: info.tabId, popup: ''});
                    chrome.browserAction.setIcon({
                        path: {
                            "38": "greenStar_38_round.png"
                        },
                        tabId: info.tabId
                    });
                    console.log('undefined');
                }
            });
        });
    }catch(error){

    }              
}
// Adds ratings to Google -UNFINISHED-
function getLinksGoogle(){
    
    linkBox = document.getElementsByClassName("g")
    for(x = 0; x < 10; x++){
        try{
            var Raw_URL_link = linkBox[x].getElementsByTagName("*");
            console.log(linkBox[x])
            console.log(Raw_URL_link[7].getElementsByTagName("*")[0])

        }catch(error){
            console.log(console.error())
        }
        
    }
    var query = document.querySelectorAll("[data-hveid]")
    //console.log("data-hveid")
    //console.log(query[5])


    
    
}

//Sets the color based  from the rated list------------------------------------------------------------------------
function getLinksDuckDuckGo(){
    SearchEngines = ["https://www.google.com/search", "https://search.yahoo.com/"]
    URL_links = []
    // Sets the color of anything rated LIKED with the color GREEN------------------------------------------------------------------------
    chrome.storage.sync.get("Likes", function(result) {
            var allValues = Object.values(result);
        for(var i = 0; i < 10; i++){
            try{
                var r1 = "r1-" + i
                //console.log(r1)
                resultBodyLinks = document.getElementById(r1)
                //console.log(resultBodyLinks)

                // URL's of links
                var divExtraURL2 = resultBodyLinks.getElementsByClassName("result__url js-result-extras-url");
                var domain = divExtraURL2[0].getElementsByClassName("result__url__domain")[0].innerHTML;
                for(var x = 0; x < 10; x++){
                    if(domain.includes(allValues[0][x])){
                        document.getElementById(r1).style.backgroundColor = "#008A00";
                        //console.log("Website: " + divExtraURL2[0])
                    }
                }   
            }  
            catch(error){
                console.log("ERROR IN getLinks(): " + error)
            }
        }
    });
    // Sets the color of anything rated DISLIKED with the color RED------------------------------------------------------------------------
    chrome.storage.sync.get("Dislikes", function(result) {
        var allValues = Object.values(result);

        for(var i = 0; i < 10; i++){
            try{
                var r1 = "r1-" + i
                //console.log(r1)
                resultBodyLinks = document.getElementById(r1)
                //console.log(resultBodyLinks)

                // URL's of links
                var divExtraURL2 = resultBodyLinks.getElementsByClassName("result__url js-result-extras-url")
                var domain = divExtraURL2[0].getElementsByClassName("result__url__domain")[0].innerHTML
                for(var x = 0; x < 10; x++){
                    if(domain.includes(allValues[0][x])){
                        document.getElementById(r1).style.backgroundColor = "#C70000";
                        //console.log("Website: " + divExtraURL2[0])
                    }
                }   
            }  
            catch(error){
                console.log("ERROR IN getLinks(): " + error)
            }
        }
    });
    // Sets the color of anything rated SPECIAL with the color BLUE------------------------------------------------------------------------
    chrome.storage.sync.get("Specials", function(result) {
        var allValues = Object.values(result);

    for(var i = 0; i < 10; i++){
        try{
            var r1 = "r1-" + i
            //console.log(r1)
            resultBodyLinks = document.getElementById(r1)
            //console.log(resultBodyLinks)

            // URL's of links
            var divExtraURL2 = resultBodyLinks.getElementsByClassName("result__url js-result-extras-url");
            var domain = divExtraURL2[0].getElementsByClassName("result__url__domain")[0].innerHTML;
            for(var x = 0; x < 10; x++){
                if(domain.includes(allValues[0][x])){
                    document.getElementById(r1).style.backgroundColor = "#0000B0";
                    //console.log("Website: " + divExtraURL2[0])
                }
            }   
        }  
        catch(error){
            console.log("ERROR IN getLinks(): " + error)
        }
    }
});
    
    //console.log("LIST HERE: " + URL_links)
    return URL_links
}
//MutationObserver that watches for changes. This is used for when the MoreResults button is clicked and more search results is generated----------------------------------------------------------
function refresh(){
    const moreResults = document.getElementsByClassName("result results_links_deep highlight_d result--url-above-snippet")
    console.log(moreResults)

    
    let config = { 
        attributes: false,
        attributeFilter: ["result results_links_deep highlight_d result--url-above-snippet"]
    }
    try{
        getLikes(moreResults.length)
        const observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
            console.log(mutation.addedNodes.length)
        });
    })
        observer.observe(moreResults, config)
    }catch(error){
        console.log(error)
    } 
}

function getLikes(length){
    chrome.storage.sync.get("Likes", function(result) {
        var allValues = Object.values(result);
        for(var i = 0; i < length; i++){
            try{
                console.log(length)
                var r1 = "r1-" + i
                //console.log(r1)
                resultBodyLinks = document.getElementById(r1)
                //console.log(resultBodyLinks)

                // URL's of links
                var divExtraURL2 = resultBodyLinks.getElementsByClassName("result__url js-result-extras-url");
                var domain = divExtraURL2[0].getElementsByClassName("result__url__domain")[0].innerHTML;
                for(var x = 0; x < length; x++){
                    if(domain.includes(allValues[0][x])){
                        document.getElementById(r1).style.backgroundColor = "#008A00";
                        //console.log("Website: " + divExtraURL2[0])
                    }
                }   
            }  
            catch(error){
                console.log("ERROR IN getLinks(): " + error)
            }
        }
});
}

document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete') refresh();
});


function getCurrentWebDomain(){
    chrome.tabs.query(
        {active:true, currentWindow: true},
        tabs=>{ const tab=tabs[0];
                var url = new URL(tab.url)
                var domain = url.hostname
                alert(domain) 
                
            })
};
document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete') addRatingToWebsite();
});
/*
document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete') getLinksGoogle();
});


document.addEventListener('readystatechange', () => {    
    if (document.readyState == 'complete') checkWebsiteRatingGREEN();
});
*/
