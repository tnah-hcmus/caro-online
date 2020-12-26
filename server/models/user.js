const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    default: 0,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: [String],
    enum: ["user", "admin"]
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
  }
}, {timestamp: true});

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
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

userSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};
userSchema.methods.generateAcceptChangePasswordToken = function() {
  this.allowResetPassword = true;
  return jwt.sign({reset: this.resetPasswordToken, allow: this.allowResetPassword}, process.env.JWT_KEY);
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
