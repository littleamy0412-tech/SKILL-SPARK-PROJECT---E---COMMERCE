const User = require("../__model__.js");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw { code: 1 };

    const data = jwt.verify(token, "shhhhh");

    return res
      .status(200)
      .json({ success: 1, message: "User data retrived successfully", data });

  } catch (err) {
    switch (err.code) {
      case 1:
        return res.status(400).json({
          success: 0,
          message: "No token speicified. Invalid credentials",
        });
      default:
    }
    return res
      .status(500)
      .json({ success: 0, message: "Error Getting User", err });
  }
};
