const UserController = require('./controller')
const auth = require('../../middleware/auth')
const {StatusCodes} = require('http-status-codes')
const { body, validationResult, checkSchema } = require('express-validator');
const {getErrorObject} = require('../../../error')
const bcrypt = require('bcrypt')

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const schema = require('./schema')

router.post('/signup', checkSchema(schema),
  async function (req, res) {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            errorCode: 'auth_not_valid',
            errorMessage: getErrorObject('auth_not_valid'),
            errors: errors.array()
          });
      }
      const { username, password, uploadedImageAmount } = req.body;

      const encryptedPassword = await bcrypt.hash(password, 10)
      const UserCon = new UserController()
      const newUser = await UserCon.create({
        username,
        uploadedImageAmount,
        password: encryptedPassword
      })
      res.status(StatusCodes.CREATED)
      return res.json(newUser)
    }
    catch(e) {
      const msg = e.errors.map(item => item.message).join(',')
      return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR, msg)
    }
  })


router.post('/login',
  body('username').isLength({ min: 3 }),
  body('password').isLength({ min: 5 }),
 async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          errorCode: 'auth_not_valid',
          errorMessage: getErrorObject('auth_not_valid'),
          errors: errors.array()
        });
    }

    const { username, password } = req.body;
    const UserCon = new UserController()
    const user = await UserCon.findByUsername(username, {includePassword: true})
    if(!user) return res.responseDefaultError(StatusCodes.FORBIDDEN)

    const isCorrectPassword= await bcrypt.compare(password, user.password)
    if(!isCorrectPassword) return res.responseDefaultError(StatusCodes.FORBIDDEN)

    delete user['password'];
    const token = auth.signToken(user)
    return res.status(200).json({
      ...user,
      token
    });
  } catch (e) {
    console.error(e)
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

module.exports = router;