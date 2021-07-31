const remoteRefreshExport = `
function RemoteRefresh(props) {
    return _react["default"].createElement(App, Object.assign({}, props, { children: 'Hello World' }));
};
exports.default = RemoteRefresh;
`

module.exports = function (source) {
  return source.replace('exports.default = App;', remoteRefreshExport)
}
