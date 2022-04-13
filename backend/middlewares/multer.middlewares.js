const multer = require('multer');

//Type de fichiers pour le téléchargement

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  //Destination des fichiers
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    //Création du nom de fichier avec le "MIME_TYPES" ainsi avec date et heure
    const name = file.originalname.split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + DataTransfer.now() + '.' + extension);
  },
});

module.exports = multer({ storage: storage }).single('file');