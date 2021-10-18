const { setHeadlessWhen } = require('@codeceptjs/configure');
const {Worker, isMainThread} = require('worker_threads')


let serverWorker = null

function startServer() {
  serverWorker = new Worker('./server/index.js') // assuming the main entry file of your server is in ./index.js file
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve()
    }, 1000);
  })
}
async function stopServer() {
  if (serverWorker) {
    await serverWorker.terminate()
  }
}

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './f2eTest/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:4000',
      show: false,
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  name: 'image-sharing-web-app-nodejs',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  },
  async bootstrapAll() {
    await startServer()
  },
  async bootstrap() {
    if (isMainThread) {
      await startServer()
    }
  },
  async teardown() {
    if (isMainThread) {
      await stopServer()
    }
  },
  async teardownAll() {
    await stopServer()
  },
}