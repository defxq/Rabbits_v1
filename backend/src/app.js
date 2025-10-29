import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import corsOption from "./configs/corsOption.js";
import reqLog from "./middleware/reqLog.js";
import errHandler from "./middleware/errHandler.js";
import root from "./features/root.js";
import credentials from "./middleware/credentials.js";
import authRoute from "./features/auth/authRoute.js";
import usersRoute from "./features/users/usersRoute.js";
import verifyJWT from "./middleware/verifyJWT.js";
dotenv.config();
const app = express();

app.use(reqLog);

app.use(credentials);
app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', root);

app.use('/auth', authRoute);
app.use(verifyJWT);
app.use('/users', usersRoute);

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Pong!"});
});

app.all(/.*/, (req, res) => {
    res.status(404).json({ message: "Page not found!"});
});


app.use(errHandler);

export default app;