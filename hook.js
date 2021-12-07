const { useEffect } = require('react')
const { useRouter } = require('next/router')

module.exports.useRemoteRefresh = function ({
  shouldRefresh = (updatedPath) => true,
} = {}) {
  if (process.env.NODE_ENV !== 'production') {
    const router = useRouter()
    useEffect(() => {
      const ws = new WebSocket(
        `ws://localhost:${process.env.remoteRefreshPort}/ws`
      )
      ws.onmessage = (event) => {
        if (shouldRefresh(event.data)) {
          router.replace(router.asPath)
        }
      }
      return () => ws.close()
    }, [])
  }
}
