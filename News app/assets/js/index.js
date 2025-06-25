// =====>  HTML ELEMENTS
var countryLinks = document.querySelectorAll(".countries a");
var categoryLinks = document.querySelectorAll(".categories a");
// =====>  APP VARIABLES

var countryCode = "us";
var categoryCode = "business";
var palceholderImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";

// =====>  FUNCTIONS

async function getNews(category, countryCode) {
  var response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=596d0d9e5e854419b619c58505778880`
  );

  var data = await response.json();
  console.log(data);
  displayArticles(data.articles);
}

function displayArticles(arr) {
  var box = document.querySelector(".news-container");
  box.innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    box.innerHTML += `
    <article class="col-md-4 ">
      <div class="inner h-100 shadow">
        <img src="${
          arr[i].urlToImage || palceholderImage
        }" class='w-100' alt="${arr[i].title} Photo" />
        <div class="article-body p-3">
          <h2 class="h5">${arr[i].title?.split(" ").splice(0, 8).join(" ")}</h2>
          <p>${arr[i].description?.split(" ").splice(0, 15).join(" ") || ""}</p>
          <a class="btn btn-primary" href='${arr[i].url}'>Read More</a>
        </div>
      </div>
    </article>
    `;
  }
}
// =====>  EVENTS

for (var i = 0; i < countryLinks.length; i++) {
  countryLinks[i].addEventListener("click", function (e) {
    var activeLink = document.querySelector(".countries .active");
    activeLink.classList.remove("active");
    e.target.classList.add("active");
    countryCode = e.target.getAttribute("data-country");
    console.log(countryCode);
    getNews(categoryCode, countryCode);
  });
}

for (var i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener("click", function (e) {
    var activelink = document.querySelector(".categories .active");
    activelink.classList.remove("active");
    e.target.classList.add("active");
    categoryCode = e.target.getAttribute("data-category");
    console.log(categoryCode);
    getNews(categoryCode, countryCode);
  });
}

getNews(categoryCode, countryCode);
