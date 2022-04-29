import mongoose from 'mongoose';

const MongoDb = process?.env.NEXT_PUBLIC_MONGO_URI || '';

const connectDb = async () => {
  try {
    mongoose.connect(MongoDb);
    console.log('🔥 DataBase success connect 🔥');
  } catch (err) {
    console.log('❌ Error connecting to database ❌');
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
