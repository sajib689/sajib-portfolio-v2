import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;

// Store connection globally to avoid multiple connections in dev
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

const ConnectDb = async () => {
    if (cached.conn) {
        // Use existing connection
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((mongooseInstance) => {
            const dbName = mongooseInstance.connection.name;
            console.log(`✅ Connected to MongoDB! Database: ${dbName}`);
            return mongooseInstance;
        }).catch((error: any) => {
            console.error("🔥 MongoDB connection error:", error.message);
            throw new Error("Database connection failed");
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default ConnectDb;
