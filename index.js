const path = require('path')
const createServer = require('./server')

let port

module.exports = function plugin(options) {
  return function withConfig(nextConfig = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!port) {
        port = createServer(options)
      }

      nextConfig.publicRuntimeConfig = {
        ...nextConfig.publicRuntimeConfig,
        __remoteRefreshPath: `http://localhost:${port}/refresh`,
      }
    }

    nextConfig.webpack = (config) => {
      config.module.rules.unshift({
        test: /_app.*(js|jsx|ts|tsx)$/,
        use: [{ loader: path.resolve(__dirname, 'loader') }],
      })
      return config
    }

    return nextConfig
  }
}
