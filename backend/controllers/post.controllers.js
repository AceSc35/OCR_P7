const db = require('../models/index');
const fs = require('fs');
const token = require('../middlewares/token.middlewares');

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: ['id', 'message', 'picture', 'link', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          attributes: ['id', 'username', 'picture'],
        },

        {
          model: db.Comment,
          attributes: ['userId', 'id', 'username', 'message'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: db.User,
              attributes: ['username', 'picture'],
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .send({ error: `Un problème est survenu lors de l'exécution de la fonction : GetAllPosts` });
  }
};

module.exports.getOnePost = async (req, res) => {
  // on récupère le post avec l'id fourni en plus des tables et attributs nécessaires
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      includes: [
        {
          model: db.User,
          attributes: ['id', 'username', 'picture'],
        },
        {
          model: db.Comment,
          limit: 10,
          order: [['createdAt', 'DESC']],
          attributes: ['userId', 'username', 'message'],
          includes: [
            {
              model: db.User,
              attributes: ['username', 'picture'],
            },
          ],
        },
      ],
    });
    res.status(200).send(post);
  } catch (error) {
    res
      .status(500)
      .send({ error: `Un problème est survenu lors de l'exécution de la fonction : GetOnePost` });
  }
};
