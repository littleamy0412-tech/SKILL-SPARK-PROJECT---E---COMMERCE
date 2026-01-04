const User = require("../__model__.js");
const joi = require("joi");

const __validate = joi.object({
    username: joi.string().min(3).max(255).trim().optional(),
    email: joi.string().lowercase().email().trim().optional(),
    password: joi.string().min(8).required(),
});

const validate = async (req, res, next) => {
    try {
        const { error } = __validate.validate(req.body);
        if (error) throw { code: 400, message: error.message };

        const { username, email, password } = req.body;
        const box = [];
        if (!username) box.push("username");
        if (!email) box.push("email");
        if (!password) box.push("password");

        if (box.includes("username" && "email" && "password")) {
            if (!username && !email)
                return res.status(400).json({
                    success: 0,
                    message: "Insufficient credentials",
                    feilds: box,
                });

            if (!password) {
                if (box.includes("username"))
                    box.splice(box.indexOf("username"), 1);
                else if (box.includes("email"))
                    box.splice(box.indexOf("email"), 1);
            }

            return res.status(400).json({
                success: 0,
                message: "Insufficient credentials",
                feilds: box,
            });
        } else {
            req.empty_feilds = box;
            next();
        }
    } catch (err) {
        if (err.code) {
            return res.status(400).json({ success: 0, message: err.message?.replaceAll("\"", "") });
        }

        return res.status(400).json({
            success: 0,
            message: "Err validating login credentials",
            err,
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let body = { password };
        let user;
        if (!req.empty_feilds.includes("username")) {
            body = { ...body, username };
            user = await User.findOne({ username });
        } else if (!req.empty_feilds.includes("email")) {
            body = { ...body, email };
            user = await User.findOne({ email });
        }

        user = user.toObject();

        const isMatched = await require("bcrypt").compare(
            password,
            user.password
        );
        if (!isMatched) {
            return res
                .status(400)
                .json({ success: 0, message: "Wrong Password" });
        }

        delete user.password;
        delete user.__v;
        delete user.updatedAt;

        const token = require("jsonwebtoken").sign(user, "shhhhh");

        return res.status(200).json({
            success: 1,
            message: "User logged in successfully",
            token,
        });
    } catch (err) {
        return res
            .status(400)
            .json({ success: 0, message: "Err logging in user", err });
    }
};

module.exports = { v: validate, l: login };
