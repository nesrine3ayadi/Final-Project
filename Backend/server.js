const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
const passport = require("passport")
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const users = require("./Routes/users");

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(passport.initialize())

app.use('./public', express.static('public'));

// passport conig 
require("./MiddleWare/passport")(passport)

//DB config
const db = require("./Config/keys").mongoURI;
//

// connect to database
mongoose
  .connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("The database is connected!"))
  .catch((err) => console.error(err));
 
  app.use('/public', express.static('public'));

  // Use Routes
  app.use('/', users);

//verify token function 
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// var app1 = require('express')();
// app1.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

//connect to server http of msg
io.on('connect', (socket) => {
  socket.on('join', ({ name, room, img }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, img });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room.`, img:`https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/116336921/original/54c80a5e1ded60a8bb64153bdd3677f95009c0f7/logo-design-high-quality.jpg`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`, img:`https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/116336921/original/54c80a5e1ded60a8bb64153bdd3677f95009c0f7/logo-design-high-quality.jpg` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
   
    io.to(user.room).emit('message', { user: user.name, text: message, img:user.img });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

http.listen(5001, () => {
  console.log('listening on *:5001');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server is running on port ${port}` ))

