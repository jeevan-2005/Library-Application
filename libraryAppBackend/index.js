const express = require("express");
const connection = require("./config/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const userRouter = require("./routes/user.routes");

const refershTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
const port = process.env.PORT;

app.get("/health-check", (req, res) => {
  res.send("health-check server running fine.");
});

app.post("/token", (req, res) => {
  const refreshToken = req.headers.authorization.split(" ")[1];
  if (!refreshToken) {
    return res.status(500).send("You are not authenticated");
  }
  jwt.verify(refreshToken, refershTokenSecretKey, (err, decoded) => {
    if (err) return res.send("Invalid Refresh token, Please Login again!");
    const user = decoded._doc;
    const accessToken = jwt.sign({ ...user }, "loginKey_token", {
      expiresIn: "1h",
    });
    res.status(200).send({ acessToken: accessToken });
  });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`DB is connected and server is running at Port:${port}`);
  } catch (error) {
    console.log(error);
  }
});
