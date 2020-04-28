const connection = require('../database/connection');

module.exports = {
    async store(req,res){
        const {title, description, value} = req.body; 
        const {ong_id} =  req.headers;   
        const [id] = await connection('incidents').insert({
            ong_id,
            title,
            description,
            value,
        });
        return res.json(id);
    },

    async index(req, res){
       const { page = 1 } = req.query;
       const [count] = await connection('incidents').count();
       
       const data = await connection('incidents')
                          .join('ongs','ongs.id', '=', 'incidents.ong_id')
                          .limit(5)
                          .offset((page - 1) * 5)
                          .select([
                              'incidents.*',
                              'ongs.name',
                              'ongs.email',
                              'ongs.whatsapp',
                              'ongs.city',
                              'ongs.uf',
                          ]);
                
              res.header('X-Total-Count', count['count(*)']);
       return res.json(data);
    },

    async delete(req,res){
        const {id} = req.params;
        const {ong_id} = req.headers;

        try{

        const incident = await connection('incidents')
                    .where('id',id)
                    .select('ong_id')
                    .first();

        console.log(incident);
        console.log(ong_id);

        if(incident.ong_id !== ong_id)
            return res.status(401).json({error: 'Operation not permited.'});
        
        await connection('incidents').where('id',id).delete();

        return res.status(204).send();}
        catch(err){
            return res.status(401).json({error: 'Operation with error.'});
        }
    }
}