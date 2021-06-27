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

```json
{
  "scripts": {
    "dev": "next-remote-refresh ../docs & next dev"
  }
}
```

### `useRemoteRefresh`

```jsx
import { useRemoteRefresh } from 'next-remote-refresh'
import path from 'path'

function App({ name, version }) {
  useRemoteRefresh({
    shouldRefresh: (path, router) => {
      // do something based on changed file path
    },
  })
  return (
    <div>
      Package: {name} Version: {version}
    </div>
  )
}

export function getStaticProps() {
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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/souporserious"><img src="https://avatars.githubusercontent.com/u/2762082?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Travis Arnold</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=souporserious" title="Code">💻</a> <a href="https://github.com/souporserious/next-remote-refresh/commits?author=souporserious" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/joshwcomeau"><img src="https://avatars.githubusercontent.com/u/6692932?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joshua Comeau</b></sub></a><br /><a href="#ideas-joshwcomeau" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!