const bcrypt = require('bcrypt');
const db = require('../models/index');
const token = require('../middlewares/token.middlewares');

//Création de compte

exports.signUp = async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  const regExpEmail = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);

  if (
    username == null ||
    email == null ||
    password == null ||
    username == '' ||
    email == '' ||
    password == ''
  ) {
    return res.status(400).json({
      error: 'Vous devez remplir tous les champs',
    });
  }

  if (username.length <= 2) {
    return res.status(400).json({
      error: `Le nom d'utilisateur doit contenir au moins 3 caractères`,
    });
  }

  if (!regExpEmail.test(email)) {
    return res.status(400).json({
      error: `L'email n'est pas valide`,
    });
  }

  if (password.length <= 8) {
    return res.status(400).json({
      error: 'Le mot de passe doit contenir au moins 8 caractères',
    });
  }

  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });

    if (user !== null) {
      if (user.username === req.body.username || user.email === req.body.email) {
        return res.status(400).json({
          error: `Cet email ou nom d'utilisateur est déjà pris`,
        });
      }
    } else {
      //Création de l'user
      const hash = await bcrypt.hash(req.body.password, 8);
      const newUser = await db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin || false,
      });
      res.status(201).send({
        message: 'Votre compte à été crée avec succès !',
        user: newUser,
      });
    }
  } catch (error) {
    res.status(403).send({
      error: error.message,
    });
  }
};

//Connexion au compte

exports.signIn = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });

    if (user === null) {
      return res.status(400).send({ error: `Email et/ou mot de passe incorrect` });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password);

      if (!hash) {
        return res.status(400).send({ error: 'Email et/ou mot de passe incorrect' });
      } else {
        const tokenData = token.generateToken(user);
        res.cookie('jwt', tokenData.token, { httpOnly: true });
        res.status(200).send({
          user: {
            email: user.email,
            username: user.username,
          },
          token: tokenData.token,
          sub: tokenData.sub,
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      error: 'Veuillez rentrer un email et un mot de passe ',
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
