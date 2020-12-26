const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const router = express.Router();

const processUser = async (req, res, callback) => {
  try {
    const user = await User.findOne({ _id: req.userId, 'tokens.token': req.token })
    if (!user) {
      res.status(401).send({ error: 'No user found' })
    }
    else {
      callback(user);
    }
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }  
}
router.post("/api/users/me", auth, (req, res) => { //lấy thông tin cá nhân từ token (không biết trước id);
  processUser(req, res, (user) => {
    const result = {
      id: user.gameId,
      name: user.name,
      email: user.email,
      coins: user.coin,
      role: user.role,
      accessToken: req.token,
    };
    res.status(200).send(result)
  })
})
router
  .route("/api/users/:id")
  .post((req, res) => {
    //POST: bỏ qua
    res.status(404).send("Can't create user on specific id"); //không cho tạo user trên 1 id cụ thể
  })
  .get(auth, (req, res) => {
    //GET: lấy thông tin user của id này
    // trả về public info
    //check quyền authen
    //nếu đúng là chủ acc thì cấp thêm private information
    processUser(req, res, (user) => {
      let result = {
        id: user.gameId,
        name: user.name,
        email: user.email,
        coins: user.coin,
        role: user.role,
        accessToken: req.token,
      };
      const { id } = req.params;
      if (id !== req.user.gameId) {
        delete result[coins];
        delete result[role];
        delete result[accessToken];
      }
      res.status(200).send({ user: result });
    })  
  })
  .put(auth, (req, res) => {
    //PUT: update 1 thuộc tính ứng với user
    //check quyền authen
    processUser(req, res, async (user) => {
      const { id } = req.params;
      const { property, data } = req.body;
      if(id === user.gameId) {
        if(property !== 'isBlocked') {
          user[property] = data;
          await user.save();
          res.status(201).send({ success: `Success update ${property}` });
        } else {
          res.status(403).send({error: 'You must use delete method to lock your account'});
        }        
      }
      else {
        res.status(401).send({ error: "You can't update other user's information" })
      }
    }) 
  })
  .delete(auth, authAdmin, (req, res) => {
    //DELETE: khoá tài khoản
    //check quyền authen
    processUser(req, res, async (user) => {
      user.isBlocked = true;
      await user.save();
    })
  });

module.exports = router;
