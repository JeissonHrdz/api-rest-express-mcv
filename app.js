import express, { json } from 'express';;
import { readJSON } from './util.js';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';
//import fs from 'node:fs';
//const movies = JSON.parse(fs.readFileSync('movies.json', 'utf-8'))

const movies = readJSON('./movies.json')

const app = express();

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by');
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

