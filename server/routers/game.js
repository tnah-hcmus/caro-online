const express = require("express");
const auth = require("../middleware/auth");
const Game = require("../models/game");
const {processUser} = require('../helper/processData');
const router = express.Router();

router //game only create and edit by server in socket server, not from client-api
  .route("/api/games")
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
    // Update all games
    res.status(401).send({ error: "Not found !!!"});
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
  .route("/api/games/:id")
  .get(auth, async (req, res) => {
    processUser(req, res, async (user) => {
      // Get game by Id
      try {
        const game = await Game.findOne({ _id: req.params.id });
        if (!game) {
          res.status(401).send({ error: "No game found with this id" });
        } else {
          return res.status(200).send(game);
        }
      } catch (error) {
        console.log(error)
        res.status(401).send(error);
      }
    })    
  })
  .post((req, res) => {
    res.status(401).send({ error: "Not found !!!" });
  })
  .put(async (req, res) => {
    res.status(401).send({ error: "Not found !!!" });
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
