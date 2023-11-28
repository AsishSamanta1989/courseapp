const jwt = require('jsonwebtoken');
const SECRET = 'Aish123'; // This should be an environment variable in real application.

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err,user) => {
            if (err){
                return res.sendStatus(403);
            }
            req.user = user;
            console.log(user);
            next();
        });
    } else{
        res.sendStatus(401);
    }
};

module.exports = {
    authenticateJwt,
    SECRET
}
