const usermodel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user is already exist,you can login",
        success: false,
      });
    }
    const Usermodel = new usermodel({ name, email, password });
    Usermodel.password = await bcrypt.hash(password, 10);
    await Usermodel.save();
    res.status(201).json({
      message: "signup sucess",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    const errorMsg = "auth failed email or apssword is wrong";
    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const jwtToken=jwt.sign({email:user.email,_id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'23h'}
    )

    res.status(200).json({
      message: "Login sucess",
      success: true,
      jwtToken,
      email,
      name:user.name
    });
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
module.exports = {
  signup,
  login,
};
