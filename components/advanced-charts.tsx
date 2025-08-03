"use client"

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, PieChart } from 'lucide-react'

interface AdvancedChartsProps {
  data: any[]
}

export function AdvancedCharts({ data }: AdvancedChartsProps) {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Advanced Analytics</h2>
        <div className="text-center text-muted-foreground py-12">
          <BarChart3 className="mx-auto mb-4" size={48} />
          <p>Upload data to see advanced analytics</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-6">Advanced Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-accent rounded-lg p-4"
        >
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="text-blue-500" size={20} />
            <h3 className="font-medium">Trend Analysis</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Analyze patterns and trends in your data over time
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-accent rounded-lg p-4"
        >
          <div className="flex items-center space-x-3 mb-3">
            <PieChart className="text-green-500" size={20} />
            <h3 className="font-medium">Distribution</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            View data distribution across different categories
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-accent rounded-lg p-4"
        >
          <div className="flex items-center space-x-3 mb-3">
            <BarChart3 className="text-purple-500" size={20} />
            <h3 className="font-medium">Correlations</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Find correlations between different data variables
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
} 