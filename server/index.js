(async () => {
    const express = require('express')
    const app = express()
    const {ENV} = process.env
    
    const DB = require('./lib/Db')
    await DB.init()
    app.use(require('./middleware/expressFunction'))
  
    app.use('/images', require('./routers/images'))
    app.use('/user', require('./routers/users'))
    app.use('/me', require('./routers/me'))

    if(ENV === 'prod') {
      app.use(express.static('build'))
    }

    const port = process.env.PORT || 4000
  
    app.listen(port, function () {
      console.log(`Example app listening on port ${port}! \n http://localhost:${port}`)
    })
  
  })()