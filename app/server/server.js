import express from "express";
import path from "path";
import { initRoutes } from "./init.routes.js"; // Add .js extension
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, "../frontend")));
initRoutes(app); //pass app instance and init the routes 

const PORT = process.env.PORT || 3000; //put port in env file

app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints:`);
    console.log(`- GET /movies`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
