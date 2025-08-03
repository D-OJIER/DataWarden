"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Settings, Palette, Bell, Shield, Database, Zap } from 'lucide-react'
import { useTheme } from 'next-themes'

interface Setting {
  label: string
  type: 'toggle' | 'select'
  value: boolean | string
  onChange: (value: boolean | string) => void
  options?: { label: string; value: string }[]
}

interface SettingsSection {
  title: string
  icon: any
  settings: Setting[]
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [dataRetention, setDataRetention] = useState('30')

  const settingsSections: SettingsSection[] = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          label: 'Theme',
          type: 'select',
          value: theme || 'system',
          onChange: (value: boolean | string) => setTheme(value as string),
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' }
          ]
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          label: 'Enable Notifications',
          type: 'toggle',
          value: notifications,
          onChange: (value: boolean | string) => setNotifications(value as boolean)
        }
      ]
    },
    {
      title: 'Data & Privacy',
      icon: Shield,
      settings: [
        {
          label: 'Auto-save Data',
          type: 'toggle',
          value: autoSave,
          onChange: (value: boolean | string) => setAutoSave(value as boolean)
        },
        {
          label: 'Data Retention (days)',
          type: 'select',
          value: dataRetention,
          onChange: (value: boolean | string) => setDataRetention(value as string),
          options: [
            { label: '7 days', value: '7' },
            { label: '30 days', value: '30' },
            { label: '90 days', value: '90' },
            { label: '1 year', value: '365' }
          ]
        }
      ]
    }
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-3 mb-8">
              <Settings className="text-primary" size={32} />
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>

            <div className="space-y-8">
              {settingsSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <section.icon className="text-primary" size={24} />
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {section.settings.map((setting, settingIndex) => (
                      <motion.div
                        key={setting.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (sectionIndex * 0.1) + (settingIndex * 0.05) }}
                        className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                      >
                        <span className="text-sm font-medium">{setting.label}</span>
                        
                        {setting.type === 'toggle' && (
                          <button
                            onClick={() => setting.onChange(!(setting.value as boolean))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.value ? 'bg-primary' : 'bg-muted'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                setting.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}

                        {setting.type === 'select' && (
                          <select
                            value={setting.value as string}
                            onChange={(e) => setting.onChange(e.target.value)}
                            className="px-3 py-1 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            {setting.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-3 p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
                  >
                    <Database size={20} />
                    <span>Export Data</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-3 p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
                  >
                    <Zap size={20} />
                    <span>Clear Cache</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
} 