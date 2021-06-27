const { useEffect } = require('react')
const { useRouter } = require('next/router')
const getConfig = require('next/config').default;

// private API, might break on the next version
const { getEventSourceWrapper } = require('next/dist/client/dev/error-overlay/eventsource');

module.exports.useRemoteRefresh = function ({
  shouldRefresh = (path) => true,
} = {}) {
  if (process.env.NODE_ENV !== 'production') {
    const remoteRefreshPath = getConfig().publicRuntimeConfig.__remoteRefreshPath;
    const router = useRouter()

    useEffect(() => {
      const source = getEventSourceWrapper({ path: remoteRefreshPath });
      source.addMessageListener((evt) => {
        if (shouldRefresh(JSON.parse(evt.data).path)) {
          router.replace(router.asPath, router.asPath, {
            scroll: false,
          });
        }
      });

      return () => source.close()
    }, [])
  }
}
