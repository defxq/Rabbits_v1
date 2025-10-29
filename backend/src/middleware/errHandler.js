const errHandler = (err, req, res, next) => {
    console.log(`Error occured: ${err}`);
    res.status(500).json({ error: err.message });
};

export default errHandler;