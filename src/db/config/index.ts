// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const MongoDb = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MongoDb, {
      useNewUrlParser: true
    });
    console.log('🔥 DataBase success connect 🔥');
  } catch (err) {
    console.log('❌ Error connecting to database ❌');
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
