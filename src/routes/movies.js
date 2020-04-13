const { celebrate, Segments, Joi } = require('celebrate');
module.exports = app => {
    let movies = app.controllers.movies;

    app.post('/movies', celebrate({
        [Segments.BODY]: Joi.object().keys({
            imdb_code: Joi.string().required(),
            title: Joi.string().required(),
            title_real: Joi.string().required(),
            year: Joi.number().integer().min(0).max(2099).required(),
            rating: Joi.number().min(0).max(10).required(),
            runtime: Joi.number().required(),
            genres: Joi.string().required(),
            description_full: Joi.string().required(),
            description_intro: Joi.string().required(),
            yt_trailer_code: Joi.string().allow('').uri().optional(),
            language: Joi.string().required(),
            background_image: Joi.string().uri().required(),
            small_cover_image: Joi.string().uri().optional(),
            medium_cover_image: Joi.string().uri().optional(),
            large_cover_image: Joi.string().uri().optional(),
        })
    }), movies.createNew);
    app.get('/movies', celebrate({
        [Segments.QUERY]: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }), movies.getAll);
    app.get('/movies/search', celebrate({
        [Segments.QUERY]: Joi.object({
            q: Joi.string().required(),
        })
    }), movies.searchName);
    app.get('/movies/:id', celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().hex().required(),
        })
    }), movies.getWithID);
    app.put('/movies/:id', celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().hex().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
            imdb_code: Joi.string().optional(),
            title: Joi.string().optional(),
            title_real: Joi.string().optional(),
            year: Joi.number().integer().min(0).max(2099).optional(),
            rating: Joi.number().min(0).max(10).optional(),
            runtime: Joi.number().optional(),
            genres: Joi.string().optional(),
            description_full: Joi.string().optional(),
            description_intro: Joi.string().optional(),
            yt_trailer_code: Joi.string().allow('').uri().optional(),
            language: Joi.string().optional(),
            background_image: Joi.string().uri().optional(),
            small_cover_image: Joi.string().uri().optional(),
            medium_cover_image: Joi.string().uri().optional(),
            large_cover_image: Joi.string().uri().optional(),
        })
    }), movies.updateWithID);
    app.delete('/movies/:id', celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().hex().required(),
        })
    }), movies.deleteWithID);    
    
}
