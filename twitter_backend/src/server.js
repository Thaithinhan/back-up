const app = require('./app/app');
// Đoạn code khởi tạo eventEmitter và socket.io
const events = require('events');
const eventEmitter = new events.EventEmitter();

const { Server } = require('http');
const httpServer = new Server(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // replace with your client URL
    methods: ['GET', 'POST'],
  },
}); //Khoier tạo instance của Class

// Tạo một server HTTP từ Express app
app.set('eventEmitter', eventEmitter);
app.set('socketio', io); // tạo biến toàn cục để sử dụng ở những noi khác

io.on('connection', (socket) => {
  console.log('a user connected');
});

const port = 4000;
httpServer.listen(port, () => {
  console.log(`Server run on port http://localhost:${port}`);
});
