"use client"

import { motion } from 'framer-motion'
import { BarChart3, Clock, Zap } from 'lucide-react'

export function AIUsage() {
  const usageStats = [
    { label: 'API Calls Today', value: '24', icon: Zap, color: 'text-yellow-500' },
    { label: 'Total Requests', value: '1,247', icon: BarChart3, color: 'text-blue-500' },
    { label: 'Avg Response Time', value: '2.3s', icon: Clock, color: 'text-green-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card border border-border rounded-lg ${usageStats.length > 0 ? 'p-6' : 'p-0'} h-auto min-h-0`}
    >
      <h2 className="text-xl font-semibold mb-4">AI Usage</h2>
      
      <div className="space-y-4">
        {usageStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-accent rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <stat.icon className={stat.color} size={20} />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <span className="font-semibold">{stat.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent rounded-lg">
        <h3 className="font-medium mb-2">Usage Limits</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Daily API Calls</span>
            <span>24 / 100</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 