const User = require("../models/user");

const authAdmin = async (req, res, next) => {
  const user = await User.findOne({ _id: req.userId });
  if (user.role.indexOf("admin") === -1) {
    return res.status(401).send({ error: "You don't have permission !" });
  }
  next();
};

module.exports = authAdmin;
