import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to octofit_db');
    return true;
  } catch (error) {
    console.warn('MongoDB unavailable, continuing without database connection:', error);
    return false;
  }
}

mongoose.connection.on('error', (error) => {
  console.warn('MongoDB connection error:', error);
});

export default connectToDatabase;
