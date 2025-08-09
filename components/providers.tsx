"use client"

import { ReactNode } from 'react'
import { AuthProvider } from './auth-context'
import { ThemeProvider } from './theme-provider'
import { DataProvider } from './data-context'


interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}