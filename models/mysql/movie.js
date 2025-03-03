import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "moviesdb"
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    try {
      if (genre) {
        const lowerCaseGenre = genre.toLowerCase();
        const [genres] = await connection.query(
          "SELECT id, name FROM genre WHERE lower(name) = ?;",
          [lowerCaseGenre]
        );
        if (genres.length === 0) return [];
        const [{ id }] = genre;
        console.log(genres);
      }
      const [movies] = await connection.query(
        "SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie;"
      );
      console.log(movies);

      return movies;
    } catch (err) {
      console.error(err);
    }

    
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      "SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    if (movies.length === 0) return null;
    return movies[0];
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      poster,
      rate
    } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");

    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, duration, director, poster, rate) 
      VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, duration, director, poster, rate]
      );
    } catch (err) {
      throw new Error("Error creating movie" +err);
      // enviar a servicio interno
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {
    try {
      await connection.query(
        "DELETE FROM movie WHERE id = UUID_TO_BIN(?);",
        [id]
      );
    } catch (err) {
      throw new Error("Error deleting movie" +err);
      // enviar a servicio interno
    }
  }

  static async update({ id, input }) {
    try{
      
      if (Object.keys(input).length === 0) {
        throw new Error("No fields to update");
      }  
      // Inicializar arrays para almacenar las partes de la consulta y los valores
      const updates = [];
      const values = [];
  
      // Iterar sobre las propiedades del objeto input
      for (const [key, value] of Object.entries(input)) {
        if (value !== undefined) { // Solo añadir campos definidos
          updates.push(`${key} = ?`); // Añadir la parte de la consulta (ej: "title = ?")
          values.push(value); // Añadir el valor correspondiente
        }
      } 

      values.push(id);   
      
      await connection.query(
        `UPDATE movie SET ${updates.join(", ")} WHERE id = UUID_TO_BIN(?);`,
        values
      );

      const [movies] = await connection.query(
        `SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
      );
  
      return movies[0];
    } catch (err) {
      throw new Error("Error updating movie" +err);
      // enviar a servicio interno
    }
    
  }
}
