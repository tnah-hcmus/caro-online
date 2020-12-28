const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Game = require("../models/game");
const router = express.Router();

// router.get("/game", auth, authAdmin, async (req, res) => {
// Not check auth, will update later
router.get("/game", async (req, res) => {
  try {
    const game = await Game.find();
    if (!game) {
      res.status(401).send({ error: "Can't get game !!!" });
    } else {
      return res.status(200).send(game);
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// get game by Id
router.get("/game/:id", auth, authAdmin, async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });
    if (!game) {
      res.status(401).send({ error: "Can't get game !!!" });
    } else {
      return res.status(200).send(game);
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// save game
router.post("/game", async (req, res) => {
  try {
    const { roomID, start, status, winner, duration, history } = req.body;
    const newGame = new Game({ roomID, start, status, winner, duration, history });
    const response = await newGame.save();
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send(error);
  }
});

// edit game by Id
router.put("/game/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { start, status, winner, duration, history } = req.query;
    // if (!start || !status || !winner || !duration || !history) {
    //   return res.status(401).send({ error: "Not enough data field !!!" });
    // }
    const update = { start, status, winner, duration, history };
    const response = await Game.findOneAndUpdate(id, update, { new: true });
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(401).send({ error: "Can't update game !!!" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

// delete game by Id
router.delete("/game/:id", async (req, res) => {
  try {
    const response = await Game.findOneAndDelete({ _id: req.params.id });
    if (response) {
      return res.status(200).send(response);
    } else {
      res.status(401).send({ error: "Can't delete game !!!" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
