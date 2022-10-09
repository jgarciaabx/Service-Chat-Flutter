module.exports = (io) => {

    const chatNSP = io.of('/chat');
    chatNSP.on('connection', function(socket){
        console.log('USUARIO SE CONECTO AL SOCKET IO', socket.id);


        socket.on('message', function(data){
            console.log('nuevo mensaje', data);
            chatNSP.emit(`message/${data.id_chat}`, data);
        });

        socket.on('disconnect', function(data){
            console.log('UN USUARIO SE DESCONECTO', socket.id);
        });

    });


}