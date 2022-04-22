const db = require('../models/index');
const fs = require('fs');
const token = require('../middlewares/token.middlewares');

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: ['id', 'message', 'postImg', 'link', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          attributes: ['id', 'username', 'picture'],
        },

        {
          model: db.Comment,
          attributes: ['UserId', 'id', 'username', 'message'],
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
          attributes: ['UserId', 'username', 'message'],
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

//Création d'une publication

module.exports.createPost = async (req, res) => {
  const userId = token.userIdByToken(req);
  let postImg;

  try {
    const user = await db.User.findOne({
      attributes: ['id', 'username', 'picture'],
      where: { id: userId },
    });

    if (user !== null) {
      if (req.file) {
        postImg = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      } else {
        postImg = null;
      }

      //Création du post avec l'id, l'username et son image perso

      const post = await db.Post.create({
        include: [
          {
            model: db.User,
            attributes: ['id', 'username', 'picture'],
          },
        ],
        UserId: user.id,
        postImg: postImg,
        message: req.body.message,
        link: req.body.link,
      });
      res.status(201).json({
        user: user,
        post: post,
        message: 'Votre post a été publié',
      });
    } else {
      res.status(400).send({ error: 'Utilisateur introuvable' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: `Un problème est survenu lors de l'exécution de la fonction : CreatePost` });
  }
};

//Supression du post

module.exports.deletePost = async (req, res) => {
  try {
    const userId = token.userIdByToken(req);
    const post = await db.Post.findOne({ where: { id: req.params.id } });

    if (userId === post.UserId) {
      //On supprime également l'image sur le serveur s'il y en a une
      if (post.postImg) {
        const filename = post.postImg.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          db.Post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: `le post avec ${filename} a été supprimé` });
        });
      } else {
        // Truncate permet de supprimer toutes les données d’une table sans supprimer la table en elle-même
        db.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: 'Le post est supprimé' });
      }
    } else {
      res.status(403).json({ message: 'Aucune autorisation pour supprimer ce post' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: `Un problème est survenu lors de l'exécution de la fonction : DeletePost` });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    let newPostImg;
    const userId = token.userIdByToken(req);

    let post = await db.Post.findOne({ where: { id: req.params.id } });
    //Si l'utilisateur est le créateur du post, il pourra modifier celui-ci
    if (userId === post.UserId) {
      if (req.file) {
        newPostImg = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        if (post.postImg) {
          //Fonction permettant de modifier ou supprimer l'ancienne image s'il en trouve une
          const filename = post.postImg.split('/images/')[1];
          fs.unlink(`images/${filename}`, (error) => {
            //Remplacer l'image et supprimé l'image présente dans le local
            if (error) {
              console.log(error);
            } else {
              console.log(`${filename} supprimé.`);
            }
          });
        }
      }
      //Si un utilisateur à déja un message
      if (req.body.message) {
        post.message = req.body.message;
      }
      post.link = req.body.link;
      post.postImg = newPostImg;

      //On sauvegarde avec les bon champs du model
      const newPost = await post.save({
        fields: ['message', 'link', 'postImg'],
      });
      res.status(200).json({
        //Post modifié accompagner d'un message comme quoi la publication a bien été modifié
        newPost: newPost,
        message: 'publication mise à jour',
      });
    } else {
      res.status(403).json({
        message: 'Aucune autorisation pour modifier ce post',
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: `Un problème est survenu lors de l'exécution de la fonction : UpdatePost` });
  }
};
