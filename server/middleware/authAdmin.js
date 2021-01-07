const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  const user = await User.findOne({ _id: req.userId });
  if(!req.secretToken) return res.status(401).send({ error: "Missing admin authenticate token" });
  if (user.role.indexOf("admin") === -1) {
    return res.status(401).send({ error: "You're not admin !" });
  } else {
    const data = jwt.verify(req.secretToken, process.env.JWT_KEY);
    if(user.adminInfo.secret !== data.secret) return res.status(401).send({ error: "You don't have permission !" });
  }
  next();
};

module.exports = authAdmin;
