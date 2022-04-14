const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });

//Générer un Token

function generateToken(user) {
  const id = user.id;
  const payload = { sub: id, iat: Date.now() };
  const tokenSign = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '24h' });
  return {
    token: tokenSign,
  };
}

//Récupérer un id par rapport au token
function userIdByToken(req) {
  const token = req.headers.authorization.split(' ')[1];
  const tokenVerify = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = tokenVerify.sub;
  return userId;
}

module.exports.generateToken = generateToken;
module.exports.userIdByToken = userIdByToken;
