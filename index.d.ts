import { NextConfig } from 'next'

interface PluginOptions {
  paths: string[]
  ignored?: string
}

export default function plugin (options: PluginOptions): (nextConfig: NextConfig) => NextConfig
