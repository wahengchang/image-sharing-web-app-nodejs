(async () => {
    const express = require('express')
    const app = express()
    const {ENV} = process.env
    
    const DB = require('./lib/Db')
    await DB.init()
    app.use(require('./middleware/expressFunction'))
  
    app.use('/apis/images', require('./routers/images'))
    app.use('/apis/user', require('./routers/users'))
    app.use('/apis/me', require('./routers/me'))
    app.use('/upload', require('./routers/upload'))

    if(ENV === 'prod') {
      app.use(express.static('build'))
    }

    const port = process.env.PORT || 4000
  
    app.listen(port, function () {
      console.log(`Example app listening on port ${port}! \n http://localhost:${port}`)
    })
  
  })()