import { NextConfig } from 'next'

interface PluginOptions {
  paths: string[]
  ignored?: string
  signal?: AbortSignal
}

export default function plugin (options: PluginOptions): (nextConfig: NextConfig) => Promise<NextConfig>
