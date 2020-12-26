const express = require("express");
const auth = require("../middleware/auth");
const passport = require('../helper/passport'); 
const router = express.Router();

router.post('/api/auth/local', (req, res) => {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', (error, user, info) => {
      if (error) { //easy for debug
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send('Undefined error');
      } else {
        const result = {
          id: user.gameId,
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

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => { //could pass by info from passport - must check
    res.cookie("x-auth-cookie", req.authInfo.accessToken);
    res.redirect('/oauth/success');
  }
);

router.get("/auth/google", passport.authenticate("google", {
  scope: ['profile', 'email'],
}));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    res.cookie("x-auth-cookie", req.authInfo.accessToken);
    res.redirect('/oauth/success');
  }
);
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
