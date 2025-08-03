"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { UploadForm } from '@/components/upload-form'
import { DataPreview } from '@/components/data-preview'

export default function UploadPage() {
  const [parsedData, setParsedData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Upload Data</h1>
              <p className="text-muted-foreground">
                Upload your CSV files to analyze and visualize your data
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UploadForm 
                onDataParsed={setParsedData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <DataPreview data={parsedData} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
} 