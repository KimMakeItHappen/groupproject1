//Harvard Art Museum API Key
var APIKey= "9110745d-175a-40d6-badc-2106d0abd90b";

var Cultures= {
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

console.log(Cultures);

function searchArt(event) {
    //prevent default refresh
    event.preventDefault();
    
    //this query url returns 10 images from a specific culture (Egyptian is used as a test value); we need to replace the culture id with a variable from the user specified input
    var queryURL = "https://api.harvardartmuseums.org/object?q=totalpageviews:0&size=10&culture=37527318&apikey=" + APIKey;


    //fetch request
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        });

    /*This was used to find the list of all cultures...
    var queryURL2= "https://api.harvardartmuseums.org/culture?size=255&apikey=" + APIKey;    
       fetch(queryURL2)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    }); */
};

//need a function to display search history and clear current search

//when search button is clicked...
search.addEventListener("click", searchArt);

/*TODO
1. Choose a subset of cultures to include in dropdown menu
2. Generate results when the user selects a culture and display them on the website. Include title of work, artist name, year of work, and description.
3. Get the API call for Chicago Art Museum to console log data
4. Identify the correct category for the Chicago Art Musuem data
5. Generate results when the user selects from the category and display them on the website with similar info as described in item 2
6. Write logic to determine which API call to use based on the users selection

*/


//test.addEventListener("click", function(){
// store the number that goes with the culture
//var currentCulture = ....
//})