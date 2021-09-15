//ContextMenu for LIKING--------------------------------------------------------------
var contextMenuItem = {
    "id": "Like",
    "title": "Like",
    "contexts": ["page"]
};
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "Like"){
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
})
//ContextMenu for DISLIKING--------------------------------------------------------------
var contextMenuItemDislike = {
    "id": "Dislike",
    "title": "Dislike",
    "contexts": ["page"]
};
chrome.contextMenus.create(contextMenuItemDislike);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "Dislike"){
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
            })
        
    }
})
//ContextMenu for SPECIAL--------------------------------------------------------------
var contextMenuItemSpecial = {
    "id": "Special",
    "title": "Special",
    "contexts": ["page"]
};
chrome.contextMenus.create(contextMenuItemSpecial);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "Special"){
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
                            alert(domain + " has been Specialed!");
                        });
                    
                }) 
            })
        
    }
})

//ContextMenu for SHOW RATING--------------------------------------------------------------
var contextMenuItemShowRatings = {
    "id": "Show ratings",
    "title": "Show ratings",
    "contexts": ["page"]
};
chrome.contextMenus.create(contextMenuItemShowRatings);

chrome.contextMenus.onClicked.addListener(function(clickData){

    if(clickData.menuItemId == "Show ratings"){
            var url =  'http://127.0.0.1:5500/modal.html'; 
            window.open(url, '_blank');

        chrome.storage.sync.get("Likes", function(result) {
            var allValues = Object.values(result);
            //alert("LIKES: " + allValues)
            
        })
        chrome.storage.sync.get("Dislikes", function(result) {
            var allValues = Object.values(result);
            //alert("DISLIKES: " + allValues)
        })
    }
})

