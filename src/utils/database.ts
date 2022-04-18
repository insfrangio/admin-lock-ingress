import mongoose from 'mongoose';
const connection = {};

async function name() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connection(process.env.MONGO_URI, {
    useNewUrlParser: true
  });

  connection.isConnected = db.connections[0].readyState;
}

// const client = new MongoClient(process.env.DATABASE_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const connect = async () => {
//   await client.connect()
// }
