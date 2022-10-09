const Message = require('../models/message');

module.exports = {
        async create(req, res,next){
            try {
                const message = req.body;
                const data = await Message.create(message);
                
                return res.status(201).json({
                    message: 'El mensaje se ha creado correctamente',
                    succes: true,
                    data : data.id
            },);

              
            } catch (error) {
                console.log(error);
                return res.status(501).json({
                    message: 'No se pudo crear el mensaje',
                    succes: false,
                    error:error

                });
            }
        },

        async findByChat(req, res,next){
            try {
                const id_chat = req.params.id_chat;
                const data = await Message.findByChat(id_chat)                
                return res.status(201).json(data);
                              
            } catch (error) {
                console.log(error);
                return res.status(501).json({
                    message: 'No se pudo leer los mensajes',
                    succes: false,
                    error:error

                });
            }
        }

}