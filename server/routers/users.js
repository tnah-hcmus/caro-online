const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

router
  .route("/api/users")
  .post(async (req, res) => {
    //POST: tạo user mới
    // Create a new user
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password)
        return res.status(400).send({ error: "Please fill out all email, name and password" });
      const find = await User.findOne({ email });
      if (find) {
        return res.status(401).send({ error: "Signup failed! Already have account" });
      } else {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get(auth, async (req, res) => {
    //GET: lấy danh sách user (phục vụ admin)
    //check quyền admin, và thực hiện
    //Tạm thời chưa apply phân quyền nên cứ gọi tới thì auto thực hiện thôi, không cần phải lăn tăn nhiều
  })
  .put(auth, async (req, res) => {
    //PUT: update 1 thuộc tính nào đó cho list user
    //check quyền admin
  })
  .delete(auth, async (req, res) => {
    //DELETE: xoá tất cả user
  });

module.exports = router;
