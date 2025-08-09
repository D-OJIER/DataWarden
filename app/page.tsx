"use client"

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { UploadForm } from '@/components/upload-form'
import DataDisplay from '@/components/data-display'
import { AIInsights } from '@/components/ai-insights'
import { AIUsage } from '@/components/ai-usage'
import { useAuth } from '@/components/auth-context'
import { motion } from 'framer-motion'
import { Brain, Upload, BarChart3, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [parsedData, setParsedData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    {
      title: 'Upload Data',
      description: 'Import CSV files for analysis',
      icon: Upload,
      color: 'text-blue-500',
      href: '/upload'
    },
    {
      title: 'View Analytics',
      description: 'Explore advanced charts and insights',
      icon: BarChart3,
      color: 'text-green-500',
      href: '/analytics'
    },
    {
      title: 'AI Insights',
      description: 'Get AI-powered data analysis',
      icon: Brain,
      color: 'text-purple-500',
      href: '/insights'
    },
    {
      title: 'Generate Reports',
      description: 'Create comprehensive reports',
      icon: TrendingUp,
      color: 'text-orange-500',
      href: '/reports'
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
            className="max-w-7xl mx-auto"
          >
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name || 'Guest'}! 👋
              </h1>
              <p className="text-muted-foreground">
                {user?.isGuest 
                  ? 'You\'re in guest mode. Sign in to save your data and access all features.'
                  : 'Here\'s what\'s happening with your data today.'
                }
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {quickActions.map((action, index) => (
                <motion.a
                  key={action.title}
                  href={action.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className={action.color} size={24} />
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <UploadForm 
                onDataParsed={setParsedData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <DataDisplay data={parsedData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIInsights data={parsedData} />
              <AIUsage />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
} 