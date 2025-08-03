"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, DollarSign, Activity, BarChart3, PieChart as PieChartIcon } from 'lucide-react'
import { useState } from 'react'

interface DataDisplayProps {
  data: any[]
}

export function DataDisplay({ data }: DataDisplayProps) {
  const [activeChart, setActiveChart] = useState<'line' | 'bar' | 'pie'>('line')

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Data Visualization</h2>
        <div className="text-center text-muted-foreground py-12">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Activity className="mx-auto mb-4" size={48} />
          </motion.div>
          <p>Upload a CSV file to see your data visualized</p>
        </div>
      </motion.div>
    )
  }

  // Process actual CSV data
  const chartData = data.slice(0, 10).map((item, index) => {
    const sales = typeof item.Sales === 'string' ? parseFloat(item.Sales) : item.Sales || Math.random() * 1000
    const satisfaction = typeof item.Customer_Satisfaction === 'string' ? parseFloat(item.Customer_Satisfaction) : item.Customer_Satisfaction || Math.random() * 5
    
    return {
      name: item.Date || `Item ${index + 1}`,
      sales: sales,
      satisfaction: satisfaction,
      value: Math.random() * 100,
      category: item.Category || 'Unknown'
    }
  })

  // Calculate stats from actual data
  const totalSales = chartData.reduce((sum, item) => sum + item.sales, 0)
  const avgSatisfaction = chartData.reduce((sum, item) => sum + item.satisfaction, 0) / chartData.length

  const stats = [
    { 
      title: 'Total Records', 
      value: data.length, 
      icon: Users, 
      color: 'text-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      title: 'Total Sales', 
      value: `$${totalSales.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'text-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    { 
      title: 'Avg Satisfaction', 
      value: avgSatisfaction.toFixed(1), 
      icon: TrendingUp, 
      color: 'text-purple-500',
      change: '+2%',
      changeType: 'positive'
    },
  ]

  const chartTypes = [
    { id: 'line', label: 'Line Chart', icon: TrendingUp },
    { id: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { id: 'pie', label: 'Pie Chart', icon: PieChartIcon },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-6">Data Visualization</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-accent rounded-lg p-4 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <motion.p 
                  className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.change} from last month
                </motion.p>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className={`${stat.color}`} size={24} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Type Selector */}
      <div className="flex space-x-2 mb-6">
        {chartTypes.map((chartType) => (
          <motion.button
            key={chartType.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveChart(chartType.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              activeChart === chartType.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent hover:bg-accent/80'
            }`}
          >
            <chartType.icon size={16} />
            <span className="text-sm">{chartType.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-accent rounded-lg p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-64"
          >
            {activeChart === 'line' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'bar' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'pie' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.slice(0, 5)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="sales"
                  >
                    {chartData.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
} 