const Message = require('../controllers/messageController');
const passport = require('passport');


module.exports = (app,upload) =>{
        
    //GUARDAR DATOS 
    app.get('/api/messages/findByChat/:id_chat', Message.findByChat);

    app.post('/api/messages/create', Message.create);
    
}