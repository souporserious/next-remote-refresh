const path = require('path')

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [
    path.resolve(__dirname, '../package.json'),
    path.resolve(__dirname, 'watch'),
  ],
})

const nextConfig = {}

module.exports = withRemoteRefresh(nextConfig)
