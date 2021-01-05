const User = require("../models/user");
const processUser = async (req, res, callback) => {
    if(!req.userId) return res.status(401).send({ error: 'Not authorized to access this resource' });
    try {
      const user = await User.findOne({ _id: req.userId, 'tokens.token': req.token })
      if (!user) {
        res.status(401).send({ error: 'No user found' })
      }
      else {
        callback(user);
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: 'Not authorized to access this resource' })
    }  
  }
module.exports = {processUser};