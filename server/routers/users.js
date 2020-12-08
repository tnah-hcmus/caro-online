const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const validator = require("validator");
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
      if (!validator.isEmail(email)) return res.status(400).send({ error: "Invalid Email address" });
      if (password.length < 7)
        return res.status(400).send({ error: "Password is shorter than the minimum allowed length 7" });
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
  .get(auth, authAdmin, async (req, res) => {
    //GET: lấy danh sách user (phục vụ admin)
    //check quyền admin, và thực hiện
    //Tạm thời chưa apply phân quyền nên cứ gọi tới thì auto thực hiện thôi, không cần phải lăn tăn nhiều
    try {
      const users = await User.find().select("-password -tokens");
      res.status(201).send({ users });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(auth, authAdmin, async (req, res) => {
    //PUT: update 1 thuộc tính nào đó cho list user (block or unblock for all blocked users)
    //check quyền admin
    try {
      const { isBlocked } = req.query;
      const response = await User.updateMany({ isBlocked });
      res.status(201).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(auth, authAdmin, async (req, res) => {
    //DELETE: xoá tất cả user
    try {
      const response = await User.deleteMany();
      res.status(201).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;
