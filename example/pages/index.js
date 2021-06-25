import path from 'path'
import fs from 'fs'
import { useRemoteRefresh } from 'next-remote-refresh'

export default function Index({ name, version, description }) {
  useRemoteRefresh({
    port: 3002,
  })
  return (
    <div>
      <h2>
        {name} - v{version}
      </h2>
      <p>{description}</p>
    </div>
  )
}

export function getStaticProps() {
  return {
    props: JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), '../package.json'), 'utf-8')
    ),
  }
}
