#!/usr/bin/env node

const { createServer } = require('../server')

const [paths, ...options] = process.argv.slice(2)
const port = options.find((option) => option.includes('port'))
const ignored = options.find((option) => option.includes('ignore'))
const parseOption = (option) => (option ? option.split('=')[1] : null)

createServer({
  paths,
  port: parseInt(parseOption(port)) || 3001,
  ignored: parseOption(ignored),
})
