import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        console.log(`[DEBUG] .env loaded successfully. MONGO_URI exists: ${!!uri}`);
        
        if (uri) {
            // Log parsed components safely
            try {
                const parsedUrl = new URL(uri);
                console.log(`[DEBUG] Username: ${parsedUrl.username}`);
                console.log(`[DEBUG] Host: ${parsedUrl.hostname}`);
                console.log(`[DEBUG] Database Name: ${parsedUrl.pathname.replace('/', '')}`);
            } catch (e) {
                console.log(`[DEBUG] Could not parse URI object`);
            }
        }

        // Add explicit connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB connection established.');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB Connection Error Event: ${err.message}`);
        });

        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); 
    }
};

export default connectDB;