const express = require('express')
const http = require('http')
const path = require('path')
const WebSocket = require('ws')
const chokidar = require('chokidar')

module.exports.createServer = function ({ paths = '.', port = 3001, ignored }) {
  const app = express()
  const server = http.createServer(app)
  const wss = new WebSocket.Server({ server })
  let sockets = []

  wss.on('connection', (ws) => {
    sockets.push(ws)
    ws.on('close', () => {
      sockets = sockets.filter((socket) => socket !== ws)
    })
  })

  server.listen(port)

  chokidar
    .watch(
      (Array.isArray(paths) ? paths : [paths]).map((filePath) =>
        path.resolve(process.cwd(), filePath)
      ),
      { ignored }
    )
    .on('change', (filePath) => {
      const baseName = path.basename(path.dirname(process.cwd()))
      const updatedPath = `${baseName}${filePath.split(baseName)[1]}`
      console.log(`${path.basename(filePath)} updated`)
      sockets.map((socket) => socket.send(updatedPath))
    })
}
