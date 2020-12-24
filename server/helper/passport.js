require("dotenv").config();
const validator = require("validator");
const User = require("../models/user");

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const _createRandomPassword = () => {
    let password = 'xyxxyxxxxxxyxxy'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return password;
}

const generateToken = async (user) => {
  if(user) return await user.generateAuthToken();
}
const thirdPartyStrategy = async (strategyType, profile, done) => {
  const [existThirdParty, existEmail] = await Promise.all([
    User.findOne({[strategyType]: profile.id}),
    User.findOne({email: profile.email})
  ]);
  let userDB = null
  if(existThirdParty) {
    userDB = existThirdParty;
  }
  else if (existEmail) {
    existEmail[strategyType] = profile.id;
    await existEmail.save();
    userDB = existEmail;
  }
  else {
    const user = new User({
        name: profile.displayName,
        [strategyType]: profile.id,
        email: profile.email,
        password: _createRandomPassword(),
        roles: ['user']
    })
    await user.save();
    userDB = user;
  }
  done(null, userDB, {accessToken: await generateToken(userDB)});
}

//serialize with passport
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

//Authenticated với email/password
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async(email, password, done)=>{
    //Login a registered user
    console.log(email, password);
    try {
        if (!email || !password) {
          done({ error: "Login failed, please fill your password and your email" }, null);
        }
        else if (!validator.isEmail(email)) 
            return done({ error: "Invalid Email address" }, null);
        else {
            const user = await User.findByCredentials(email, password);
            if (!user) {
              return done({ error: "Login failed! Maybe wrong password or email" }, null);
            } else {
              done(null, user, {accessToken: await generateToken(user)})
            }
        }        
    } catch (error) {
        done(error, null)
    }
}))
//Strategy Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: process.env.FB_REDIRECT_URL,
  profileFields:['id','displayName','email']
},async(accessToken, refreshToken, profile, done)=>{
  await thirdPartyStrategy('facebookId', profile, done); 
}))

//Strategy google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URL,
},async(accessToken, refreshToken, err , profile, done)=>{
  await thirdPartyStrategy('googleId', profile, done);
}))

module.exports = passport;