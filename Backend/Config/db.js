import mongoose from 'mongoose';

// Register global connection event listeners before establishing connection
mongoose.connection.on('connected', () => {
    console.log('✅ [MongoDB Lifecycle] MongoDB connection successfully established.');
});

mongoose.connection.on('error', (err) => {
    console.error(`❌ [MongoDB Lifecycle] Ongoing Connection Error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ [MongoDB Lifecycle] MongoDB disconnected! Attempting reconnect or checking network...');
});

mongoose.connection.on('reconnected', () => {
    console.log('🔄 [MongoDB Lifecycle] MongoDB reconnected successfully.');
});

const connectDB = async (retryCount = 0) => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment variables (.env file).');
        }

        // Safe URL component diagnostic check
        try {
            const parsedUrl = new URL(uri);
            console.log(`[Database Config] User: ${parsedUrl.username || '(none)'}`);
            console.log(`[Database Config] Host: ${parsedUrl.hostname}`);
            console.log(`[Database Config] Database: ${parsedUrl.pathname.replace('/', '') || 'default'}`);
        } catch {
            console.log(`[Database Config] Using connection string from .env`);
        }

        // Connect with timeout resilience options
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of hanging indefinitely
            socketTimeoutMS: 45000,          // Close sockets after 45 seconds of inactivity
            maxPoolSize: 10,                 // Maintain up to 10 socket connections
            family: 4,                       // Use IPv4, skip IPv6 resolution delays
        });

        console.log(`✅ [MongoDB Init] Connected to Cluster Host: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ [MongoDB Connection Error] Attempt ${retryCount + 1} failed: ${error.message}`);
        console.warn('⚠️ Retrying MongoDB connection in 5 seconds...');
        setTimeout(() => connectDB(retryCount + 1), 5000);
    }
};

export default connectDB;