const UserController = require('./users/controller')
const ImageController = require('./images/controller')
const {requiredLogin} = require('../middleware/auth')
const {StatusCodes} = require('http-status-codes')

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', requiredLogin, async function (req, res) {
  try{
    const {id} = res.locals.user
    const UserCon = new UserController()
    const user = await UserCon.findById(id)

    if(!user) return res.responseDefaultError(StatusCodes.FORBIDDEN)

    return res.json(user)
  }
  catch(e) {
    console.error(e)
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

// router.post('/purchase', requiredLogin, async function (req, res) {
//   try{
//     const {id} = res.locals.user
//     const {productId} = req.body

//     const ProCon = new ProductController()
//     const product = await ProCon.findById(productId)
//     const {quantity, beginAt, price} = product
//     const now = new Date()
//     const beginAtDate = new Date(beginAt)

//     if(quantity <=0) {
//       return res.responseDefaultError(StatusCodes.NOT_ACCEPTABLE, 'product has no enough quantity, less than 0 ')
//     }

//     // start in the future
//     if(now < beginAtDate) {
//       return res.responseDefaultError(StatusCodes.NOT_ACCEPTABLE, 'product is not start selling yet')
//     }

//     const UserCon = new UserController()
//     const user = await UserCon.findById(id)
//     const {uploadedImageAmount} = user

//     // start in the future
//     if(uploadedImageAmount < price) {
//       return res.responseDefaultError(StatusCodes.NOT_ACCEPTABLE, "you don't have enough uploadedImageAmount")
//     }

//     return res.json({
//       user
//     })
//   }
//   catch(e) {
//     console.error(e)
//     return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
//   }
// })


module.exports = router;