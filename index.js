const path = require('path')
const { createServer } = require('./server')

module.exports = (pluginOptions) => {
  createServer(pluginOptions)
  return (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        config.module.rules.unshift({
          test: /\.(js|jsx|ts|tsx)$/,
          use: [{ loader: path.resolve(__dirname, 'loader') }],
        })

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }

        return config
      },
    })
  }
}
