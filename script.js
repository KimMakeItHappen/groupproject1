//Harvard Art Museum API Key
var APIKey= "9110745d-175a-40d6-badc-2106d0abd90b";


function searchArt(event) {
    //prevent default refresh
    event.preventDefault();
    
    var queryURL = "https://api.harvardartmuseums.org/object?q=totalpageviews:0&size=10&apikey=" + APIKey;


    // If you comment out line 11 and replace it with the line below, the console log will show data on all 255 cultures available to choose from. We should pick maybe 10, each of which have a decent amount of art (which I think is shown in "objects")

   /*  var queryURL= "https://api.harvardartmuseums.org/culture?size=255&apikey=" + APIKey; */

    //fetch request
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        });
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