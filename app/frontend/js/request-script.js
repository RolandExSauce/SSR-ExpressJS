window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      try {
        const movies = JSON.parse(xhr.responseText);
        console.log("movies in frontend", movies);

        // Clear existing content but preserve the 3 article tags
        bodyElement.innerHTML = `
          <article></article>
          <article></article>
          <article></article>
        `;

        // Get all article elements
        const articles = document.querySelectorAll("article");

        // Populate exactly 3 articles with movie data
        for (let i = 0; i < 3; i++) {
          if (movies[i]) {
            articles[i].innerHTML = `
              <img src="${movies[i].Poster}">
              <h1>${movies[i].Title}</h1>
              <p>
                   <span>Runtime ${formatRuntime(movies[i].Runtime)}</span>
                <span>•</span>
                  <span>Released on ${formatDate(movies[i].Released)}</span>
              </p>
               <p class="genre">${renderGenres(movies[i].Genres)}</p>
              <p>${movies[i].Plot}</p>

              <h2>Director</h2>
              <ul>${renderPeople(movies[i].Directors)}</ul>

              <h2>Writers</h2>
               <ul>${renderPeople(movies[i].Writers)}</ul>
         
              <h2>Actors</h2>
              <ul>${renderPeople(movies[i].Actors)}</ul>
          `;
          } else {
            // If no movie data for this slot, clear the article
            articles[i].innerHTML = "";
          }
        }
      } catch (e) {
        bodyElement.innerHTML = "Error parsing movie data: " + e.message;
      }
    } else {
      bodyElement.innerHTML = "Failed to load data. Status: " + xhr.status;
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();

  //format the runtime
  function formatRuntime(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  }

  function formatDate(dateString) {
    console.log("before: ", dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };

    console.log(
      "before: ",
      new Date(dateString).toLocaleDateString(undefined, options)
    );
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function renderGenres(genreString) {
    return genreString
      .map((genre) => `<span class="genre">${genre}</span>`)
      .join("");
  }

  function renderPeople(peopleString) {
    return peopleString.map((person) => `<li>${person}</li>`).join("");
  }
};
