import { Router } from "express";
import { readJSON } from "../util.js";
import { MovieController } from "../controllers/movies.js";
import { MovieModel } from "../models/mysql/movie.js";

const movies = readJSON("./movies.json");
export const moviesRouter = Router();

const movieController = new MovieController({movieModel: MovieModel});

moviesRouter.get("/",movieController.getAll);

moviesRouter.get("/:id", movieController.getById);

moviesRouter.post("/", movieController.create);

moviesRouter.delete("/:id", movieController.delete);

moviesRouter.patch("/:id", movieController.update);

moviesRouter.options("/", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATH, DELETE");
  }
  res.send(200);
});
