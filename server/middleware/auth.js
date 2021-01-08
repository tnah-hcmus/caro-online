const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if(!req.header("Authorization")) return res.status(401).send({error: "Missing token"});
  const tokens = req.header("Authorization").replace("Bearer ", "").split(" ");
  const token = tokens[0];
  const data = jwt.verify(token, process.env.JWT_KEY);
  if (!data || !data._id) return res.status(401).send({ error: "Invalid token" });
  req.userId = data._id;
  req.token = token;
  req.secretKey = tokens[1];
  next();
};
module.exports = auth;
