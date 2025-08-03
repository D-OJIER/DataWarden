"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { DataDisplay } from '@/components/data-display'
import { AdvancedCharts } from '@/components/advanced-charts'
import { FilterPanel } from '@/components/filter-panel'

export default function AnalyticsPage() {
  const [selectedData, setSelectedData] = useState<any[]>([])
  const [filters, setFilters] = useState({})

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
              <h1 className="text-3xl font-bold mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Advanced data visualization and analysis tools
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <FilterPanel onFiltersChange={setFilters} />
              </div>
              <div className="lg:col-span-3 space-y-6">
                <DataDisplay data={selectedData} />
                <AdvancedCharts data={selectedData} />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
} 