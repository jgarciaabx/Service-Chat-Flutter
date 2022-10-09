const Chat = require('../models/chat');

module.exports = {
        async create(req, res,next){
            try {
                const chat = req.body;              
                const existChat = await Chat.findByUser1AndUser2(chat.id_user1, chat.id_user2);
                              
                 if(existChat){
                    console.log('ACTUALIZO CHAT');
                    await Chat.update(chat);  
                    return res.status(201).json({
                        message: 'El chat se ha creado correctamente',
                        succes: true,
                        data : existChat.id
                    });
                }
                else{
                    console.log('SE CREO EL CHAT');
                    const data = await Chat.create(chat);                
                    return res.status(201).json({
                            message: 'El chat se ha creado correctamente',
                            succes: true,
                            data : data.id
                    });
                }   
              
            } catch (error) {
                console.log(error);
                return res.status(501).json({
                    message: 'No se pudo crear el chat',
                    succes: false,
                    error:error

                });
            }
        }

}