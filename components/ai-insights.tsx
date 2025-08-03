"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, Loader2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

interface AIInsightsProps {
  data: any[]
}

export function AIInsights({ data }: AIInsightsProps) {
  const [insight, setInsight] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const generateInsights = async () => {
    if (!data || data.length === 0) {
      setError('Please upload data first')
      setTimeout(() => setError(''), 3000)
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 503) {
          setError('Gemini API key not configured. Please add your API key to the environment variables.')
        } else if (response.status === 400) {
          setError(result.error || 'Invalid data provided')
        } else {
          setError(result.error || 'Failed to generate insights')
        }
        return
      }

      setInsight(result.insight)
    } catch (error) {
      console.error('Error generating insights:', error)
      setError('Unable to generate insights at this time. Please check your internet connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">AI Insights</h2>
        <motion.div
          animate={{ rotate: isLoading ? 360 : 0 }}
          transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
        >
          <Brain className="text-primary" size={24} />
        </motion.div>
      </div>

      {!insight ? (
        <div className="text-center py-8">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Sparkles className="mx-auto mb-4 text-muted-foreground" size={48} />
          </motion.div>
          <p className="text-muted-foreground mb-4">
            Get AI-powered insights from your data
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateInsights}
            disabled={isLoading || !data || data.length === 0}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Brain size={20} />
                <span>Generate Insights</span>
              </>
            )}
          </motion.button>
          
          {/* API Key Setup Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 bg-muted rounded-lg border border-border"
          >
            <h4 className="text-sm font-medium mb-2">Setup Required</h4>
            <p className="text-xs text-muted-foreground mb-3">
              To use AI insights, you need to configure your Gemini API key:
            </p>
            <div className="text-left text-xs space-y-2">
              <p className="text-muted-foreground">1. Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></p>
              <p className="text-muted-foreground">2. Add it to your <code className="bg-background px-1 rounded">.env.local</code> file:</p>
              <code className="block bg-background p-2 rounded text-xs font-mono">
                GOOGLE_GEMINI_API_KEY=your_api_key_here
              </code>
              <p className="text-muted-foreground">3. Restart your development server</p>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-accent rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Brain className="text-primary mt-1" size={20} />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">AI Analysis</h3>
              <motion.p 
                className="text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {insight}
              </motion.p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateInsights}
            disabled={isLoading}
            className="mt-4 text-sm text-primary hover:underline disabled:opacity-50 flex items-center space-x-1"
          >
            <RefreshCw size={14} />
            <span>Generate New Insights</span>
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center justify-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg p-3"
          >
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Summary */}
      {data && data.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-muted rounded-lg"
        >
          <p className="text-xs text-muted-foreground">
            Analyzing {data.length} records with {Object.keys(data[0] || {}).length} columns
          </p>
        </motion.div>
      )}
    </motion.div>
  )
} 