const withRemoteRefresh = require('next-remote-refresh')({
  paths: [require('path').resolve(__dirname, '../package.json')],
})

const nextConfig = {}

module.exports = withRemoteRefresh(nextConfig)
