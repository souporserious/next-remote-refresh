const path = require('path')
const WebSocket = require('ws')
const chokidar = require('chokidar')

module.exports = function createServer({ paths, ignored }) {
  const wss = new WebSocket.Server({ port: 0 })
  let sockets = []

  const watcher = chokidar
    .watch(
      (Array.isArray(paths) ? paths : [paths]).map((filePath) =>
        path.resolve(process.cwd(), filePath),
      ),
      { ignored },
    )
    .on('change', (filePath) => {
      const baseName = path.basename(path.dirname(process.cwd()))
      const updatedPath = `${baseName}${filePath.split(baseName)[1]}`
      console.log(`[remote-refresh] ${path.basename(filePath)} updated`)
      sockets.map((socket) => socket.send(updatedPath))
    })

  return wss
    .on('listening', () => {
      console.log(
      `[remote-refresh] server is listening at port ${wss.address().port}`,
      )
    })
    .on('connection', (ws) => {
      sockets.push(ws)
      ws.on('close', () => {
        sockets = sockets.filter((socket) => socket !== ws)
      })
    })
    .on('close', () => {
      watcher.close()
    })
}
