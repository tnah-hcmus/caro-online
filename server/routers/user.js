const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/api/users/:id')
.post((req, res) => { //POST: bỏ qua
    res.send(404); //không cho tạo user trên 1 id cụ thể
})
.get(auth, async(req, res) => {//GET: lấy thông tin user của id này
    // trả về public info
    //check quyền authen
    //nếu đúng là chủ acc thì cấp thêm private information
})
.put(auth, async(req, res) => {//PUT: update 1 thuộc tính ứng với user
    //check quyền authen
})
.delete(auth, async(req, res) => {//DELETE: khoá tài khoản
    //check quyền authen
})

module.exports = router