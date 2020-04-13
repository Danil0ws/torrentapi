const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
    
describe('TORRENTS', () => {
    let idTorrents = '',
        dataTorrents = '';
    
    beforeAll(async () => {
        await connection.migrate.rollback();
    });
    beforeEach(async () => {
        await connection.migrate.latest();
    });
    afterAll(async () => {
        await connection.destroy();
    })
    
    it('should be able to create a new TORRENTS', async () => {
        const resp = await request(app)
            .post(`/torrents`)
            .set({ movies_id: 'bc4c70b9' })
            .send({
                hash: "magnet:?xt=urn:btih:68AF364B594381C6FDF93A5A798DE74C3FC5E8E9&dn=Vingadores%20-%20Ultimato%202019%20%28720p%20-%20BluRay%29&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2f9.rarbg.to%3a2730%2fannounce&tr=udp%3a%2f%2fexplodie.org%3a6969%2fannounce&tr=http%3a%2f%2fglotorrents.pw%3a80%2fannounce&tr=udp%3a%2f%2fp4p.arenabg.com%3a1337%2fannounce&tr=udp%3a%2f%2ftorrent.gresille.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.aletorrenty.pl%3a2710%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.piratepublic.com%3a1337%2fannounce",
                quality: "720p",
                type: "mkv",
                seeds: "312",
                peers: "95",
                size: "2.72gb",
                size_bytes: "2720000000"
            });
        
        expect(resp.body).toHaveProperty('id');
        expect(resp.body.id).toHaveLength(8);
        idTorrents = resp.body.id;
    });

    it('should be able to return TORRENTS', async () => {        
        const resp = await request(app)
            .get(`/torrents/${idTorrents}`);
        expect(resp.body).toHaveProperty('hash');
        expect(resp.body).toHaveProperty('quality'); 
        expect(resp.body).toHaveProperty('type'); 
        expect(resp.body).toHaveProperty('seeds'); 
        expect(resp.body).toHaveProperty('peers'); 
        expect(resp.body).toHaveProperty('size'); 
        expect(resp.body).toHaveProperty('size_bytes');
        dataTorrents = resp.body;
    });

    it('should be able to return all TORRENTS', async () => {     
        const resp = await request(app)
            .get(`/torrents`);
        expect(resp.body).toEqual([dataTorrents]);
    });

    it('should be able to update TORRENTS', async () => {        
        const resp = await request(app)
            .put(`/torrents/${idTorrents}`)
            .send({
                hash: "magnet:?xt=urn:btih:68AF364B594381C6FDF93A5A798DE74C3FC5E8E9"
            });
        expect(resp.body).toHaveProperty('id');
        expect(resp.body.id).toHaveLength(8);
    });

    it('should be able to update TORRENTS', async () => {        
        const resp = await request(app)
            .delete(`/torrents/${idTorrents}`);
            expect(resp.status).toBe(204);
    });
});