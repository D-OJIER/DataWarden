"use client"

import { motion } from 'framer-motion'
import { Clock, Brain, Trash2 } from 'lucide-react'

export function InsightHistory() {
  const historyItems = [
    {
      id: 1,
      date: '2024-01-15',
      insight: 'Sales peaked on Friday with a 15% increase compared to other weekdays.',
      dataSource: 'sales_data.csv'
    },
    {
      id: 2,
      date: '2024-01-14',
      insight: 'Electronics category shows strong correlation with customer satisfaction scores.',
      dataSource: 'customer_data.csv'
    },
    {
      id: 3,
      date: '2024-01-13',
      insight: 'Regional performance indicates West region leads in revenue growth.',
      dataSource: 'regional_data.csv'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="text-primary" size={20} />
        <h2 className="text-lg font-semibold">Insight History</h2>
      </div>

      <div className="space-y-4">
        {historyItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-accent rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm leading-relaxed mb-2">{item.insight}</p>
                <span className="text-xs text-muted-foreground">{item.dataSource}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 hover:bg-background rounded transition-colors"
              >
                <Trash2 size={14} className="text-muted-foreground" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {historyItems.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          <Clock className="mx-auto mb-4" size={32} />
          <p>No insights generated yet</p>
        </div>
      )}
    </motion.div>
  )
} 