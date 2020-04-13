const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
    
describe('MOVIES', () => {
    let idMovies = '',
        dataMovies = '';
    beforeAll(async () => {
        await connection.migrate.rollback();
    });
    beforeEach(async () => {
        await connection.migrate.latest();
    });
    afterAll(async () => {
        await connection.destroy();
    })
    
    it('should be able to create a new MOVIES', async () => {
        const resp = await request(app)
            .post(`/movies`)
            .send({
                imdb_code: "tt4154796",
                title: "Vingadores: Ultimato",
                title_real: "Avengers: Endgame",
                year: 2019,
                rating: '8.4',
                runtime: 181,
                genres: "Action, Adventure, Drama",
                description_full: "As coisas na Terra estão caóticas. Depois do poder das Joias do Infinito dizimar metade da população, Thanos vestiu a manta de comandante do universo, deixando os Vingadores em sua completa ruína. O semideus irá expandir seu reino tirânico, a não ser que alguém consiga impedi-lo. Então, sem tempo para sofrer pela perda de seus amigos, Viúva Negra (Scarlett Johansson), Thor (Chris Hemsworth), Capitão América (Chris Evans) e Bruce Banner (Mark Ruffalo) devem permanecer resilientes e encontrar os últimos membros de sua força-tarefa – e chamar os serviços da Capitã Marvel. Juntos, eles devem descobrir um jeito de reaver seus aliados dizimados e derrotar Thanos, ou sofrer com uma existência sem esperança.",
                description_intro: "As coisas na Terra estão caóticas. Depois do poder das Joias do Infinito dizimar metade da população, Thanos vestiu a manta de comandante do universo, deixando os Vingadores em sua completa ruína.",
                yt_trailer_code: "https://www.youtube.com/watch?v=g6ng8iy-l0U",
                language: "Português",
                background_image: "https://yts.mx/assets/images/movies/avengers_endgame_2019/small-cover.jpg",
                small_cover_image: "https://yts.mx/assets/images/movies/avengers_endgame_2019/small-cover.jpg",
                medium_cover_image: "https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg",
                large_cover_image: "https://yts.mx/assets/images/movies/avengers_endgame_2019/large-cover.jpg"
            });
        
        expect(resp.body).toHaveProperty('id');
        expect(resp.body.id).toHaveLength(8);
        idMovies = resp.body.id;
    });
    it('should be able to return MOVIES', async () => {        
        const resp = await request(app)
            .get(`/movies/${idMovies}`);
        expect(resp.body).toHaveProperty('imdb_code');
        expect(resp.body).toHaveProperty('title'); 
        expect(resp.body).toHaveProperty('title_real'); 
        expect(resp.body).toHaveProperty('year'); 
        expect(resp.body).toHaveProperty('rating'); 
        expect(resp.body).toHaveProperty('runtime'); 
        expect(resp.body).toHaveProperty('genres');
        expect(resp.body).toHaveProperty('description_full');
        expect(resp.body).toHaveProperty('description_intro');
        expect(resp.body).toHaveProperty('language');
        expect(resp.body).toHaveProperty('background_image');
        dataMovies = resp.body;
        delete  dataMovies['torrents'];
    });

    it('should be able to return all MOVIES', async () => {     
        const resp = await request(app)
            .get(`/movies`);
        expect(resp.body).toEqual([dataMovies]);
    });

    it('should be able to return search title in MOVIES', async () => {     
        const resp = await request(app)
            .get(`/movies/search?q=Vingadores`);
        expect(resp.body).toEqual([dataMovies]);
    });

    it('should be able to update MOVIES', async () => {        
        const resp = await request(app)
            .put(`/movies/${idMovies}`)
            .send({
                title: "Vingadores: Ultimato 2019"
            });
        expect(resp.body).toHaveProperty('id');
        expect(resp.body.id).toHaveLength(8);
    });

    it('should be able to update MOVIES', async () => {        
        const resp = await request(app)
            .delete(`/movies/${idMovies}`);
            expect(resp.status).toBe(204);
    });
});