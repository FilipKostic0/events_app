import mongoose from "mongoose";

// Define the connection cache type
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Validate MongoDB URI exists
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

 // Initialize the cache on the global object to persist across hot reloads in development
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}


//  Establishes and returns a connection to MongoDB
async function connectToDatabase(): Promise<typeof mongoose> {
 
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable command buffering for better error handling
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose)=> {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
