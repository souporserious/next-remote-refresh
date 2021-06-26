const withRemoteRefresh = require('next-remote-refresh')({
  paths: './package.json',
  port: 4001,
})
module.exports = withRemoteRefresh()
