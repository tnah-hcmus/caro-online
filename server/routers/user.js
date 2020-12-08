const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const router = express.Router();

router
  .route("/api/users/:id")
  .post((req, res) => {
    //POST: bỏ qua
    res.send(404); //không cho tạo user trên 1 id cụ thể
  })
  .get(auth, async (req, res) => {
    //GET: lấy thông tin user của id này
    // trả về public info
    //check quyền authen
    //nếu đúng là chủ acc thì cấp thêm private information
    try {
      const { id } = req.params;
      if (id === req.user.id) {
        const user = await User.find({ id });
        res.status(200).send({ user });
      } else {
        const user = await User.find({ id }).select("-password -tokens");
        res.status(200).send({ user });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(auth, async (req, res) => {
    //PUT: update 1 thuộc tính ứng với user
    //check quyền authen
    try {
      const { id } = req.params;
      const { name } = req.query;
      const response = await User.findOneAndUpdate({ id }, { name });
      res.status(201).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(auth, authAdmin, async (req, res) => {
    //DELETE: khoá tài khoản
    //check quyền authen
    try {
      const { id } = req.params;
      const { isBlocked } = req.query;
      const user = await User.findOneAndUpdate(id, { isBlocked }, { new: true });
      res.status(201).send({ user });
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;
