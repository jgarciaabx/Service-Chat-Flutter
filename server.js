const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const res = require('express/lib/response');
const passport = require('passport'); 
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const io = require('socket.io')(server);

/*
* SOCKETS 
*/
const chatSocket = require('./sockets/chat_socket');

/*
*INICIALIZAR FIREBASE ADMIN
*/

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const upload = multer({
    storage: multer.memoryStorage(),                                                                                                                                                                        
})






/*
*RUTAS 
*/

const users = require('./routes/users.Routes'); 
const chats= require('./routes/chatRoutes');    
const message= require('./routes/messageRoutes');  

const { initializeApp } = require('firebase-admin');

const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
    
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');


app.set('port', port);
chatSocket(io);

var ip = '192.168.18.2'
/*
* LLAMANDOA LAS RUTAS 
*/
users(app, upload);
chats(app);
message(app, upload);

server.listen(3000, ip, function(){
    console.log('Aplicacion NodeJs ' + port + ' iniciado')
});




//ERROR HANDLED
app.use((err, req, next) => {
console.log(err);
res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app :app,
    server : server
}