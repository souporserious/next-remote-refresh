const createServer = require('./server')
const plugin = require('.')

jest.mock('./server')

describe('plugin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets remoteRefreshPort in the env', async () => {
    createServer.mockReturnValue({
      address: () => ({ port: 2000 }),
      on: (event, callback) => {
        if (event === 'listening') callback()
      },
    })
    const withRemoteRefresh = plugin({ paths: '/test' })

    const config = await withRemoteRefresh()

    expect(createServer).toHaveBeenCalledWith({ paths: '/test' })
    expect(config.env).toEqual({ remoteRefreshPort: 2000 })
  })

  it('preserves existing env entries', async () => {
    createServer.mockReturnValue({
      address: () => ({ port: 2000 }),
      on: (event, callback) => {
        if (event === 'listening') callback()
      },
    })
    const withRemoteRefresh = plugin()

    const config = await withRemoteRefresh({ env: { foo: 'bar' } })

    expect(config.env).toEqual({ foo: 'bar', remoteRefreshPort: 2000 })
  })

  it('reuses an existing server instance', async () => {
    createServer.mockReturnValue({
      address: () => ({ port: 2000 }),
      on: (event, callback) => {
        if (event === 'listening') callback()
      },
    })
    const withRemoteRefresh = plugin()

    const config1 = await withRemoteRefresh()
    createServer.mockReturnValue({
      address: () => ({ port: 2001 }),
      on: (event, callback) => {
        if (event === 'listening') callback()
      },
    })
    const config2 = await withRemoteRefresh()

    expect(createServer).toHaveBeenCalledTimes(1)
    expect(config1.env).toEqual({ remoteRefreshPort: 2000 })
    expect(config2.env).toEqual({ remoteRefreshPort: 2000 })
  })
})
