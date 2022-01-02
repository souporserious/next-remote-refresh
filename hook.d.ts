interface HookOptions {
  shouldRefresh?: (updatedPath: string, currentPath: string) => boolean
}

export function useRemoteRefresh (options?: HookOptions): void
