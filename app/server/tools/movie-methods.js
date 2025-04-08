import dotenv from 'dotenv';

dotenv.config(); //load env file


//method to fetch movies from endpoint
async function fetchAllMovies(queryArr) {
  const apiKey = process.env.MOVIE_API_KEY;
  const movies = [];

  for (let i = 0; i < queryArr.length; i++) {
    const res = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(
        queryArr[i]
      )}&apikey=${apiKey}`
    );

    const movieData = await res.json();
    if (movieData.Response === "True") {
      // Convert the date to ISO 8601 format (YYYY-MM-DD)
      const releasedDate = new Date(movieData.Released);
      const isoDate = releasedDate.toISOString().split("T")[0];

      //handle null/undefined Metascore
      const Metascore =
        movieData.Metascore && movieData.Metascore !== "N/A"
          ? Number(movieData.Metascore)
          : 1; //default value when missing

      //modify the object
      const modObj = {
        Title: movieData.Title,
        Released: isoDate,
        //should format this on frontend, but store as number, 
        // its an UI concern and might vary for different clients
        Runtime: Number(movieData.Runtime.replace(/[^0-9]/g, "")), 
        //we will split the arrays here already so that repeated string splitting would be 
        //avoided on multiple frontends
        Genres: movieData.Genre.split(", "),
        Directors: movieData.Director.split(", "),
        Writers: movieData.Writer.split(", "),
        Actors: movieData.Actors.split(", "),
        Plot: movieData.Plot,
        Poster: movieData.Poster,
        Metascore,
        imdbRating: Number(movieData.imdbRating),
      };
      movies.push(modObj);
    } else {
      console.warn(`Movie not found: ${queryArr[i]}`);
    }
  }
  return movies;
}

//add more methods below if needed

export { fetchAllMovies };
