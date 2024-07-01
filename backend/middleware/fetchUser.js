const jwt = require('jsonwebtoken');
const JWT_SECRET = 'i@mthecreater';

const fetchUser = (req , res , next ) => {
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error : "please authenticate with valid token"});
    }
    try {
        const data = jwt.verify(token ,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error : "please authenticate with valid token"});
    }
}
module.exports = fetchUser;