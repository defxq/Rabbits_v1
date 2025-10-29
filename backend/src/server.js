import app from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Now listening PORT: ${PORT}`));
    } catch (err) {
        console.error("Failed to start server");
        process.exit(1);
    }
};

startServer();