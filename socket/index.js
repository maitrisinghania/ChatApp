import { Server } from "socket.io";

const io = new Server(9000, {
    cors: {
        origin: `http://localhost:3000`
    }
})

let users = [];

const addUser = (userData, socketId) => {
    const userExists = users.some(user => user.sub === userData.sub && user.socketId === socketId);
    if (!userExists) {
        users.push({ ...userData, socketId });
        io.emit("getUsers", users);
    }
};

const getUser = (userId) => {
    return users.filter(user => user.sub === userId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}


io.on('connection', (socket) => {
    console.log('user connected');

    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers",users);
    })

    socket.on('sendMessage', (data) => {
        const userSockets = getUser(data.receiverId);
        if (userSockets.length > 0) {
            userSockets.forEach((user) => {
                io.to(user.socketId).emit('getMessage', data);
            });
        }
        
    });

    socket.on("newConversation", () => {
        io.emit("newConversation");  // Notify all clients that a new conversation has been created
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
    
})