
//Harvard Art Museum API Key
var APIKey = "9110745d-175a-40d6-badc-2106d0abd90b";
var cultures = {
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
var slides = document.getElementById("slides");

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
     //add classes to elements so they can be styled
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
  //choose which API call is made
  if (parseInt(idNumber, 10) > 1000) {
    //Harvard Art Musuem API call
    var queryURL =
      "https://api.harvardartmuseums.org/object?q=totalpageviews:0&size=10&culture= " +
      idNumber +
      " &apikey=" +
      APIKey;
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //display images on slideshow
        for (var i = 0; i < data.records.length; i++) {
          var orbitSlide = document.querySelector("[data-slide='" + i + "']");
          var orbitImage = orbitSlide.querySelector("img");
          var orbitCaption = orbitSlide.querySelector("figcaption");
          var primaryImageUrl = data.records[i].primaryimageurl;
          var fallbackUrl =
            "https://via.placeholder.com/1200x600/?text=No+image+available";
          var imageTitle = data.records[i].title;
          var fallbackTitle = "No image available";
          //check conditions on orbit slides and image data
          if (!orbitSlide) {
            console.log("No Orbit Slide found at this index!");
          }
          if (primaryImageUrl) {
            //change the image source to the art museum image url
            orbitImage.setAttribute("src", primaryImageUrl);
          } else {
            //change the image source to a fallback if no primary image url is unavailable
            orbitImage.setAttribute("src", fallbackUrl);
          }
          if (imageTitle) {
            //change the alt text and caption on the image to the art museum image title 
            orbitImage.setAttribute("alt", imageTitle);
            orbitCaption.textContent = imageTitle;
          } else {
            //change the alt text and caption on the image to a fallback if no title is available 
            orbitImage.setAttribute("alt", fallbackTitle);
            orbitCaption.textContent = fallbackTitle;
          }
        }
      });
  } else {
    //Cleveland Art Museum API call & fetch request
    fetch("https://cors.bridged.cc/https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10&"+idNumber, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://app.cors.bridged.cc/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "method": "GET",
      "mode": "cors",
      "credentials": "omit"
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //display images on the slideshow
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
          //check conditions on orbit slides and image data
          if (!orbitSlide) {
            console.log("No Orbit Slide found at this index!");
          }
          //change the image source to the art musuem image url
          if (primaryImageUrl) {
            orbitImage.setAttribute("src", primaryImageUrl);
          //change the image source to a fallback if no primary image url is unavailable
          } else {
            orbitImage.setAttribute("src", fallbackUrl);
          }
          //change the alt text and caption on the image to the art museum image title
          if (imageTitle) {
            orbitImage.setAttribute("alt", imageTitle);
            orbitCaption.textContent = imageTitle;
          //change the alt text and caption on the image to a fallback if no title is available
          } else {
            orbitImage.setAttribute("alt", fallbackTitle);
            orbitCaption.textContent = fallbackTitle;
          }
        }
      });
  }
}
//when "view art" button is clicked...
submit.addEventListener("click", searchArt);
//When a menu item is selected...
genres.addEventListener("change", function (event) {
  for(var i=0;i<10;i++){
    var orbitSlide = document.querySelector("[data-slide='" + i + "']");
    var orbitImage = orbitSlide.querySelector("img");
    var orbitCaption = orbitSlide.querySelector("figcaption");
    var fallbackUrl =
      "https://via.placeholder.com/1200x600/?text=Click+the+'View+Art'+button";
    var fallbackTitle = "Click the 'View Art' Button";
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
      //check to see if a placeholder image has been "liked"
      if(idNumber!==""){
        console.log("one of these is active")
        //store child.childNodes... etc as a variable
        likedArt.push(child.childNodes[1].childNodes[1].src);
        localStorage.setItem("liked art", JSON.stringify(likedArt));
        //create HTML element
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
      else{
         //store child.childNodes... etc as a variable
         likedArt.push("https://unsplash.com/s/photos/placeholder");
         localStorage.setItem("liked art", JSON.stringify(likedArt));
         //create HTML element
         var li = document.createElement("li");
         var a = document.createElement("a");
         //add classes to elements for styling purposes
         li.classList.add("liked-art-list");
         a.classList.add("liked-art-URL");
         //add text, set href
         a.textContent="https://unsplash.com/s/photos/placeholder";
         a.setAttribute("href","https://unsplash.com/s/photos/placeholder");
         //append li's to ul
         document.querySelector("#liked-art").appendChild(li);
         li.appendChild(a);
      }
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
