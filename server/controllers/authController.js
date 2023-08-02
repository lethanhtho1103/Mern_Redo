const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const User = require("../models/User");

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("Missing username or/and password");
    }
    try {
      // Check for existing users
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json("User already exists");
      }

      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, password: hashedPassword });
      const userNew = await newUser.save();
      res.status(200).json(userNew);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("Missing username or/and password");
    }
    try {
      // Check for existing users
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json("Wrong username");
      }

      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(400).json("Wrong password");
      }
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_ACCESS_TOKEN
      );
      res.status(200).json({ user, accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
