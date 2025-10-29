import User from "../../models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const registerController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status.json({ message: "username and password are required" });
    const duplicate = await User.findOne({ username });
    if (duplicate) return res.sendStatus(409);
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPwd });
    res.status(201).json(newUser);
});

export default registerController;