import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const refreshController = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies.refreshToken;
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(401);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log("refreshing...");
            if (err) return res.sendStatus(401);
            const accessToken = jwt.sign(
                { UserInfo: {
                    id: foundUser._id,
                    username: foundUser.username,
                    roles: foundUser.roles
                }},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "5m" }
            );
            console.log("Refreshed");
            return res.status(200).json(accessToken);
        }
    );
});

export default refreshController;