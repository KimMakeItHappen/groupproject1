//Harvard Art Museum API Key
var APIKey = "9110745d-175a-40d6-badc-2106d0abd90b";
var cultures = {
    Arab: "37526823",
    Indian: "37527678", /* no primaryimage url*/
    Japanese: "37527795", 
    Russian: "37528461", /* no primaryimage url*/
    Kurdish: "37527894", /* no primaryimage url*/
    Croatian:"37527219",/* no primaryimage url*/
    Peruvian: "37528317",/* no primaryimage url*/
    Cambodian:"37527075", /* no primaryimage url*/
    Ottoman:"37528272", /* some primaryimage url*/
    Mexican: "37528029", /* no primaryimage url*/
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
            for(var i=0;i<9;i++){
                //not all primary image urls are defined... we need logic to skip over the ones that aren't
                console.log(data.records[i].primaryimageurl)
                harvardArtMuseumImages.push(data.records[i].primaryimageurl);
                document.getElementById("slide-"+(i+1)).src=harvardArtMuseumImages[i];
            }
            console.log(harvardArtMuseumImages);
        });
};
//when search button is clicked...
submit.addEventListener("click", searchArt);

genres.addEventListener("change", function(event){
    console.log(event.target.value);
    idNumber = event.target.value;
    console.log(idNumber)
    harvardArtMuseumImages=[];
});