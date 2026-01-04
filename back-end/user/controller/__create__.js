// {

//     // const User = require("../__model__.js");
//     // const Joi = require("joi");
//     // const __V = Joi.object({
//     //     username: Joi.string().required().min(3).max(255).trim(),
//     //     email: Joi.string().required().trim().lowercase().email(),
//     //     password: Joi.string().min(8).required(),
//     // });
    
//     // const validate = async (req, res, next) => {
//     //     return new Promise(async (resolve, reject) => {
//     //         try {
//     //             const { error } = __V.validate(req.body);
//     //             if (error) reject({ code: 401, message: error.message });
//     //             resolve();
//     //         } catch (err) {
//     //             reject({ code: 400, err });
//     //         }
//     //     })
//     //         .then(() => next())
//     //         .catch((error) => {
//     //             switch (error.code) {
//     //                 case 400:
//     //                     return res.status(400).json({
//     //                         success: 0,
//     //                         message: "ERR validating user data",
//     //                         err: error.err,
//     //                     });
//     //                 case 401:
//     //                     return res
//     //                         .status(400)
//     //                         .json({ success: 0, message: error.message });
//     //             }
//     //         });
//     // };
    
//     // const create = async (req, res) => {
//     //     return new Promise(async (resolve, reject) => {
//     //         try {
//     //             const { username, email, password } = req.body;
//     //             const hashPassword = await require("bcrypt").hash(password, 10);
//     //             let user = await User.create({
//     //                 username,
//     //                 email,
//     //                 password: hashPassword,
//     //             });
//     //             user.toObject();
//     //             delete user.password;
//     //             delete user.__v;
//     //             delete user.createdAt;
//     //             delete user.updatedAt;
//     //             resolve({ user });
//     //         } catch (err) {
//     //             reject({ code: 400, err });
//     //         }
//     //     })
//     //         .then((result) => {
//     //             return res.status(200).json({
//     //                 success: 1,
//     //                 message: "User created Successfully",
//     //                 user: result.user,
//     //             });
//     //         })
//     //         .catch((error) => {
//     //             switch (error.code) {
//     //                 case 400:
//     //                     return res
//     //                         .status(400)
//     //                         .json({
//     //                             success: 0,
//     //                             message: "ERR creating user",
//     //                             err: error.err,
//     //                         });
//     //             }
//     //         });
//     // };
    
//     // module.exports = { c: create, v: validate };
// }

const { hash } = require("bcrypt");
const User = require("../__model__.js");
const joi = require("joi");
const __validate = joi.object({
    username: joi.string().required().min(3).max(255).trim(),
    email: joi.string().lowercase().required().email().trim(),
    password: joi.string().min(8).required(),
});

const validate = async (req, res, next) => {
    try {
        const { error } = __validate.validate(req.body);
        if (error) throw { code: 400, message: error.message };
        next();
    } catch (err) {
        if (err.code) {
            return res.status(400).json({ success: 0, message: err.message.replaceAll("\"", "") });
        }
        return res
            .status(400)
            .json({ success: 0, message: "Err validating data", err });
    }
};

const create = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = await hash(password, 10);

        let user = await User.create({
            username,
            email,
            password: hashPassword,
        });

        user = user.toObject();
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;

        return res
            .status(200)
            .json({ success: 1, message: "User created successfully", user });
    } catch (err) {
        if (err.code === 11000) {
            return res
                .status(400)
                .json({
                    success: 0,
                    message: "Duplicate error",
                    duplicate_key: Object.keys(err.keyValue),
                });
        }
        return res
            .status(400)
            .json({ success: 0, message: "Err creating user", err: err });
    }
};

module.exports = { c: create, v: validate };
