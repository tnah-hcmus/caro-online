require('dotenv').config();
module.exports = function(app) {
    //set up socket
    const server = require('http').createServer(app);
    const options = { origins: '*:*'};
    const io = require('socket.io')(server, options);
    let userPool = {};

    io.on('connection', socket => { 
        //on first connection     
        const userId = socket.handshake.query.userId;
        if(!userPool[userId] && !Array.isArray(userPool[userId] )) userPool[userId] = [socket.id];
        else userPool[userId].push(socket.id);
        //on disconnect
        socket.on('disconnect', () => {   
            io.sockets.emit('update-user', Object.keys(userPool).length - 1);   
            const i = userPool[userId].indexOf(socket);
            userPool[userId].splice(i, 1);
        });

        io.sockets.emit('update-user', Object.keys(userPool).length);
        //on send disconnect
        socket.on('send-disconnect-request', () => {
            socket.disconnect(true);           
        });
    });
    server.listen(process.env.PORT);
}   


