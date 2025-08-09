"use client"

import { useState } from 'react'
import { useData } from '@/components/data-context'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { UploadForm } from '@/components/upload-form'
import { DataPreview } from '@/components/data-preview'
import ChatSection from '@/components/chat-section'


export default function UploadPage() {
  const { data, setData } = useData();
  const [isLoading, setIsLoading] = useState(false);

  return (
  <div className="flex bg-background">
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
                onDataParsed={setData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <DataPreview data={data} />
            </div>
            {data && data.length > 0 && (
              <div className="mt-8">
                {/* Chat section for AI questions about uploaded data */}
                <ChatSection data={data} />
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}