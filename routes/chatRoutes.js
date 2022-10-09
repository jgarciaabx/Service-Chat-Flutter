const UsersController = require('../controllers/chatController');
const passport = require('passport');
const chatController = require('../controllers/chatController');

module.exports = (app) =>{
        
    //GUARDAR DATOS 
    app.post('/api/chats/create', chatController.create);
    
}