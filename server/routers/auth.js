const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const { getGoogleAccountFromCode } = require("../services/google-utils");
const getFacebookUserData = require("../services/facebook-utils");
const passport = require('../helper/passport'); 
const router = express.Router();

router.post('/api/login', (req, res) => {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', function (error, user, info) {

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send('Undefined error');
      } else {
        const result = {
          name: user.name,
          email: user.email,
          coins: user.coin,
          role: user.role,
          accessToken: info.accessToken,
        }
        res.status(200).send(result);
      }
    })(req, res);
  });
router.get("/api/loginGoogle", async (req, res) => {
  if (req.body.code) {
    const { email, password, name } = await getGoogleAccountFromCode(req.body.code);
    try {
      const find = await User.findOne({ email });
      if (find) {
        const token = await find.generateAuthToken();
        res.status(201).send({ user: find, token });
      } else {
        const user = new User({ email, password, name });
        await user.save();
        const token = await user.generateAuthToken();
        res.send({ user, token });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
  else res.status(400).send('Provide more information')
});
router.post("/api/loginFacebook", async (req, res) => {
  if (req.body.code) {
    const { email, password, name } = await getFacebookUserData(req.body.code);
    try {
      const find = await User.findOne({ email });
      if (find) {
        const token = await find.generateAuthToken();
        res.status(201).send({ user: find, token });
      } else {
        const user = new User({ email, password, name });
        await user.save();
        const token = await user.generateAuthToken();
        res.send({ user, token });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
});
router.post("/api/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/api/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
