
//Harvard Art Museum API Key
var APIKey = "9110745d-175a-40d6-badc-2106d0abd90b";
var cultures = {
  Arab: "37526823",
  Thai: "37528758", /*only two images*/
  Japanese: "37527795",
  Korean: "37527867" /* first primaryimage url missing*/,
  Hellenistic: "37527570",
  Byzantine: "37527066 ",
  French: "37527426" /* no primaryimage url*/,
  Chinese: "37527174",
  Egyptian: "37527318",
};
var submit = document.getElementById("submit");
var idNumber = "";
var genres = document.getElementById("genres");
function searchArt(event) {
  //prevent default refresh
  event.preventDefault();
  if (parseInt(idNumber, 10) > 1000) {
    var queryURL =
      "https://api.harvardartmuseums.org/object?q=totalpageviews:0&size=10&culture= " +
      idNumber +
      " &apikey=" +
      APIKey;
    //fetch request
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.records.length; i++) {
          var orbitSlide = document.querySelector("[data-slide='" + i + "']");
          var orbitImage = orbitSlide.querySelector("img");
          var orbitCaption = orbitSlide.querySelector("figcaption");
          var primaryImageUrl = data.records[i].primaryimageurl;
          var fallbackUrl =
            "https://via.placeholder.com/1200x600/?text=No+image+available";
          var imageTitle = data.records[i].title;
          var fallbackTitle = "No image available";
          if (!orbitSlide) {
            console.log("No Orbit Slide found at this index!");
          }
          if (primaryImageUrl) {
            orbitImage.setAttribute("src", primaryImageUrl);
          } else {
            orbitImage.setAttribute("src", fallbackUrl);
          }
          if (imageTitle) {
            orbitImage.setAttribute("alt", imageTitle);
            orbitCaption.textContent = imageTitle;
          } else {
            orbitImage.setAttribute("alt", fallbackTitle);
            orbitCaption.textContent = fallbackTitle;
          }
        }
      });
  } else {
    var queryURL2 =
      "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10&" +
      idNumber;
    //fetch request
    fetch(queryURL2)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.data.length);
        for (var i = 0; i < data.data.length; i++) {
          var orbitSlide = document.querySelector("[data-slide='" + i + "']");
          var orbitImage = orbitSlide.querySelector("img");
          var orbitCaption = orbitSlide.querySelector("figcaption");
          var primaryImageUrl = data.data[i].images.web.url;
          console.log(data.data[i].images.web.url);
          var fallbackUrl =
            "https://via.placeholder.com/1200x600/?text=No+image+available";
          var imageTitle = data.data[i].title;
          var fallbackTitle = "No image available";
          if (!orbitSlide) {
            console.log("No Orbit Slide found at this index!");
          }
          if (primaryImageUrl) {
            orbitImage.setAttribute("src", primaryImageUrl);
          } else {
            orbitImage.setAttribute("src", fallbackUrl);
          }
          if (imageTitle) {
            orbitImage.setAttribute("alt", imageTitle);
            orbitCaption.textContent = imageTitle;
          } else {
            orbitImage.setAttribute("alt", fallbackTitle);
            orbitCaption.textContent = fallbackTitle;
          }
        }
      });
  }
}
//when search button is clicked...
submit.addEventListener("click", searchArt);
genres.addEventListener("change", function (event) {
  for(var i=0;i<10;i++){
    var orbitSlide = document.querySelector("[data-slide='" + i + "']");
    var orbitImage = orbitSlide.querySelector("img");
    var orbitCaption = orbitSlide.querySelector("figcaption");
    var fallbackUrl =
      "https://via.placeholder.com/1200x600/?text=No+image+available";
    var fallbackTitle = "No image available";
    orbitImage.setAttribute("src", fallbackUrl);
    orbitImage.setAttribute("alt", fallbackTitle);
    orbitCaption.textContent = fallbackTitle;
  }
  
  idNumber = event.target.value;
});