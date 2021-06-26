# next-remote-refresh

Utilize Fast Refresh for remote data in NextJS.

## Install

```bash
yarn add next-remote-refresh --dev
```

```bash
npm install next-remote-refresh --save-dev
```

## Usage

[View Example](/example)

### Plugin

```js
// next.config.js
const withRemoteRefresh = require('next-remote-refresh')({
  paths: ['files', 'to', 'watch'],
  port: 3001, // port for web socket server
  ignored: '**/*.json', // files to skip
})
module.exports = withRemoteRefresh({
  // next config options here
})
```

### `useRemoteRefresh`

```jsx
import { useRemoteRefresh } from 'next-remote-refresh'
import path from 'path'

function App({ name, version }) {
  useRemoteRefresh({
    shouldRefresh: (path, router) => {
      // control when the page should refresh
      return true
    },
  })
  return (
    <div>
      Package: {name} Version: {version}
    </div>
  )
}

export function useStaticProps() {
  return {
    props: path.resolve(process.cwd(), './package.json', 'utf-8'),
  }
}
```

## Development

```bash
yarn install && yarn build && yarn link
cd example
yarn install && yarn link next-remote-refresh
yarn dev
```

## Related

[next-remote-watch](https://github.com/hashicorp/next-remote-watch)
