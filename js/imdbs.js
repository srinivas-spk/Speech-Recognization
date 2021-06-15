// http://www.omdbapi.com/?s=tt3896198&apikey=d68bd8ae

let input = document.getElementById("search");
let searchIcon = document.getElementById("searchIcon");
input.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    let value = e.target.value;
    searchMovies(value);
  }
});

searchIcon.addEventListener("click", (e) => {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  recognition.addEventListener("result", (e) => {
    let transcript = e.results[0][0].transcript;
    let speechValue = (input.value = transcript);
    searchMovies(speechValue);
  });
  recognition.start();
});

function searchMovies(searchText) {
  window
    .fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=d68bd8ae`)
    .then((data) => {
      // Convert response body into JSON object
      data
        .json()
        .then((movies) => {
          let moviesData = movies.Search;
          let output = [];
          for (let movie of moviesData) {
            console.log(movie);
            output += `
              <div id="js">
              <img src="${movie.Poster}">
              <h1>${movie.Title}</h1>
              <p>${movie.Type}</p>
              <p>${movie.Year}</p>
              </div>
              `;
          }
          document.getElementById("template").innerHTML = output;
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
