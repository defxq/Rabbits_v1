import allowedOrigins from "./allowedOrigins.js";

const corsOption = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
    },
    credentials: true,
};

export default corsOption;