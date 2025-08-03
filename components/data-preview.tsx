"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Table, FileText, Download, Eye } from 'lucide-react'

interface DataPreviewProps {
  data: any[]
}

export function DataPreview({ data }: DataPreviewProps) {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Data Preview</h2>
        <div className="text-center text-muted-foreground py-12">
          <FileText className="mx-auto mb-4" size={48} />
          <p>Upload a CSV file to preview your data</p>
        </div>
      </motion.div>
    )
  }

  const columns = Object.keys(data[0] || {})
  const previewData = data.slice(0, 10) // Show first 10 rows

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Data Preview</h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-1 text-sm bg-accent rounded-lg hover:bg-accent/80 transition-colors"
          >
            <Eye size={16} />
            <span>View All</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Download size={16} />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column, index) => (
                <motion.th
                  key={column}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-left p-3 font-medium text-muted-foreground"
                >
                  {column}
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.05 }}
                className="border-b border-border hover:bg-accent/50 transition-colors"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-3">
                    <span className="truncate block max-w-xs">
                      {row[column] || '-'}
                    </span>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        Showing {previewData.length} of {data.length} rows
      </div>
    </motion.div>
  )
} 