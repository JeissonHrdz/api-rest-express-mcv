import { Router } from "express";
import { readJSON } from "../util.js";
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movies = readJSON("./movies.json");

  const movieController = new MovieController({ movieModel});

  moviesRouter.get("/", movieController.getAll);

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
  return moviesRouter;
};
