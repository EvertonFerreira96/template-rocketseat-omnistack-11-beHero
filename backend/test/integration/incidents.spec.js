const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', ()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async ()=>{
        await connection.destroy();
     });

     it('should be able to create Incident',async () => {
         await request(app).post('/incidents').send({
                                title: "teste titulo 01",
                                description: "teste descrição 01",
                                value: 100}).set('ong_id','6d5796f1');                 
        
        await request(app).post('/incidents').send({
                                    title: "teste titulo 02",
                                    description: "teste descrição 02",
                                    value: 100}).set('ong_id','6d5796f1');
     });

    it('should be able to request Incidents in Ong', async ()=>{
        const response = await request(app).get('/profile').set('ong_id','6d5796f1').expect(200);
        console.log(response.body.length);
    });
});