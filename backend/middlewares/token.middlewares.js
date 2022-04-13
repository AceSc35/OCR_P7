const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });

function generateToken(user) {
  const id = user.id;
  const username = user.username;
  const payload = { sub: id, name: username, iat: Date.now() };
  const tokenSign = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '24h' });
  return {
    token: tokenSign,
  };
}

module.exports.generateToken = generateToken;
