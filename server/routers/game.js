const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Game = require("../models/game");
const router = express.Router();

router
  .route("/game")
  .get(async (req, res) => {
    // Get all games
    try {
      const gamesList = await Game.find();
      if (!gamesList) {
        res.status(401).send({ error: "Can't get game !!!" });
      } else {
        res.status(200).send(gamesList);
      }
    } catch (error) {}
  })
  .post(async (req, res) => {
    // Create new game
    try {
      const { roomID, start, status, winner, duration, history } = req.body;
      const newGame = new Game({ roomID, start, status, winner, duration, history });
      const response = await newGame.save();
      res.status(200).send(response);
    } catch (error) {
      res.status(401).send(error);
    }
  })
  .put((req, res) => {
    // Update all games
    res.status(401).send({ error: "Not found !!!" });
  })
  .delete((req, res) => {
    // delete all games
    res.status(401).send({ error: "Not found !!!" });
  });

router
  .route("/game/:id")
  .get(async (req, res) => {
    // Get game by Id
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
  })
  .post((req, res) => {
    res.status(401).send({ error: "Not found !!!" });
  })
  .put(async (req, res) => {
    // Edit game by Id
    try {
      const { id } = req.params;
      const { start, status, winner, duration, history } = req.query;
      if (!start || !status || !winner || !duration || !history) {
        return res.status(401).send({ error: "Not enough data field !!!" });
      }
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
  })
  .delete(async (req, res) => {
    // Delete game by Id
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
