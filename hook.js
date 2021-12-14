const { useEffect, useRef } = require('react')
const { useRouter } = require('next/router')

module.exports.useRemoteRefresh = function ({ shouldRefresh } = {}) {
  if (process.env.NODE_ENV !== 'production') {
    const router = useRouter()
    const wsRef = useRef()
    useEffect(() => {
      const ws = new WebSocket(`ws://localhost:${process.env.remoteRefreshPort}/ws`)
      wsRef.current = ws
      return () => ws.close()
    }, [])
    useEffect(() => {
      const ws = wsRef.current
      const listener = (event) => {
        if (!shouldRefresh || shouldRefresh(event.data)) {
          router.replace(router.asPath)
        }
      }
      ws.addEventListener('message', listener)
      return () => ws.removeEventListener('message', listener)
    }, [shouldRefresh, router.asPath])
  }
}
