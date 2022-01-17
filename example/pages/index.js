import fs from 'fs'
import path from 'path'
import { useRemoteRefresh } from 'next-remote-refresh/hook'
import { useState } from 'react'

export default function Index({ pkg, watchFiles = [] }) {
  const [count, setCount] = useState(0)
  useRemoteRefresh()
  return (
    <div>
      <h2>
        {pkg.name} - v{pkg.version}
      </h2>
      <p>{pkg.description}</p>
      <div>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
        <span>{count}</span>
      </div>
      <h3>Files in <code>watch/</code></h3>
      <ul>
        {watchFiles.map(({ fileName, size }) => <li key={fileName}>{fileName} ({size}b)</li>)}
      </ul>
      <em>
        Hint: Update the package.json file at the root to see it live update.
      </em>
    </div>
  )
}

export function getStaticProps() {
  return {
    props: {
      pkg: JSON.parse(fs.readFileSync('../package.json', 'utf8')),
      watchFiles: fs.readdirSync('watch').map((fileName) => {
        const stat = fs.statSync(path.resolve('watch', fileName))
        return { fileName, size: stat.size }
      }),
    },
  }
}
