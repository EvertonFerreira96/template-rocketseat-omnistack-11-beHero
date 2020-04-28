const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async ()=>{
        await connection.destroy();
     });
    it('should be able to create a new Ong', async ()=>{
        const response = await request(app)
                        .post('/ongs')
                        .send({	
                            name: "Globo", 
                            email: "globo@play.com",
                            whatsapp: "01234567891",
                            city: "Rio de Janeiro",
                            uf: "RJ"});
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

         
    it('should be able to request Ongs', async ()=>{
        await request(app).get('/ongs').expect(200);
    });

     
});
