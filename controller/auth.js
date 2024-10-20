const model = require("../Model/user");
const User = model.User;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);
exports.signUp = async (req, res) => {
  try {
    const user = new User(req.body);
    //jwt
    //algorithm:'RS256' //RSA 2048 KEY
    var token = jwt.sign({ email: req.body.email }, privateKey, {
      algorithm: "RS256",
    });
    //hashing
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash;

    //jwt
    const savedUser = await user.save();
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });

    if (!doc) {
      return res.status(401).json({ error: "User not found" });
    }

    const isAuth = bcrypt.compareSync(req.body.password, doc.password);

    if (isAuth) {
      const token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });

      doc.token = token;

      // Save without callback
      await doc.save(); // Removed callback, now awaiting the save promise

      return res.json({ token });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
