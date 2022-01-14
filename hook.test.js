const { fireEvent } = require('@testing-library/react')
const { renderHook } = require('@testing-library/react-hooks')

const { useRemoteRefresh } = require('./hook')
const { mockRouter, routerWrapper } = require('./test-utils')

describe('hook', () => {
  const port = 2000
  const originalNodeEnv = process.env.NODE_ENV
  let wsMock

  beforeAll(() => {
    process.env.remoteRefreshPort = port
  })

  beforeEach(async () => {
    wsMock = new EventTarget()
    jest.spyOn(globalThis, 'WebSocket').mockReturnValue(wsMock)
  })

  afterEach(async () => {
    jest.restoreAllMocks()
    process.env.NODE_ENV = originalNodeEnv
  })

  it('establishes a local WebSocket connection', async () => {
    renderHook(useRemoteRefresh, { wrapper: routerWrapper })

    expect(WebSocket).toHaveBeenCalledWith(`ws://localhost:${port}/ws`)
  })

  it('does nothing when NODE_ENV is production', async () => {
    process.env.NODE_ENV = 'production'
    renderHook(useRemoteRefresh, { wrapper: routerWrapper })

    expect(WebSocket).not.toHaveBeenCalled()
  })

  it('refreshes when signaled', async () => {
    renderHook(useRemoteRefresh, { wrapper: routerWrapper })
    const event = new Event('message')
    event.data = 'foo/bar'
    fireEvent(wsMock, event)

    expect(mockRouter.replace).toHaveBeenCalled()
  })

  it('refreshes when shouldRefresh returns true', async () => {
    const shouldRefresh = jest.fn(() => true)
    renderHook(useRemoteRefresh, { wrapper: routerWrapper, initialProps: { shouldRefresh } })
    const event = new Event('message')
    event.data = 'foo/bar'
    fireEvent(wsMock, event)

    expect(shouldRefresh).toHaveBeenCalledWith('foo/bar')
    expect(mockRouter.replace).toHaveBeenCalled()
  })

  it('does not refresh when shouldRefresh returns false', async () => {
    const shouldRefresh = jest.fn(() => false)
    renderHook(useRemoteRefresh, { wrapper: routerWrapper, initialProps: { shouldRefresh } })
    const event = new Event('message')
    event.data = 'foo/bar'
    fireEvent(wsMock, event)

    expect(shouldRefresh).toHaveBeenCalledWith('foo/bar')
    expect(mockRouter.replace).not.toHaveBeenCalled()
  })
})
