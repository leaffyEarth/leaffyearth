'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Global query configuration
            staleTime: 60 * 1000, // Consider data stale after 1 minute
            cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes
            refetchOnWindowFocus: true, // Refetch when window regains focus
            retry: 1, // Retry failed requests once
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
} 