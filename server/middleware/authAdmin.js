const authAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({ error: "You don't have permission !" });
  }
  next();
};

module.exports = authAdmin;
