const UsersController = require('../controllers/usersController');


module.exports = (app,upload) =>{
    //TRAER DATOS >:V 0
    // app.get('/api/users/getAll/:id',passport.authenticate('jwt', {session: false}), UsersController.getAll); //con seguridad de token JWT
    app.get('/api/users/getAll/:id', UsersController.getAll);

    //GUARDAR DATOS 
    app.post('/api/users/create', UsersController.register);
    app.post('/api/users/registerWithImage', upload.array('image', 1), UsersController.registerWithImage);
    app.post('/api/users/login', UsersController.login);
}