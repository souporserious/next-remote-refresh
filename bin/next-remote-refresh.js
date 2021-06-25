#!/usr/bin/env node

const express = require('express')
const http = require('http')
const path = require('path')
const WebSocket = require('ws')
const chokidar = require('chokidar')

const [paths, ...options] = process.argv.slice(2)
const port = options.find((option) => option.includes('port'))
const ignore = options.find((option) => option.includes('ignore'))
const parseOption = (option) => (option ? option.split('=')[1] : null)

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

server.listen(parseInt(parseOption(port)) || 3001)

chokidar
  .watch(
    (Array.isArray(paths) ? paths : [paths]).map((filePath) =>
      path.resolve(process.cwd(), filePath)
    ),
    { ignored: parseOption(ignore) }
  )
  .on('change', (filePath) => {
    const baseName = path.basename(path.dirname(process.cwd()))
    const updatedPath = `${baseName}${filePath.split(baseName)[1]}`
    console.log(`${path.basename(filePath)} updated`)
    sockets.map((socket) => socket.send(updatedPath))
  })
