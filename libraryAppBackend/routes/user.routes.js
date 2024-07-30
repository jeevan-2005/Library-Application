const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blackListToken.model");
require("dotenv").config();

const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
const refershTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

userRouter.post("/register", async (req, res) => {
  const { userName, email, password, gender, role } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(200).send({
        msg: `User already exists with this email. Use different email or please login.`,
      });
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err)
          res
            .status(500)
            .send({ msg: "Error occured while hashing the password" });

        const newUser = new UserModel({
          userName,
          email,
          password: hash,
          gender,
          role,
        });
        await newUser.save();
        res.status(200).send({ msg: "User registration successful." });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(415).send({ msg: "User Registration Failed." });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    // console.log(user.password)
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err)
          res
            .status(500)
            .send({ msg: "error occured while comparing passwords" });
        if (result && role == user.role) {
          const accessToken = jwt.sign({ ...user }, tokenSecretKey, {
            expiresIn: "1h",
          });
          const refreshToken = jwt.sign({ ...user }, refershTokenSecretKey, {
            expiresIn: "1d",
          });
          res.status(200).send({
            msg: "Login Successful",
            token: accessToken,
            refreshToken: refreshToken,
            role: user.role,
          });
        } else {
          res.status(401).send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.status(401).send({
        msg: `User not found with email:${email}. Please enter correct email or Please register.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(415).send({ msg: "User Registration Failed." });
  }
});

userRouter.get("/logout", async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let blacklistToken = new blacklistModel({ token });
  await blacklistToken.save();
  res.status(200).send({ msg: "user logged out successfully." });
});

module.exports = userRouter;
