const createServer = require('./server')

module.exports = function plugin(options) {
  let port

  return async function withConfig(nextConfig = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (port === undefined) {
        const server = createServer(options)
        await new Promise((resolve, reject) => {
          server.on('listening', resolve)
          server.on('error', reject)
          server.on('close', reject)
        });
        ({ port } = server.address())
      }

      if (nextConfig.env === undefined) {
        nextConfig.env = {}
      }

      nextConfig.env.remoteRefreshPort = String(port)
    }

    return nextConfig
  }
}
