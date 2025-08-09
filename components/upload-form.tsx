"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'
import Papa from 'papaparse'

interface UploadFormProps {
  onDataParsed: (data: any[]) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function UploadForm({ onDataParsed, isLoading, setIsLoading }: UploadFormProps) {
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState('')
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFile = (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setErrorMessage('Please upload a CSV file')
      setUploadStatus('error')
      setTimeout(() => setUploadStatus('idle'), 3000)
      return
    }

    setFileName(file.name)
    setIsLoading(true)
    setUploadStatus('idle')
    setErrorMessage('')

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setIsLoading(false)
        onDataParsed(results.data)
        setUploadStatus('success')
        setTimeout(() => setUploadStatus('idle'), 2000)
      },
      error: (error) => {
        setIsLoading(false)
        console.error('Error parsing CSV:', error)
        setErrorMessage('Error parsing CSV file. Please check the file format.')
        setUploadStatus('error')
        setTimeout(() => setUploadStatus('idle'), 3000)
      }
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const clearFile = () => {
    setFileName('')
    onDataParsed([])
    setUploadStatus('idle')
    setErrorMessage('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card border border-border rounded-lg ${fileName ? 'p-6' : 'p-0'} h-auto min-h-0`}
    >
      <h2 className="text-xl font-semibold mb-4">Upload Data</h2>
      
      {!fileName ? (
        <motion.div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            dragActive ? 'border-primary bg-primary/5 scale-105' : 'border-border'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ 
              y: dragActive ? -5 : 0,
              scale: dragActive ? 1.1 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
          </motion.div>
          <motion.p 
            className="text-lg font-medium mb-2"
            animate={{ color: dragActive ? 'var(--primary)' : 'inherit' }}
          >
            Drop your CSV file here
          </motion.p>
          <p className="text-muted-foreground mb-4">or click to browse</p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <motion.label
            htmlFor="file-upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Choose File
          </motion.label>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-accent rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText size={24} />
              <span className="font-medium">{fileName}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={clearFile}
              className="p-1 hover:bg-background rounded transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>
        </motion.div>
      )}
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
            />
            <p className="mt-2 text-sm text-muted-foreground">Processing CSV...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uploadStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center justify-center space-x-2 text-green-600"
          >
            <CheckCircle size={20} />
            <span className="text-sm">File uploaded successfully!</span>
          </motion.div>
        )}

        {uploadStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center justify-center space-x-2 text-red-600"
          >
            <AlertCircle size={20} />
            <span className="text-sm">{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 