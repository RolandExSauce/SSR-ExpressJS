import express from "express";
import { getMovies } from "./controller/get.movies.controller.js"; // Add full path
import { errorHandler} from "./tools/err.handler.js"; // Path matches your structure


//init route method
const initRoutes = (app) => {
  const router = express.Router();

  //get movies route
  router.get(`/movies`, getMovies);

  //add more endpoints below if needed

  //use router before error handler
  app.use(router);

  // Error handler (should be last middleware)
  app.use(errorHandler);
};

export { initRoutes };
