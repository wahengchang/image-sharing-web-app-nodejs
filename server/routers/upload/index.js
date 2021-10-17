const express = require('express');
const router = express.Router();
const multer = require('multer')
const {StatusCodes} = require('http-status-codes')
const {getErrorObject} = require('../../../error')
const {requiredLogin} = require('../../middleware/auth')
const ImageController = require('../images/controller')

const uploadFolderName = 'upload'
const DIR = `./${uploadFolderName}/`;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, `${new Date().getTime()}` + '-' + fileName)
    }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
}).single('file')

router.get('/:filename', requiredLogin, async (req, res) => {
    try {
        console.log('res.locals.user: ', res.locals.user)
        const {filename} = req.params  
        const {user} = res.locals
        const ImageCon = new ImageController()
        const foundItemList = await ImageCon.list({
            where: {
                userId: user.id,
                imageUrlId: filename
            }
        })
        if(foundItemList.length <=0) {
            return res
            .status(StatusCodes.FORBIDDEN)
            .json({
                errorCode: 'forbidden',
                errorMessage: getErrorObject('forbidden'),
            });
        }
        
        const options = {
            root: `${__dirname}/../../../${uploadFolderName}/`
        };
      
        res.sendFile(filename, options, function (err) {  
            if (err) {
                next(err);
            } else {
                console.log('Sent:', filename);
            }
        });
    }
    catch (e) {
        console.log(e)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            errorCode: 'unknown',
            errorMessage: getErrorObject('unknown'),
            errors: errors.array()
          });
    }
})
  
router.post('/', requiredLogin, async (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          return res.status(500).json(err)
      }

      const host = req.get('host')
      const imageUrl = `${host}/${uploadFolderName}/${req.file.filename}`

      console.log(req.file)

      return res.status(200).send(imageUrl)
    })
  }
  catch(e) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          errorCode: 'image_not_valid',
          errorMessage: getErrorObject('image_not_valid'),
          errors: errors.array()
        });
    }

    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

module.exports = router;