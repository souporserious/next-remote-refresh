module.exports = async function (source) {
  const callback = this.async()
  if (this.resourcePath.includes('_app')) {
    // insert hook here
  }
  return callback(null, source)
}
