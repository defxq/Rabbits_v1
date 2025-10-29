import mongoose from "mongoose";
import ROLES_LIST from "../configs/rolesList.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: Object.values(ROLES_LIST),
        default: ROLES_LIST.User,
    },
    refreshToken: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;