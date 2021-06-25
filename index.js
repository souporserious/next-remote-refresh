const { useEffect } = require('react')
const { useRouter } = require('next/router')

export function useRemoteRefresh({
  port = 3001,
  shouldRefresh = (event, router) => true,
} = {}) {
  if (process.env.NODE_ENV === 'development') {
    const router = useRouter()
    const refreshData = () => {
      const scrollY = window.pageYOffset
      router.replace(router.asPath).then(() => {
        window.scrollTo(0, scrollY)
      })
    }
    useEffect(() => {
      const ws = new WebSocket(`ws://localhost:${port}/ws`)
      ws.onmessage = (event) => {
        if (shouldRefresh(event.data, router)) {
          refreshData()
        }
      }
      return () => ws.close()
    }, [])
  }
}
