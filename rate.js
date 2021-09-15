

var likeButton = document.getElementById("likeButton");

likeButton.onclick = function likePage(){
    alert("LIKED!!!")
    console.log("LIKED!!!")
}


function checkLinksQuantity(){
    i = 190
    var r1 = "r1-" + i
    resultBodyLinks = document.getElementById(r1)

    if(resultBodyLinks = document.getElementById(r1) != null){
    }
    i = 160
    if(resultBodyLinks = document.getElementById(r1) != null){
        loopLinks(160)
    }
    i = 120
    if(resultBodyLinks = document.getElementById(r1) != null){
        loopLinks(120)
    }
    i = 70
    if(resultBodyLinks = document.getElementById(r1) != null){
        loopLinks(70)
    }
    i = 30
    if(resultBodyLinks = document.getElementById(r1) != null){
        loopLinks(30)
    }
    i = 10
    if(resultBodyLinks = document.getElementById(r1) != null){
        loopLinks(10)
    }
}