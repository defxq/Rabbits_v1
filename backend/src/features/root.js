import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('This is main root');
});

export default router;