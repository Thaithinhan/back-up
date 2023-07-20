const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const { default: helmet } = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const CreateError = require('http-errors');
const userRouter = require('../app/routes/userRoute');
const followRouter = require('../app/routes/followRoute');
const tweetRouter = require('../app/routes/tweetRoute');
const commentRouter = require('../app/routes/commentRoute');
const chatRoute = require('./routes/chatRoute');
const notificationRoute = require('./routes/NotificationRoute');
const orderRoute = require('./routes/orderRoute');

//Middelware
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(helmet());
const corsOptions = {
  origin: ['http://localhost:3000', 'https://back-up-one.vercel.app'],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const dirname = path.join(__dirname, '../../public');

app.use(express.static(dirname));

//databasee
require('../libraries/database/connect.mongo');

//route
app.use('/users', userRouter);
app.use('/follow', followRouter);
// app.use('/api/OauthGoogle', googleRouter);
app.use('/tweets', tweetRouter);
app.use('/comments', commentRouter);
app.use('/chats-messages', chatRoute);
app.use('/notifications', notificationRoute);
app.use('/orders', orderRoute);

//handle error

module.exports = app;
