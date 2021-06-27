import { useState } from 'react'
import path from 'path'
import fs from 'fs'
import { useRemoteRefresh } from 'next-remote-refresh/hook'

export default function Index({ name, version, description }) {
  const [count, setCount] = useState(0)
  useRemoteRefresh()
  return (
    <div>
      <h2>
        {name} - v{version}
      </h2>
      <p>{description}</p>
      <div>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
        <span>{count}</span>
      </div>
      <em>
        Hint: Update the package.json file at the root to see it live update.
      </em>
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
