//Harvard Art Museum API Key
var APIKey = "9110745d-175a-40d6-badc-2106d0abd90b";
var cultures = {
    Arab: "37526823",
    Indian: "37527678",
    Japanese: "37527795", 
    Russian: "37528461", 
    Kurdish: "37527894", 
    Croatian:"37527219",
    Peruvian: "37528317", 
    Cambodian:"37527075", 
    Ottoman:"37528272", 
    Mexican: "37528029", 
    Chinese: "37527174", 
    Egyptian: "37527318"
};
var submit= document.getElementById("submit");
var idNumber = "";
var genres = document.getElementById("genres");

var harvardArtMuseumImages=[];


function searchArt(event) {
    //prevent default refresh
    event.preventDefault();
    var queryURL = "https://api.harvardartmuseums.org/object?q=totalpageviews:0&size=10&culture= "+ idNumber +" &apikey=" + APIKey;
    //fetch request
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for(var i=0;i<10;i++){
                harvardArtMuseumImages.push(data.records[i].primaryimageurl);
            }
            console.log(harvardArtMuseumImages);
            /* document.getElementsByClassName(".orbit-image").setAttribute("src", harvardArtMuseumImages[0]); */
        });
};
//when search button is clicked...
submit.addEventListener("click", searchArt);

genres.addEventListener("change", function(event){
    console.log(event.target.value);
    idNumber = event.target.value;
    console.log(idNumber)
});