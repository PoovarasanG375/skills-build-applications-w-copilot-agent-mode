"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function connectToDatabase() {
    if (mongoose_1.default.connection.readyState === 1) {
        return true;
    }
    try {
        await mongoose_1.default.connect(connectionString, { serverSelectionTimeoutMS: 2000 });
        console.log('Connected to octofit_db');
        return true;
    }
    catch (error) {
        console.warn('MongoDB unavailable, continuing without database connection:', error);
        return false;
    }
}
mongoose_1.default.connection.on('error', (error) => {
    console.warn('MongoDB connection error:', error);
});
exports.default = connectToDatabase;
