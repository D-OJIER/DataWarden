"use client"

import { useState } from 'react'
import { useData } from '@/components/data-context'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { AIInsights } from '@/components/ai-insights'
import { AIUsage } from '@/components/ai-usage'
import { InsightHistory } from '@/components/insight-history'

  const { data } = useData()

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
              <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
              <p className="text-muted-foreground">
                Get intelligent insights from your data using AI
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIInsights data={data} />
              </div>
              <div className="space-y-6">
                <AIUsage />
                <InsightHistory />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
} 