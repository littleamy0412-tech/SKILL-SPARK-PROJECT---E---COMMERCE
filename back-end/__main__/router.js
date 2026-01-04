const router = require("express").Router();

router.get("/", (_, res) =>
    res.status(200).json({
        success: 1,
        message: "Server Listening",
        channel: "main",
        path: "/",
        code: 200,
        comment: "testing GET response",
    })
);

router.post("/", (req, res) =>
    res.status(200).json({
        success: 1,
        message: "Server Listening",
        channel: "main",
        path: "/",
        code: 200,
        comment: "testing GET response",
        data_recieved: req.body,
    })
);

router.use('/user', require('../user/__router__.js'))

module.exports = router;
