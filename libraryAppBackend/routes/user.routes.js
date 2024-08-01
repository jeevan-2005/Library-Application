const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blackListToken.model");
require("dotenv").config();
const emailVerificationToken = require("../models/emailToken.model");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

        const newUser = await new UserModel({
          userName,
          email,
          password: hash,
          gender,
          role,
        }).save();

        const token = await new emailVerificationToken({
          userId: newUser._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}user/${newUser._id}/verify/${token.token}`;
        await sendEmail(newUser.email, "Verify Email", url);

        res.status(200).send({
          msg: "An email has been sent to your email address, Please verify",
        });
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
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err)
          res
            .status(500)
            .send({ msg: "error occured while comparing passwords" });

        if (!user.verified) {
          let token = await emailVerificationToken.findOne({
            userId: user._id,
          });
          if (!token) {
            token = await new emailVerificationToken({
              userId: newUser._id,
              token: crypto.randomBytes(32).toString("hex"),
            }).save();
            const url = `${process.env.BASE_URL}user/${newUser._id}/verify/${token.token}`;
            await sendEmail(newUser.email, "Verify Email", url);
          }

          res.status(400).send({msg: "An Email has been sent to your email address, Please verify",});
        }

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
          res.status(401).send({ msg: "Invalid Credentials (password / role)" });
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

userRouter.get("/:id/verify/:token", async (req, res) => {
  try {
    const { id, token } = req.params;

    const user = await UserModel.findOne({ _id: id });
    if (!user) return res.status(400).send({ msg: "Invalid Link" });

    // Check if user is already verified
    if (user.verified) return res.status(400).send({ msg: "User already verified" });

    const verifyToken = await emailVerificationToken.findOne({
      userId: user._id,
      token,
    });
    if (!verifyToken) return res.status(400).send({ msg: "Invalid Link" });

    await UserModel.updateOne({ _id: user._id }, { $set: { verified: true } });
    await verifyToken.deleteOne();

    res.status(200).send({ msg: "Email verified successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error." });
  }
});

module.exports = userRouter;
