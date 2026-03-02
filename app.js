require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Models
const seller = require('./models/sellermodel');
const doctor = require('./models/doctormodel');
const user = require('./models/usermodel');
const admin = require('./models/adminmodel');
const animals = require('./models/animalmodel');
const Category = require('./models/categorymodel');
const cart = require('./models/cartmodel');

// Middleware
const checkAdmin = require('./middleware/checkAdmin');
const checkUser = require('./middleware/checkuser');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configure sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_change_this',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 30,
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1230000,
  },
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  tlsInsecure: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware setup
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import and use routers
const sellerRouter = require('./router/sellerrouter');
const doctorRouter = require('./router/doctorrouter');
const userRouter = require('./router/userrouter');
const adminRouter = require('./router/adminrouter');
const animalRouter = require('./router/animalsrouter');
const searchRouter = require('./router/searchrouter');
const fodderRouter = require('./router/fodderrouter');
const orderRouter = require('./router/orderrouter');

app.use('/', sellerRouter);
app.use('/', doctorRouter);
app.use('/', userRouter);
app.use('/', adminRouter);
app.use('/', animalRouter);
app.use('/', searchRouter);
app.use('/', fodderRouter);
app.use('/', orderRouter);

const chatRouter = require('./router/chatrouter');
app.use('/chat', chatRouter);

// Socket.IO setup for real-time chat
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('chat-message', (data) => {
    io.to(data.roomId).emit('chat-message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
