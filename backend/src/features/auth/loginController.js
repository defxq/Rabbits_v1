import User from "../../models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const loginController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status.json({ message: "username and password are required" });
    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.status(400).json({ message: "Wrong username or password" });
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong username or password" });

    const accessToken = jwt.sign(
        { UserInfo: {
            id: foundUser._id,
            username: foundUser.username,
            roles: foundUser.roles
        }},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }//30m for prod
    );

    const refreshToken = jwt.sign(
        {id: foundUser._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }//7d-10d for prod..
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json(accessToken);
});

export default loginController;