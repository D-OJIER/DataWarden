"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { useData } from '@/components/data-context'
import ChatSection from '@/components/chat-section'
import { AIInsights } from '@/components/ai-insights'

export default function ReportsPage() {
  const { data } = useData();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
  <div className="flex bg-background">
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
              <div className="grid grid-cols-1 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Report Insights</h2>
                  <AIInsights data={data} />
                  {data && data.length > 0 && (
                    <ChatSection data={data} />
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}