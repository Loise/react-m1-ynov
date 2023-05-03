const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let interval;
const usersConnected = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  console.log(socket.id);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('user login', (user) => {
    if (!usersConnected.find((u) => u.id == user.id)) {
      usersConnected.push({user, socketId: socket.id});
      io.emit('new user list', usersConnected);
    }
    io.emit('new login', user);
  });

  socket.on("logout", () => {
    console.log("Client disconnected");
    console.log(socket.id);
    var i = usersConnected.findIndex((u) => u.socketId == socket.id);
    if(i >= 0)  {
      usersConnected.splice(i, 1);
      io.emit('new user list', usersConnected);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    console.log(socket.id);
    let i = usersConnected.findIndex((u) => u.socketId == socket.id);
    if(i >= 0)  {
      usersConnected.splice(i, 1);
      io.emit('new user list', usersConnected);
    }
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));