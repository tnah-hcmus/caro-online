const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (!req.header("Authorization")) return res.status(401).send({ error: "Missing token" });
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, process.env.JWT_KEY);
  if (!data || !data._id) return res.status(401).send({ error: "Invalid token" });
  req.userId = data._id;
  req.token = token;
  next();
};
module.exports = auth;
