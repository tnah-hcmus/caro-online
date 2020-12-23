require('dotenv').config();
const User = require("../models/user");

module.exports = function(app) {
    const getUserInfo = async (id) => {
        const user = await User.findById(id);
        if(user) return user.name;
        else return 'Anonymous';
    }
    //set up socket
    const server = require('http').createServer(app);
    const options = { origins: '*:*'};
    const io = require('socket.io')(server, options);
    let userPool = {};

    io.on('connection', async (socket) => { 
        //on first connection     
        const userId = socket.handshake.query.userId;
        const name = await getUserInfo(userId);
        if(!userPool[userId] && !Array.isArray(userPool[userId] )) userPool[userId] = {id: [socket.id], name};
        else userPool[userId].id.push(socket.id);
        let listUser = Object.keys(userPool).reduce((listUser, key) => [...listUser, userPool[key].name], []);
        io.sockets.emit('update-user', listUser);
        //on disconnect
        socket.on('disconnect', () => {     
            const i = userPool[userId].id.indexOf(socket);
            userPool[userId].id = userPool[userId].id.splice(i, 1);
            if(!userPool[userId].id.length) {
                delete userPool[userId];
                listUser = Object.keys(userPool).reduce((listUser, key) => listUser.push(userPool[key].name), []);
                io.sockets.emit('update-user', listUser); 
            }
        });
        socket.on('send-room-data', data => {
            console.log(data);
            socket.broadcast.emit('new-room-data', data);
        }) 
        //on join room 
        socket.on('join-room', (id) => {
              socket.join(id);
              //receive chat
              socket.on("send-chat", (message) => {
                socket.to(id).emit("new-message", message);
                //save chat here;
              });
              //receive game data
              socket.on("send-game-data", (data) => {
                socket.to(id).emit("new-game-data", data);
                //save move here;
              });
              socket.on("leave-room", id => {
                  socket.leave(id);
              })            
        });
        //on send disconnect
        socket.on('send-disconnect-request', () => {
            socket.disconnect(true);           
        });
    });
    server.listen(process.env.PORT);
}   


