const express = require("express");
const Room = require("../models/room");
const auth = require("../middleware/auth");
const router = express.Router();

router
  .route("/api/rooms")
  .get(auth, async (req, res) => {
    //GET: lấy danh sách room hiện tại
    //check quyền admin, và thực hiện
    if(req.userId) {
        try {
            const rooms = await Room.find();
            res.status(201).send(rooms);
          } catch (error) {
            res.status(400).send(error);
          }
    } else res.status(401).send({error: "You must login"})

  })

module.exports = router;
