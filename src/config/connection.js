import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB');

export default mongoose.connection;
