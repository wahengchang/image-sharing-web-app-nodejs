(async () => {
    const express = require('express')
    const app = express()
    
    app.use(express.static('public'))
  
    app.get('/', async (req, res) => {
      const title = `title-${new Date().getTime()}`
      return res.send(`Hello World! : ${title}`)
    })
  
    const port = process.env.PORT || 3000
  
    app.listen(port, function () {
      console.log(`Example app listening on port ${port}! \n http://localhost:${port}`)
    })
  
  })()