const z = require('zod');

 const movieShema = z.object({
        title: z.string({
            required_error: 'Title is required', 
            invalid_type_error: 'Title is required'
        }),
        year: z.number().int().min(1900).max(2024),
        director: z.string(),
        duration: z.number().int().positive(),
        poster: z.string().url({
            message: 'Poster must be a valid URL'
        }),
        genre: z.array(
            z.enum(['Drama', 'Action', 'Adventure', 'Comedy', 'Thriller', 'Romance', 'Animation']),{
            required_error: 'Genre is required',
            invalid_type_error: 'Genre must be an array'
        }),
        rate: z.number().min(0).max(10).default(5)
    })

    function validateMovie(object){
        return movieShema.safeParse(object)        
    }

    function validatePartialMovie(object){
        return movieShema.partial().safeParse(object)
    }

module.exports = {
    validateMovie,
    validatePartialMovie
}
