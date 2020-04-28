const express = require('express');
const {celebrate, Joi, Segments} = require('celebrate');

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileOngController = require('./controllers/profileOngController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();


routes.post('/session',sessionController.create);


routes.get('/profile', celebrate({
    [Segments.HEADERS] : Joi.object({
        ong_id: Joi.string().required(),
    }).unknown(),
}), profileOngController.index); 

routes.get('/ongs', ongController.index); 
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11) ,
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}) ,ongController.store);

routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({ 
        page: Joi.number(),
    }),
}) , incidentController.index); 

routes.post('/incidents', celebrate({
    [Segments.HEADERS] : Joi.object({
        ong_id: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(), 
        description: Joi.string().required(), 
        value: Joi.number().required(),
    }),

}), incidentController.store);
routes.delete('/incidents/:id', celebrate({
     [Segments.PARAMS]: Joi.object().keys({
         id: Joi.number().required(),
     }), 
}), incidentController.delete);

module.exports = routes; 