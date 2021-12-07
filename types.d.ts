import { NextConfig } from 'next/dist/next-server/server/config-shared'

declare module 'next-remote-refresh' {
  interface Options {
    paths: string[]
    ignored?: string
  }

  type Config = NextConfig | {}

  type Plugin = (options: Options) => (nextConfig: Config) => Config

  const plugin: Plugin

  export default plugin
}

declare module 'next-remote-refresh/hook' {
  export function useRemoteRefresh(options?: {
    shouldRefresh?: (updatedPath: string) => boolean
  }): void
}
