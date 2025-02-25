import { Router } from "express";
import { readJSON } from "../util.js";
import { MovieController } from "../controllers/movies.js";

const movies = readJSON("./movies.json");
export const moviesRouter = Router();

moviesRouter.get("/",MovieController.getAll);

moviesRouter.get("/:id", MovieController.getById);

moviesRouter.post("/", MovieController.create);

moviesRouter.delete("/:id", MovieController.delete);

moviesRouter.patch("/:id", MovieController.update);

moviesRouter.options("/", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATH, DELETE");
  }
  res.send(200);
});
