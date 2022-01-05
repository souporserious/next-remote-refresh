const { EventEmitter, once } = require('events')
const { WebSocket } = require('ws')

const createServer = require('./server')

jest.mock('chokidar')

describe('server', () => {
  let wss
  let watcherMock

  beforeEach(async () => {
    watcherMock = Object.assign(new EventEmitter(), {
      close: jest.fn(),
    })
    jest.spyOn(require('chokidar'), 'watch').mockReturnValue(watcherMock)
    wss = createServer({ paths: '/test' })
    await once(wss, 'listening')
  })

  afterEach(async () => {
    wss.close()
    jest.restoreAllMocks()
  })

  it('accepts a websocket connection', async () => {
    const socket = new WebSocket(`ws://localhost:${wss.address().port}`)
    try {
      await once(socket, 'open')
    } finally {
      socket.close()
    }
  })

  it('watches a directory for changes', async () => {
    const socket = new WebSocket(`ws://localhost:${wss.address().port}`)
    try {
      await once(socket, 'open')

      watcherMock.emit('change', '/test/foo.txt')

      const [data] = await once(socket, 'message')

      // TODO: server sends `undefined` when a file changes outside of the working directory
      expect(data.toString('utf8')).toMatch('undefined')
    } finally {
      socket.close()
    }
  })
})
