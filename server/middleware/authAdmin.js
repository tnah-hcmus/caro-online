const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  const {key} = req.body;
  let result = { status: 200 };
  if(!req.secretToken || key) result = { status: 401, error: "Missing admin authenticate token" };
  else {
    const secret = req.secretToken ? req.secretToken : key;
    const user = await User.findOne({ _id: req.userId }); 
    if (user.role.indexOf("admin") === -1) result = { status: 401, error: "You're not admin !" };
    else {
      const data = jwt.verify(secret, process.env.JWT_KEY);
      if(bcrypt.compare(data.secret, user.secret)) result = { status: 401, error: "You don't have permission !"  };
    }
  }
  req.adminAuth = result;  
  next();
};

module.exports = authAdmin;
