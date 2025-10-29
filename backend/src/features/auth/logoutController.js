import User from "../../models/User.js";
import asyncHandler from "express-async-handler";

const logoutController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const foundUser = await User.findOne({ refreshToken });
    // since its findOne, it wont throw error, only null, so you can safely use clear cookie later
    if (foundUser) {
        foundUser.refreshToken = "";
        await foundUser.save();
    }
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "None" });
    res.sendStatus(204);
});

export default logoutController;