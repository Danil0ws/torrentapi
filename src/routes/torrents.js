const { celebrate, Segments, Joi } = require('celebrate');
module.exports = (app, connection) => {
    let torrents = app.controllers.torrents;

    app.post('/torrents', celebrate({
        [Segments.BODY]: Joi.object().keys({
            hash: Joi.string().required(),
            quality: Joi.string().required(),
            type: Joi.string().required(),
            seeds: Joi.number().required(),
            peers: Joi.number().required(),
            size: Joi.string().required(),
            size_bytes: Joi.number().required(),
        }),
        [Segments.HEADERS]: Joi.object({
            movies_id: Joi.string().required()
        }).unknown()
    }), torrents.createNew);
    app.get('/torrents', celebrate({
        [Segments.QUERY]: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        })
    }), torrents.getAll);
    app.get('/torrents/:id', celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().hex().required(),
        })
    }), torrents.getWithID);
    app.put('/torrents/:id', celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().hex().required(),
        }),
        [Segments.BODY]: Joi.object().keys({            
            hash: Joi.string().optional(),
            quality: Joi.string().optional(),
            type: Joi.string().optional(),
            seeds: Joi.number().optional(),
            peers: Joi.number().optional(),
            size: Joi.number().optional(),
            size_bytes: Joi.number().optional(),
            size_bytes: Joi.number().optional(),
        })
    }), torrents.updateWithID);
    app.delete('/torrents/:id', celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().hex().required(),
        })
    }), torrents.deleteWithID);
}