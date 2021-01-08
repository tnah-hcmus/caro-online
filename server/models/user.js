const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')

const userSchema = mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  coins: {
    type: Number,
    required: true,
    default: 15,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  win: {
    type: Number,
    default: 0
  },
  lose: {
    type: Number,
    default: 0
  },
  draw: {
    type: Number,
    default: 0
  },
  role: {
    type: [String],
    enum: ["user", "admin"],
    default: "user"
  },
  games: [
    {
      id: {
        type: String
      }
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  isVerified: {
    type: Boolean,
    default: false
  },    
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  },
  allowResetPassword: {
    type: Boolean,
    required: false
  },
  adminInfo: {
    id: {
      type: String,
    },
    password: {
      type: String,
    },
    secret: {
      type:String
    }
  }
}, {timestamp: true});

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  if(user.role.includes("admin")) {
    if(!user.adminInfo) {
      const defaultPassword = "secretAdmin";
      user.adminInfo = {
        id: 'admin',
        password: await bcrypt.hash(defaultPassword, 8)
      }
    }
  }
  if(user.allowResetPassword) {
    if(user.resetPasswordToken) {
      if(Date.now() >  user.resetPasswordExpires) user.allowResetPassword = false;
    }
    else user.allowResetPassword = false;
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
    expiresIn: parseInt(expirationDate.getTime()/1000, 10)
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.generateAdminSecretToken = async function () {
  const user = this;
  if(user.role.includes("admin")) {
    const secret = ("this is" + user.adminInfo.password + user.password +  "super secret key").split('').sort(function(){return 0.5-Math.random()}).join('')
    user.adminInfo.secret = await bcrypt.hash(secret, 8) ;;
    const token = jwt.sign({ secret, date: Date.now()}, process.env.JWT_KEY);
    return token;
  }
}

userSchema.methods.updatePasswordAndUpdateToken = async function (newPass) {
  // Generate an auth token for the user
  const user = this;
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
    expiresIn: parseInt(expirationDate.getTime()/1000, 10)
  });
  user.tokens = user.tokens.concat({ token });
  user.password = newPass;
  await user.save();
  return token;
};

userSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};
userSchema.methods.generateAcceptChangePasswordToken = function() {
  this.allowResetPassword = true;
  return jwt.sign({reset: this.resetPasswordToken, allow: this.allowResetPassword}, process.env.JWT_KEY);
};
userSchema.methods.updateAfterGame = async function(operator, number, isDraw) {
  if(isDraw) {
    this.draw++;
  }
  else if(operator) {
    this.coins += number;
    this.win++;
  } else {
    this.lose++;
    this.coins -= number;
  }
  await this.save();
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) return;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return;
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
