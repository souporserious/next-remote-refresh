const { useEffect } = require('react')
const { useRouter } = require('next/router')
const getConfig = require('next/config').default

// private API, might break on the next version
const {
  getEventSourceWrapper,
} = require('next/dist/client/dev/error-overlay/eventsource')

module.exports.useRemoteRefresh = function ({
  shouldRefresh = (path) => true,
} = {}) {
  if (process.env.NODE_ENV !== 'production') {
    const remoteRefreshPath =
      getConfig().publicRuntimeConfig.__remoteRefreshPath
    const router = useRouter()
    useEffect(() => {
      const source = getEventSourceWrapper({ path: remoteRefreshPath })
      source.addMessageListener((event) => {
        // heartbeat
        if (event.data === '\uD83D\uDC93') {
          return
        }
        
        if (shouldRefresh(JSON.parse(event.data).path)) {
          router.replace(router.asPath, router.asPath, {
            scroll: false,
          })
        }
      })
      return () => source.close()
    }, [router])
  }
}
