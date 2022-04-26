const db = require('../models/index');
const token = require('../middlewares/token.middlewares');

module.exports.createCommentPost = async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      res.status(400).send({ error: `Impossible de commenter si aucun message n'est écrit` });
    } else {
      const userId = token.userIdByToken(req);
      const post = await db.Post.findOne({ where: { id: req.params.id } });
      const user = await db.User.findOne({ where: { id: userId } });
      console.log(user);

      //Création du commentaire avec tout les paramètres voulus

      const comment = await db.Comment.create({
        message,
        UserId: userId,
        PostId: post.id,
        username: user.username,
        picture: user.picture,
      });
      res.status(201).json({
        message: 'Commentaire publié avec succès',
        Comment: comment,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: `Un problème est survenu lors de l'exécution de la fonction : CreateCommentPost`,
    });
  }
};
module.exports.deleteCommentPost = async (req, res) => {
  try {
    const userId = token.userIdByToken(req);
    const admin = await db.User.findOne({ where: { id: userId } });
    const comment = await db.Comment.findOne({
      where: { id: req.params.id },
    });

    //Suppression du commentaire si l'utilisateur est le créateur du message ||l'admin pourra le supprimer également

    if (comment.UserId === userId || admin.isAdmin === true) {
      await db.Comment.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: 'Le commentaire a bien été supprimé',
        Comment: comment,
      });
    } else {
      res.status(403).send({ message: "'Aucune autorisation pour supprimer ce post'" });
    }
  } catch (error) {
    res.status(500).send({
      error: `Un problème est survenu lors de l'exécution de la fonction : DeleteCommentPost`,
    });
  }
};
module.exports.getComments = async (req, res) => {};
