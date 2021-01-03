const express = require("express");
const Game = require("../models/room");
const auth = require("../middleware/auth");
const router = express.Router();

router
  .route("/api/games")
  .get(auth, async (req, res) => {
    //GET: lấy danh sách room hiện tại
    //check quyền admin, và thực hiện
    if(req.userId) {
        try {
            const games = await Game.find();
            res.status(201).send(games);
          } catch (error) {
            res.status(400).send(error);
          }
    } else res.status(401).send({error: "You must login"})

  })

module.exports = router;
