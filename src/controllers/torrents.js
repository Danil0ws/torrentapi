const moment = require('moment');
const connection = require('./../database/connection');
const generateUniqueId = require('./../utils/generateUniqueId');

module.exports = app => {
    this.createNew = async (req, res) => {
        const { hash, quality, type, seeds, peers, size, size_bytes } = req.body;
        const { movies_id } = req.headers;

        const id = generateUniqueId();
        const date_uploaded = moment().format();
        const date_uploaded_unix = moment().unix();        
        try {
            const createNewTorrents = await connection('torrents')
                .insert({
                    id,
                    hash, 
                    quality, 
                    type, 
                    seeds, 
                    peers, 
                    size, 
                    size_bytes, 
                    date_uploaded, 
                    date_uploaded_unix,
                    movies_id
                });
            if (!createNewTorrents) {
                throw new Error();                
            }
            return res.status(201).json({ id });
        }
        catch (e) {
            return res.status(406).json({ error: 'No TORRENT create' });
        }
    }
    this.getAll = async (req, res) => {
        const { page = 1, limit = 3 } = req.query;
        try {
            const selectAllTorrents = await connection('torrents')
                .limit(limit)
                .offset(( page - 1 ) * limit)
                .select('*');
            if (!selectAllTorrents) {
                throw new Error();                
            }
            return res.status(200).json(selectAllTorrents);
        }
        catch (e) {
            return res.status(400).json({ error: 'No TORRENT found' });
        }
    }
    this.getWithID = async (req, res) => {
        const { id } = req.params;
        try {
            const selectTorrentsId = await connection('torrents')
                .select('*')
                .where('id', id)
                .first();            
            if (!selectTorrentsId) {
                throw new Error();                
            }
            return res.status(200).json(selectTorrentsId);
        }
        catch (e) {
            return res.status(400).json({ error: 'No TORRENT found with this ID'});
        }
    }
    this.deleteWithID = async (req, res) => {
        const { id } = req.params;
        try {
            const deleteTorrentsId = await connection('torrents')
                .where('id', id)
                .delete();
            if (!deleteTorrentsId) {
                throw new Error();                
            }
            return res.status(204).json({ msg: 'TORRENT with this ID delete with success' });
        }
        catch (e) {
            return res.status(406).json({ error: 'No TORRENT found with this ID' });
        }
    }
    this.updateWithID = async (req, res) => {
        const { id } = req.params;
        try {
            const updateTorrentsId = await connection('torrents')
                .where('id', id)
                .update(req.body);
            if (!updateTorrentsId) {
                throw new Error();                
            }
            return res.status(202).json({ id });
        }
        catch (e) {
            return res.status(406).json({ error: 'No TORRENT found with this ID' });
        }
    }
    return this;
}