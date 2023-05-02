const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
userRoutes = express.Router();
//USER REGISTERED ROUTE
userRoutes.post("/register", async (req, res) => {
  const { email, name, password, gender } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        const user = new UserModel({ email, name, gender, password: hash });
        await user.save();
        res.status(200).send({ msg: "User Get Registered Successfully" });
      } else {
        res.status(404).send({ err: err.massage });
      }
    });
  } catch (error) {
    res.status(404).send({ err: error.massage });
  }
});

//USER LOGIN ROUTE
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { authorID: user._id, author: user.name },
            "socialmedia"
          );
          res.status(200).send({ msg: "User Login Successful", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credintial" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credintial" });
    }
  } catch (error) {
    res.status(400).send({ err: error.massage });
  }
});

module.exports = {
  userRoutes,
};
