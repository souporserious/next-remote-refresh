import path from 'path'
import fs from 'fs'

export default function Index({ name, version, description }) {
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
