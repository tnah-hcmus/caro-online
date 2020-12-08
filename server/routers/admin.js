const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validator = require("validator");

router.post("/api/admin/login", async (req, res) => {
  //Login a registered admin
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Login failed, please fill your password and your email" });
    }
    if (!validator.isEmail(email)) return res.status(400).send({ error: "Invalid Email address" });
    if (password.length < 7)
      return res.status(400).send({ error: "Password is shorter than the minimum allowed length 7" });

    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: "Login failed! Maybe wrong password or email" });
    } else {
      if (user.role !== "admin") {
        return res.status(401).send({ error: "Login failed! You don't have permission to access" });
      } else {
        const token = await user.generateAuthToken();
        res.send({ user, token });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
