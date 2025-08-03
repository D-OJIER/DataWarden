"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, User, Search, Settings, LogOut, HelpCircle, LogIn } from 'lucide-react'
import { useAuth } from './auth-context'
import Link from 'next/link'

export function Header() {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-card border-b border-border flex items-center justify-between px-6"
    >
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <motion.input
            type="text"
            placeholder="Search analytics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80"
              >
                <Search size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <motion.button 
          className="p-2 rounded-lg hover:bg-accent transition-colors relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setNotifications(0)}
        >
          <Bell size={20} />
          <AnimatePresence>
            {notifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-xs text-white font-medium"
              >
                {notifications}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* User Menu */}
        <div className="relative">
          {mounted && user ? (
            <motion.button 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <User size={20} />
              <span className="text-sm font-medium">
                {user.isGuest ? 'Guest' : user.name}
              </span>
            </motion.button>
          ) : (
            <Link href="/login">
              <motion.button 
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn size={20} />
                <span className="text-sm font-medium">Sign In</span>
              </motion.button>
            </Link>
          )}

          <AnimatePresence>
            {showUserMenu && user && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50"
              >
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-border mb-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {user.isGuest && (
                      <span className="inline-block mt-1 text-xs px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full">
                        Guest Mode
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ backgroundColor: 'var(--accent)' }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: 'var(--accent)' }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: 'var(--accent)' }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                  >
                    <HelpCircle size={16} />
                    <span>Help</span>
                  </motion.button>
                  <div className="border-t border-border my-1"></div>
                  <motion.button
                    whileHover={{ backgroundColor: 'var(--destructive)' }}
                    onClick={logout}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
} 