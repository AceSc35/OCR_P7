const db = require('../models/index');
require('dotenv').config({ path: './config/.env' });
const fs = require('fs');
const { userIdByToken } = require('../middlewares/token.middlewares');

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

// Nous devons update l'utilisateur, cette fonction sert à update l'image, bio ainsi qu'a remplacer l'image de l'user déjà présente
module.exports.updateUser = async (req, res) => {
  try {
    //On chercher l'user par le token
    const userId = userIdByToken(req);
    let avatar;
    //On cherche l'id dans le paramètre de l'URL
    let user = await db.User.findOne({
      where: { id: req.params.id },
    });
    //Si le token est égale à l'id de l'user
    if (userId === user.id) {
      if (req.file && user.picture) {
        avatar = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        const filename = user.picture.split('/images')[1];
        //Remplacer l'image et supprimé l'image présente dans le local
        fs.unlink(`images/${filename}`, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Image locale supprimée avec succès `);
          }
        });
        //Si un utilisateur à déja un avatar
      } else if (req.file) {
        avatar = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      }

      //S'il n'y a pas d'avatar par défaut, assigner une variable de l'avatar, avatar de la BDD
      if (avatar) {
        user.picture = avatar;
      }
      //Idem pour la bio (voir ci-dessous)
      if (req.body.bio) {
        user.bio = req.body.bio;
      }
      //On sauvegarde avec les bon champs du model
      const createUser = await user.save({
        fields: ['picture', 'bio'],
      });
      res.status(200).json({
        message: 'La mise à jour de votre profil est un succès',
        user: createUser,
      });
    } else {
      res.status(400).json({ error: `Vous n'êtes pas autorisé à modifier ce profil` });
    }
  } catch (error) {
    res.status(403).send({ error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    //On chercher l'user par le tooken
    const userId = userIdByToken(req);
    const admin = await db.User.findOne({ where: { id: userId } });
    //On cherche l'id dans le paramètre de l'URL
    const user = await db.User.findOne({
      where: { id: id },
    });
    //Supprimer l'avatar si l'utilisateur en a un
    // Le compte peut être supprimer si le propre utilisateur le désire ||l'administrateur le pourra également
    if (
      (user.picture !== null && userId === user.id) ||
      (user.picture !== null && admin.isAdmin === true)
    ) {
      const filename = user.picture.split('/images')[1];
      fs.unlink(`images/${filename}`, () => {
        db.User.destroy({
          where: { id: id },
        });
        res.status(200).json({
          message: 'Votre compte a été supprimé ainsi que son image',
        });
      });
    } else {
      if (
        (user.picture === null && userId === user.id) ||
        (user.picture === null && admin.isAdmin === true)
      ) {
        db.User.destroy({
          where: { id: id },
        });
        res.status(200).json({
          message: 'Votre compte a été supprimé',
        });
      } else {
        res.status(400).send({ error: `Vous n'êtes pas autorisé à supprimer ce profil` });
      }
    }
  } catch (error) {
    res.status(403).send({ error: error.message });
  }
};
