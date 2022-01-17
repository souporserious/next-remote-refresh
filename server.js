const chokidar = require('chokidar')
const WebSocket = require('ws')

module.exports = function createServer({ paths, ignored }) {
  const wss = new WebSocket.Server({ port: 0 })
  let sockets = []

  const watcher = chokidar
    .watch(paths, { ignored, cwd: process.cwd() })
    .on('all', (event, filePath) => {
      console.log(`[remote-refresh] ${filePath} updated`)
      sockets.map((socket) => socket.send(filePath))
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
