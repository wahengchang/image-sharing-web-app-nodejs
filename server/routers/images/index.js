
const express = require('express');
const {StatusCodes, getReasonPhrase} = require('http-status-codes')
const {requiredLogin} = require('../../middleware/auth')
const router = express.Router();
const ImageController = require('./controller')

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', requiredLogin, async (req, res) => {
  try {
    const {title,price,quantity,beginAt} = req.body
    const ImageCon = new ImageController()
    const createItem = await ImageCon.create({title,price,quantity,beginAt})

    res.status(StatusCodes.OK)
    return res.json(createItem);
  }
  catch(e) {
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})


router.patch('/:id', requiredLogin, async (req, res) => {
  try {
    const {id} = req.params
    const {title,price,quantity,beginAt} = req.body
    const ImageCon = new ImageController()
    const updatedItem = await ImageCon.update(id, {title,price,quantity,beginAt})

    res.status(StatusCodes.OK)
    return res.json(updatedItem);
  }
  catch(e) {
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.get('/:id', requiredLogin, async (req, res) => {
  try {
    const {id} = req.params

    if(!id) {
      return res.responseDefaultError(StatusCodes.PRECONDITION_FAILED)
    }
    
    const ImageCon = new ImageController()
    const foundItem = await ImageCon.findById(id)
    res.status(StatusCodes.OK)
    return res.json(foundItem)
  }
  catch(e) {
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.get('/', requiredLogin, async (req, res) => {
  try {
    const ImageCon = new ImageController()
    const foundItemList = await ImageCon.list()
    res.status(StatusCodes.OK)
    return res.json(foundItemList);
  }
  catch(e) {
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

module.exports = router;