require('dotenv').config({ path: './config/.env' });
const { sequelize } = require('./models');

const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 5000);

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, async () => {
  console.log(`Listening on port ${process.env.PORT}`.yellow);
  await sequelize.sync({ force: true });
  console.log('Connexion à la base de donnée : Ok');
});
