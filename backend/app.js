const express = require('express');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const app = express();

//Cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

//Req JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//middlewares

const { checkUser, requireAuth } = require('./middlewares/auth.middlewares');

//routes

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.use('*', checkUser);
app.use('/jwtid', requireAuth, (req, res) => {
  res.status(200).send({
    jwt: req.cookies.jwt,
    user: res.locals.user.dataValues,
  });
});

module.exports = app;
