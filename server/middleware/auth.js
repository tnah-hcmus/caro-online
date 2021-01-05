const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
    if(req.header('Authorization')) {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY);
        req.userId = data._id;
        req.token = token;
    }
    next();
}
module.exports = auth