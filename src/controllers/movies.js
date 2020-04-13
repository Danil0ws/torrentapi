const moment = require('moment');
const connection = require('./../database/connection');
const generateUniqueId = require('./../utils/generateUniqueId');

module.exports = app => {
    this.createNew = async (req, res) => {
        const { imdb_code, title, title_real, year, rating, runtime, genres, description_intro, description_full, yt_trailer_code, language, background_image, small_cover_image, medium_cover_image, large_cover_image } = req.body;

        const id = generateUniqueId();
        const date_uploaded = moment().format();
        const date_uploaded_unix = moment().unix();

        try {
            const createNewMovies = await connection('movies')
                .insert({
                    id,
                    imdb_code, 
                    title, 
                    title_real, 
                    year,
                    rating, 
                    runtime, 
                    genres, 
                    description_intro, 
                    description_full, 
                    yt_trailer_code, 
                    language, 
                    background_image, 
                    small_cover_image, 
                    medium_cover_image, 
                    large_cover_image, 
                    date_uploaded, 
                    date_uploaded_unix
                });
            
            if (!createNewMovies) {
                throw new Error();                
            }
            return res.status(201).json({ id });
        }
        catch (e) {
            return res.status(406).json({ error: 'No MOVIE create' });
        }
    }
    this.getAll = async (req, res) => {
        const { page = 1, limit = 3 } = req.query;
        try {
            const selectAllMovies = await connection('movies')                
                .limit(limit)
                .offset(( page - 1 ) * limit)
                .select('*');
            if (!selectAllMovies) {
                throw new Error();                
            }
            return res.status(200).json(selectAllMovies);
        }
        catch (e) {
            return res.status(400).json({ error: 'No MOVIE found' });
        }
    }
    this.searchName = async (req, res) => {
        const { q, page = 1, limit = 3 } = req.query;
        try {
            const searchAllMovies = await connection('movies')
                .where('title', 'like', '%'+q+'%')    
                .limit(limit)
                .offset(( page - 1 ) * limit)
                .select('*');
            if (!searchAllMovies) {
                throw new Error();                
            }
            return res.status(200).json(searchAllMovies);
        }
        catch (e) {
            return res.status(400).json({ error: `No MOVIE found by query: ${q}` });
        }
    }
    this.getWithID = async (req, res) => {
        const { id } = req.params;
        try {
            const selectMoviesId = await connection('movies')
                .where('id', id)                
                .select('*')
                .first();
            const selectTorrentId = await connection('torrents')
                .where('movies_id', selectMoviesId.id)
                .select([
                    'id',
                    'hash',
                    'quality',
                    'type',
                    'seeds',
                    'peers',
                    'size',
                    'size_bytes',
                    'date_uploaded',
                    'date_uploaded_unix'
                ]);
            if (!selectMoviesId) {
                throw new Error();                
            }
            selectMoviesId['torrents'] = selectTorrentId;
            return res.status(200).json(selectMoviesId);
        }
        catch (e) {
            return res.status(400).json({ error: 'No MOVIE found with this ID'});
        }
    }
    this.deleteWithID = async (req, res) => {
        const { id } = req.params;
        try {
            const deleteMoviesId = await connection('movies')
                .where('id', id)
                .delete();
            if (!deleteMoviesId) {
                throw new Error();                
            }
            return res.status(204).json({ msg: 'MOVIE with this ID delete with success' });
        }
        catch (e) {
            return res.status(406).json({ error: 'No MOVIE found with this ID' });
        }
    }
    this.updateWithID = async (req, res) => {
        const { id } = req.params;
        try {
            const updateMoviesId = await connection('movies')
                .where('id', id)
                .update(req.body);
            if (!updateMoviesId) {
                throw new Error();                
            }
            return res.status(202).json({ id });
        }
        catch (e) {
            return res.status(406).json({ error: 'No MOVIE found with this ID' });
        }
    }
    return this;
}