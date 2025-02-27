import mysql from 'mysql2/promise'

const config ={
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {

    if(genre){
        
    const lowerCaseGenre = genre.toLowerCase()

    const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;'
        [lowerCaseGenre]
    )
    if(genres.length === 0) return []
    const [{id}] = genre
    console.log(genres)
}


    const [movies] = await connection.query(
        'SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    console.log(movies)
  
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
