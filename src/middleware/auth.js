const jwt = require("jsonwebtoken");
const User = require("../models/user");

//to check authorzation token is corrent or not
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "testingjwt");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "authorization failed" });
  }
};

module.exports = auth;
