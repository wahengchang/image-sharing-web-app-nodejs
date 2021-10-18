const Sequelize = require('sequelize')

class DB {
  constructor(_config = null) {
    const config = _config || require('../../config')
    const {dialect, storage, logging} = config
    const sequelize = new Sequelize({
      dialect, storage, logging,
      query:{
        raw:true,
      },
    })
    this.sequelize = sequelize
    this.isInit = false
  }

  getSequelize() {
    return this.sequelize
  }

  async init(options = {}){
    if(this.isInit) return

    const {isPurge = false} = options
    const dbOptions = isPurge ? { force: true } : {}
    // return this.sequelize.sync({ force: true })

    if(isPurge) {
      console.log('[INFO] going to purge')
    }

    await this.sequelize.sync(dbOptions)
    console.log(`Database & tables created!`)
    await require('../routers/images/model').sync(dbOptions)
    console.log(`ImageModel created!`)
    await require('../routers/users/model').sync(dbOptions)
    console.log(`UserModel created!`)
    this.isInit = true
  }
}

module.exports = new DB()