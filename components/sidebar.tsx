"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, Upload, Brain, Settings, Moon, Sun, Home, TrendingUp, Users } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/', active: pathname === '/' },
    { icon: Upload, label: 'Upload Data', href: '/upload', active: pathname === '/upload' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics', active: pathname === '/analytics' },
    { icon: Brain, label: 'AI Insights', href: '/insights', active: pathname === '/insights' },
    { icon: TrendingUp, label: 'Reports', href: '/reports', active: pathname === '/reports' },
    { icon: Users, label: 'Team', href: '/team', active: pathname === '/team' },
    { icon: Settings, label: 'Settings', href: '/settings', active: pathname === '/settings' },
  ]

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`${isCollapsed ? 'w-16' : 'w-64'} bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div className="p-6 border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-2xl font-bold text-primary">DataWarden</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Analytics</p>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="w-4 h-4 flex flex-col justify-center items-center">
              <span className={`block w-3 h-0.5 bg-current transition-all duration-300 ${isCollapsed ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-3 h-0.5 bg-current my-0.5 transition-all duration-300 ${isCollapsed ? 'opacity-0' : ''}`}></span>
              <span className={`block w-3 h-0.5 bg-current transition-all duration-300 ${isCollapsed ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </motion.button>
        </motion.div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    item.active
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <item.icon size={20} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
        >
          <AnimatePresence mode="wait">
            {mounted && theme === 'dark' ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={20} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                Toggle Theme
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  )
} 