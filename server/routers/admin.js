const express = require("express");
const auth = require("../middleware/auth");
const { processUser } = require("../helper/processData");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/api/admin/auth", auth, (req, res) => {
  //lấy thông tin cá nhân từ token (không biết trước id);
  processUser(req, res, async (user) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ error: "Login failed, please fill your password and your id" });
    }
    if (password.length < 7)
      return res.status(400).send({ error: "Password is shorter than the minimum allowed length 7" });
    if (!user) {
      return res.status(401).send({ error: "You're not user" });
    } else {
      if (user.role.indexOf("admin") === -1) {
        return res.status(401).send({ error: "You're not admin" });
      } else {
        const isRightPassword =
          user.adminInfo.id == username && (await bcrypt.compare(password, user.adminInfo.password));
        if (isRightPassword) {
          const token = user.generateAdminSecretToken();
          res.status(200).send({ token });
        } else return res.status(401).send({ error: "Wrong password or username" });
      }
    }
  });
});

module.exports = router;
