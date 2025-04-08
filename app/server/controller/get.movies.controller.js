import { fetchAllMovies } from "../tools/movie-methods.js";

//get movies method
export async function getMovies(req, res) {
  //or use req.query and pass the titles in the url
  // const title = req.query.title;
  
  // http://localhost:3000/movies?titles=The%20thing,Jurassic%20Park,James%20Bond
  const data = await fetchAllMovies([
    "The thing",
    "Jurassic Park",
    "James Bond",
  ]);
  console.log("data returned: ", data);
  res.send(data);
  //res.send('!dlrow olleH')
}
