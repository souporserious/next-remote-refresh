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
          // Change a query parameter on every refresh to forcefully refresh the props
          // otherwise, pages with a hash like `/blog#my-heading` will not refresh
          replace(router, '1').then(() => replace(router, null))
        }
      })
      return () => source.close()
    }, [router])
  }
}

const QUERY_NAME = '__remote-refresh__'

async function replace(router, refresh) {
  const query = { ...router.query }
  if (!refresh) delete query[QUERY_NAME]
  else query[QUERY_NAME] = refresh

  return router.replace(
    {
      pathname: router.pathname,
      hash: window.location.hash,
      query
    },
    undefined,
    { scroll: false, shallow: false },
  )
}
