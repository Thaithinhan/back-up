'use strict';
const mongoose = require('mongoose');
const config = require('../../configs/mongo.config');

const connectDB = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
console.log(connectDB);

//using Design Pattern
class Database {
  constructor() {
    this.connect();
  }
  //connect
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectDB, {
        maxPoolSize: 50,
      })
      .then((_) => {
        console.log('Connect MongoDB successfully');
      })
      .catch((err) => console.log('Error Connect', err));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;
