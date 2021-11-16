const { useEffect } = require('react')
const { useRouter } = require('next/router')
const getConfig = require('next/config').default

module.exports.useRemoteRefresh = function ({
  shouldRefresh = (updatedPath) => true,
} = {}) {
  if (process.env.NODE_ENV !== 'production') {
    const port = getConfig().publicRuntimeConfig.__remoteRefreshPort
    const router = useRouter()
    useEffect(() => {
      const ws = new WebSocket(`ws://localhost:${port}/ws`)
      ws.onmessage = (event) => {
        if (shouldRefresh(event.data)) {
          router.replace(router.asPath)
        }
      }
      return () => ws.close()
    }, [])
  }
}
