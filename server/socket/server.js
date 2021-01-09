require('dotenv').config();
const User = require("../models/user");
const Game = require("../models/game");
const Room = require("../models/room");

module.exports = function(app) {
    const getUserInfo = async (id) => {
        const user = await User.findOne({gameId: id});
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
            socket.broadcast.emit('new-room-data', data);
        }) 
        //on quick match
        socket.on('send-join-game', (data) => {
            socket.broadcast.emit('new-join-game', data);
        })
        //on join room 
        socket.on('join-room', async ({id, userId, userName, userCoins, roomType, timer, password, coins}) => {
              socket.join(id);
              let room = await Room.findOne({roomID: id});
              let game = null;
              //receive chat
              socket.on("send-chat", async (message) => {
                message.socket = socket.id;
                socket.to(id).emit("new-message", message);
                if(game) {
                  if(game.chat) game.chat.push(message);
                  else game.chat = [message];
                  await game.save();
                }               
              });
              //receive game data
              socket.on("send-game-data", async (data) => {
                if(!game.status) {
                  socket.to(id).emit("new-game-data", data);
                  const {x, y, player, status} = data;
                  if(status) {
                    game.status = (status.winner == "X") ? 1 : 2;
                    game.winner = `${status.winner}: ${room[status.winner].name}`;
                  }
                  game.history.push({x, y, player, timestamp: Date.now()});
                  await game.save();
                  if(!game.history.length) {
                    room.lastGameInRoom = Date.now();
                    room.save();
                  }
                }                
              });
              socket.on("send-game-request", async (data) => {
                socket.to(id).emit("new-game-request", data);
                if(game && data.type == "DRAW") {
                  const message = {roomID: id, message: `Game thủ ${userName} xin thủ hoà`, timestamp: Date.now(), owner: userName}
                  if(game.chat) game.chat.push(message);
                  else game.chat = [message];
                  await game.save();
                }
                socket.on("game-reply-to-server", async (data) => {
                  room = await Room.findOne({roomID: id});
                  if(room) {
                    const {accept, type} = data;
                    if(accept) {
                        if(type == "NEW") {
                            room.lastGameInRoom = Date.now();
                            await room.save();
                            game =  await Game.findOne({roomID: id, status: 0});
                            const user = await User.findOne({gameId: userId});
                            user.games.push({id: game._id});
                            user.save();
                        }
                    }
                  }                  
                })
              });
              socket.on("send-result-data", async (data) => {
                const {result} = data;
                socket.to(id).emit("new-result-data", data);
                room = await Room.findOne({roomID: id});
                if(room) {
                  game.status = result;
                  if (result == 1) game.winner = `X: ${room.X.name}`;
                  else if (result == 2) game.winner = `O: ${room.Y.name}`;
                  else game.winner = `None`;
                  game.save();
                  const current = await Room.findOne({roomID: room.roomID});
                  const [userX, userY] = await Promise.all([User.findOne({gameId: current.X.id}), User.findOne({gameId: current.Y.id})]);
                  userX.updateAfterGame(result == 1 ? 1 : 0, room.coins, result == 3);
                  userY.updateAfterGame(result == 2 ? 1 : 0, room.coins, result == 3); 
                  if(result == 1) {
                    current.X.coins += room.coins;
                    current.Y.coins -= room.coins;
                  } else if(result == 2) {
                    current.X.coins -= room.coins;
                    current.Y.coins += room.coins;
                  } else {
                  }
                  current.save();  
                }           
              })
              socket.on("send-game-reply", async (data) => {
                const {accept, type} = data;
                if(accept && type == "NEW") {
                  room = await Room.findOne({roomID: id});
                  room.lastGameInRoom = Date.now();
                  await room.save();
                  if(!!game.status) game = await new Game({roomID: id, start: Date.now(), status: 0});
                  else {
                      game.status = 4;
                      game.winner = `None`;
                      await game.save();
                      game = await new Game({roomID: id, start: Date.now(), status: 0});
                  }
                  await game.save();
                  socket.to(id).emit("new-game-reply", data); 
                  const user = await User.findOne({gameId: userId});
                  user.games.push({id: game._id});
                  user.save();
                } else socket.to(id).emit("new-game-reply", data); 
              })
              socket.on("leave-room", async ({id, userId}) => {
                  socket.leave(id);
                  room = await Room.findOne({roomID: id});
                  if(room) {
                    if((userId == room.X.id) && !room.Y.id) {
                        room.playerX = null;
                        await Room.deleteOne({roomID: id});
                        room = null;
                    }
                    else {
                      if(userId == room.Y.id) room.Y = {id: null, name: null, coins: null};
                      else if(userId == room.X.id && room.id) {
                        room.X = {...room.Y};
                        room.Y = {id: null, name: null, coins: null};
                      }
                      await room.save();
                    }
                  }
                  
              });
              if(userId) { //if player
                //init data (execute after add Listener)
                if(!room) {
                  room = await new Room({roomID: id, X: {id: userId, name: userName, coins: userCoins}, Y: {id:null, name: null, coins: null}, roomType, timer, password, coins});
                  await room.save();
                  game = await new Game({roomID: id, start: Date.now(), status: 0});
                  await game.save();
                } else if(!room.Y.id) {
                  room.Y = {id: userId, name: userName, coins: userCoins};
                  const [data1, data2] = await Promise.all([
                      room.save(),
                      Game.find({roomID: id, status: 0})
                  ])
                  game = data2[0];
                }
                const user = await User.findOne({gameId: userId});
                user.games.push({id: game._id});
                user.save(); 
              }
              
        });
        //on send disconnect
        socket.on('send-disconnect-request', () => {
            socket.disconnect(true);           
        });
    });
    server.listen(process.env.PORT);
}   


