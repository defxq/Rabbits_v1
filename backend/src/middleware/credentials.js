import allowedOrigins from "../configs/allowedOrigins.js";

const credentials = (req, res, next) => {
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header("Allow-Control-Access-Credentials", true);
    }
    next();
};


export default credentials;