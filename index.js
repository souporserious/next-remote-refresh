const createServer = require('./server')

module.exports = function plugin(options) {
  let port

  return function withConfig(nextConfig = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (port === undefined) {
        ({ port } = createServer(options).address())
      }

      if (nextConfig.env === undefined) {
        nextConfig.env = {}
      }

      nextConfig.env.remoteRefreshPort = port
    }

    return nextConfig
  }
}
