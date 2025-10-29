import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(401);
            req.user = {};
            req.user.id = decoded.UserInfo.id;
            req.user.roles = decoded.UserInfo.roles;
            next();
        }
    );
});

export default verifyJWT;