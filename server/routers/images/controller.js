const Base = require('../../lib/ControllerBase')
const Model = require('./model')
const path = require('path')

const getBasenameFormUrl = (urlStr) => {
    const url = new URL(urlStr)
    return path.basename(url.pathname)
}

class Controller extends Base {
    constructor(_config){
        super(_config)
        const {sequelize} = this
        this.model = Model
    }
    async create(payload = {}) {
      const {model} = this
      const {imageUrl} = payload
      const imageUrlId = getBasenameFormUrl(imageUrl)
      const data = await model.create({
          ...payload,
          imageUrlId
        })
      return data.dataValues
    }
    findById (id) {
        return this.model.findOne({
            where: {id},
        })
    }
    list(config = {}) {
        return this.model.findAll(config)
    }
    update(id, payload = {}) {
        return this.model.update(payload, {where: {id}})
    }
}

Controller.getBasenameFormUrl = getBasenameFormUrl

module.exports = Controller