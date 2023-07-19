const ChatSchema = require('../models/schemas/chat.schemas')
const MessageSchema  = require('../models/schemas/message.schema')

//Tạo phòng chat
exports.createChat = async (req, res) => {
  try {
    const newChat = new ChatSchema({
      participants: req.body.participants,
    });

    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};


//LẤY PHÒNG CHAT
exports.getChats = async (req, res) => {
  try {
    const chats = await ChatSchema.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};


//TẠO MESSAGE CHO ĐỐI TƯỢNG
exports.createMessage = async (req, res) => {
  try {
    const newMessage = new MessageSchema({
      chat: req.body.chatId,
      sender: req.body.senderId,
      content: req.body.content,
    });

    await newMessage.save();

    const io = req.app.get('socketio');
    io.to(req.body.chatId).emit('newMessage', newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};


//LẤY MESSAGE 
exports.getMessages = async (req, res) => {
  try {
    const messages = await MessageSchema.find({ chat: req.params.chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};