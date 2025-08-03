"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { FileText, Download, Eye, Plus, Calendar, BarChart3, TrendingUp } from 'lucide-react'

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const reportTemplates = [
    {
      id: 'sales',
      title: 'Sales Report',
      description: 'Comprehensive sales analysis with trends and forecasts',
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    {
      id: 'performance',
      title: 'Performance Report',
      description: 'Team and individual performance metrics',
      icon: BarChart3,
      color: 'text-green-500'
    },
    {
      id: 'monthly',
      title: 'Monthly Summary',
      description: 'Monthly overview of key metrics and KPIs',
      icon: Calendar,
      color: 'text-purple-500'
    }
  ]

  const recentReports = [
    {
      id: 1,
      title: 'Q4 Sales Report',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      title: 'December Performance',
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Annual Review',
      date: '2024-01-05',
      status: 'in-progress'
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Reports</h1>
              <p className="text-muted-foreground">
                Generate and manage comprehensive reports
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Report Templates */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Report Templates</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Plus size={16} />
                      <span>New Report</span>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportTemplates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-accent rounded-lg p-4 cursor-pointer border border-transparent hover:border-primary/20 transition-colors"
                        onClick={() => setSelectedReport(template.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <template.icon className={template.color} size={24} />
                          <h3 className="font-medium">{template.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {template.description}
                        </p>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                          >
                            <Eye size={14} />
                            <span>Preview</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-accent text-foreground rounded-md hover:bg-accent/80 transition-colors"
                          >
                            <Download size={14} />
                            <span>Generate</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Recent Reports */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Recent Reports</h2>
                  
                  <div className="space-y-4">
                    {recentReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-accent rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-sm">{report.title}</h3>
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            report.status === 'completed' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {report.status}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 hover:bg-background rounded transition-colors"
                          >
                            <Download size={14} className="text-muted-foreground" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
} 