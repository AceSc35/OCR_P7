const db = require('../models/index');
require('dotenv').config({ path: './config/.env' });

//Récupération d'un utilisateur

module.exports.getOneUser = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password'] },
    });
    res.status(200).send({ user });
  } catch {
    res
      .status(500)
      .send({ error: `Un problème est survenu lors de l'exécution de la fonction : GetOneUser` });
  }
};

//Récupération des utilisateurs

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).send({ users });
  } catch {
    res
      .status(500)
      .send({ error: `Un problème est survenu lors de l'exécution de la fonction : GetAllUsers` });
  }
};
