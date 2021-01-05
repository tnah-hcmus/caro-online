const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");
const Game = require("../models/game");
const {processUser} = require('../helper/processData');
const router = express.Router();


router //game only create and edit by server in socket server, not from client-api
  .route("/api/games")
  .get(auth, async (req, res) => {
    processUser(req, res, async (user) => {
      // Get all games
      try {
        let gameList = [];
        if(!Object.keys(req.query).length) gameList = await Game.find();
        else {
          const {filterBy} = req.query;
          if(filterBy === "userGames") {
            const ids = user.games.map(item => item.id);
            gameList = await Game.find().where('_id').in(ids).exec();
          }
        }
        if (!gameList.length) {
          res.status(401).send({ error: "Can't get game !!!" });
        } else {
          res.status(200).send(gameList.map(item => {
            delete item.history;
            delete item.chat;
            delete item.timerId;
            return item;
          }));
        }
      } catch (error) {
        console.log(error);
        res.status(400).send({error});
      }
    }
    
  )})
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
    processUser(req, res, async () => {
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
