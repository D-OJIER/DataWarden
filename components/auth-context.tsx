"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  isGuest: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loginAsGuest: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  loginAsGuest: () => {},
  isLoading: true
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for existing session
    try {
      const savedUser = localStorage.getItem('datawarden_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      isGuest: false
    }
    
    setUser(userData)
    try {
      localStorage.setItem('datawarden_user', JSON.stringify(userData))
    } catch (error) {
      console.error('Error saving user to localStorage:', error)
    }
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('datawarden_user')
    } catch (error) {
      console.error('Error removing user from localStorage:', error)
    }
  }

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@datawarden.com',
      name: 'Guest User',
      isGuest: true
    }
    
    setUser(guestUser)
    try {
      localStorage.setItem('datawarden_user', JSON.stringify(guestUser))
    } catch (error) {
      console.error('Error saving guest user to localStorage:', error)
    }
  }

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    loginAsGuest,
    isLoading
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
} 