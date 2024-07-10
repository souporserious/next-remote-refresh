# next-remote-refresh

Utilize Fast Refresh for remote data in Next.js. See the [example](/example) for setup.

## Install

```bash
yarn add next-remote-refresh --dev
```

```bash
npm install next-remote-refresh --save-dev
```

## Usage

### plugin

Add and configure plugin in `next.config.mjs`:

```js
// next.config.mjs
import { resolve } from 'node:path'
import createRemoteRefresh from 'next-remote-refresh'

const withRemoteRefresh = createRemoteRefresh({
  paths: [resolve(__dirname, './package.json')],
  ignored: '**/*.json',
})

export default withRemoteRefresh({ ...next config here })
```

### `useRemoteRefresh` hook

Add the `useRemoteRefresh` hook to the top-level component in your app. You may also configure when the app should refresh based on the changed `path`:

```jsx
import { useRouter } from 'next/router'
import { useRemoteRefresh } from 'next-remote-refresh/hook'
import path from 'path'

function App({ name, version }) {
  const router = useRouter()
  
  useRemoteRefresh({
    shouldRefresh: (path) => path.includes(router.query.slug),
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
yarn install && yarn link
cd example
yarn install && yarn link next-remote-refresh
yarn dev
```

## Related

[Refreshing Server-Side Props](https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/)

[next-remote-watch](https://github.com/hashicorp/next-remote-watch)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/souporserious"><img src="https://avatars.githubusercontent.com/u/2762082?v=4?s=100" width="100px;" alt="Travis Arnold"/><br /><sub><b>Travis Arnold</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=souporserious" title="Code">💻</a> <a href="https://github.com/souporserious/next-remote-refresh/commits?author=souporserious" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/joshwcomeau"><img src="https://avatars.githubusercontent.com/u/6692932?v=4?s=100" width="100px;" alt="Joshua Comeau"/><br /><sub><b>Joshua Comeau</b></sub></a><br /><a href="#ideas-joshwcomeau" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://fatihkalifa.com"><img src="https://avatars.githubusercontent.com/u/1614415?v=4?s=100" width="100px;" alt="Fatih Kalifa"/><br /><sub><b>Fatih Kalifa</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=pveyes" title="Code">💻</a> <a href="https://github.com/souporserious/next-remote-refresh/commits?author=pveyes" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://codedaily.io"><img src="https://avatars.githubusercontent.com/u/1714673?v=4?s=100" width="100px;" alt="Jason Brown"/><br /><sub><b>Jason Brown</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=browniefed" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://paco.sh"><img src="https://avatars.githubusercontent.com/u/34928425?v=4?s=100" width="100px;" alt="Paco"/><br /><sub><b>Paco</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=pacocoursey" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://arnavgosain.com"><img src="https://avatars.githubusercontent.com/u/12715704?v=4?s=100" width="100px;" alt="Arnav Gosain"/><br /><sub><b>Arnav Gosain</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=arn4v" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://timdav.is/"><img src="https://avatars.githubusercontent.com/u/7432943?v=4?s=100" width="100px;" alt="Tim Davis"/><br /><sub><b>Tim Davis</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=thebearingedge" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kherock"><img src="https://avatars.githubusercontent.com/u/4993980?v=4?s=100" width="100px;" alt="Kyle Herock"/><br /><sub><b>Kyle Herock</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=kherock" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://maggieliu.dev"><img src="https://avatars.githubusercontent.com/u/63619830?v=4?s=100" width="100px;" alt="Maggie Liu"/><br /><sub><b>Maggie Liu</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=maggie-j-liu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://pkerschbaum.com"><img src="https://avatars.githubusercontent.com/u/13141109?v=4?s=100" width="100px;" alt="Patrick Kerschbaum"/><br /><sub><b>Patrick Kerschbaum</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=pkerschbaum" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ajitid.com"><img src="https://avatars.githubusercontent.com/u/26769888?v=4?s=100" width="100px;" alt="Ajit"/><br /><sub><b>Ajit</b></sub></a><br /><a href="#ideas-ajitid" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://thomasuta.com"><img src="https://avatars.githubusercontent.com/u/12129478?v=4?s=100" width="100px;" alt="Thomas Jan Uta"/><br /><sub><b>Thomas Jan Uta</b></sub></a><br /><a href="https://github.com/souporserious/next-remote-refresh/commits?author=ThomasJanUta" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
