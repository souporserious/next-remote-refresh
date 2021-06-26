const path = require('path');

const withRemoteRefresh = require('next-remote-refresh/plugin')({
  paths: [
    path.resolve(__dirname, '../package.json')
  ],
});

const nextConfig = {}

module.exports = withRemoteRefresh(nextConfig);