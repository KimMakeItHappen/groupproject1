
//Harvard Art Museum API Key
var APIKey = "9110745d-175a-40d6-badc-2106d0abd90b";
var cultures = {
  Arab: "37526823", //9 out of 10
  Japanese: "37527795", //9 out of 10
  Korean: "37527867", 
  Byzantine: "37527066 ", //8 out of 10
  Chinese: "37527174", //7 out of 10
  Egyptian: "37527318",
};
var submit = document.getElementById("submit");
var idNumber = "";
var genres = document.getElementById("genres");
var like = document.getElementById("like");
var likedArt = localStorage.getItem("liked art");
var clear = document.getElementById("clear");

if(likedArt){
  likedArt= JSON.parse(likedArt);
} else {
  likedArt= [];
}

//append the array elements onto the ul upon page load
if(likedArt.length!==0){
  for(i=0;i<likedArt.length;i++){
     //create HTML elements
     var li = document.createElement("li");
     var a = document.createElement("a");
     //add classes to elements for styling purposes
     li.classList.add("liked-art-list");
     a.classList.add("liked-art-URL");
       //add text, set href
       a.textContent=likedArt[i];
       a.setAttribute("href",likedArt[i]);
       //append elements to ul
       document.querySelector("#liked-art").appendChild(li);
       li.appendChild(a);
  }
}

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

function isActive(){
  var children= document.querySelector(".orbit-container").children;
  for(var i=0; i<children.length;i++){
    var child = children[i];
    if (child.classList.contains("is-active")===true){
      console.log("one of these is active")
      //store child.childNodes... etc as a variable
      console.log(child.childNodes[1].childNodes[1].src);
      likedArt.push(child.childNodes[1].childNodes[1].src);
      localStorage.setItem("liked art", JSON.stringify(likedArt));
      console.log(likedArt);
      //create HTML elements
      var li = document.createElement("li");
      var a = document.createElement("a");
      //add classes to elements for styling purposes
      li.classList.add("liked-art-list");
      a.classList.add("liked-art-URL");
      //add text, set href
      a.textContent=child.childNodes[1].childNodes[1].src;
      a.setAttribute("href",child.childNodes[1].childNodes[1].src);
      //append li's to ul
      document.querySelector("#liked-art").appendChild(li);
      li.appendChild(a);
    }
  }
}
//when like button is clicked...
like.addEventListener("click", isActive);
//when clear button is clicked...
clear.addEventListener("click", function(event){
  event.preventDefault();
  localStorage.clear();
  likedArt=[ ];
  $("#liked-art").empty();
});

//TODO display none on the slideshow if idNumber="".
