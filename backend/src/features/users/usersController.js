import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const getUserById = asyncHandler(async (req, res) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(400).json({ message: "User not found" });
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) return res.status(400).json({ message: "User not found" });
    res.status(200).json(foundUser);
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (users.length === 0) return res.status(200).json({ message: "no users found" });
    res.status(200).json(users);
});

const getMe = asyncHandler(async (req, res) => {
    const id = req?.user?.id;
    if (!id) return res.status(400).json({ message: "something went wrong" });
    const foundUser = await User.findById(id);
    if (!foundUser) return res.status(400).json({ message: "User not found" });
    res.status(200).json(foundUser);
});

const deleteMe = asyncHandler(async (req, res) => {
    const id = req?.user.id;
    if (!id) return res.status(400).json({ message: "something went wrong" });
    const result = await User.findByIdAndDelete(id);
    if (!result) return res.status(400).json({ message: "something went wrong" });
    res.sendStatus(204);
});

const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(400).json({ message: "User not found" });
    const result = await User.findByIdAndDelete(id);
    if (!result) return res.status(400).json({ message: "something went wrong" });
    res.sendStatus(204);
});


export {
    getAllUsers,
    getMe,
    getUserById,
    deleteMe,
    deleteUserById
};