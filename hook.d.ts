interface HookOptions {
  shouldRefresh?: (updatedPath: string) => boolean
}

export function useRemoteRefresh (options?: HookOptions): void
