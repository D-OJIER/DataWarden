"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, Loader2, RefreshCw, AlertCircle } from 'lucide-react'

interface AIInsightsProps {
  data: any[]
}

export function AIInsights({ data }: AIInsightsProps) {
  const [insight, setInsight] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const generateInsights = async () => {
    console.log('Attempting to generate insights with data:', { 
      dataExists: !!data,
      length: data?.length,
      sampleData: data?.slice(0, 2)
    });
    
    if (!data || data.length === 0) {
      setError('Please upload data first')
      setTimeout(() => setError(''), 3000)
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      console.log('Sending data to API:', data.slice(0, 2));
      
      // Add API key to request header for validation
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: `Analyze this data and provide a concise report with:

1. Key Metrics
| Metric | Current | Change |
|--------|---------|--------|
[Include the main metrics]

2. Analysis
- Key findings and trends
- Notable changes
- Main insights

3. Recommendations
- Action items
- Improvement areas

Use **bold** for emphasis, include % changes, and format numbers with commas.

Data to analyze: ${JSON.stringify(data.slice(0, 2))}` 
        }),
        cache: 'no-store'
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const errorJson = JSON.parse(text);
          throw new Error(errorJson.error || 'Failed to generate insights');
        } catch (e) {
          throw new Error(`Server error: ${response.status} - ${text.substring(0, 100)}`);
        }
      }

      const result = await response.json();

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
              <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-border">AI Analysis</h3>
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {insight.split('\n\n').map((block, i) => {
                  if (!block.trim()) return null;

                  // Handle section headers (1., 2., 3.)
                  if (/^\d+\./.test(block)) {
                    const [title, ...content] = block.split('\n');
                    return (
                      <div key={i} className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 shadow-sm">
                        <h4 className="text-lg font-bold text-primary mb-3">{title.replace(/^\d+\.\s*/, '')}</h4>
                        <div className="space-y-2">
                          {content.map((line, j) => {
                            const bulletContent = line.replace(/^[-•]\s*/, '').trim();
                            if (!bulletContent) return null;
                            return (
                              <div key={j} className="flex items-start space-x-3 hover:bg-muted/50 rounded-md p-2 transition-colors">
                                <span className="text-primary mt-1">•</span>
                                <p className="text-sm text-muted-foreground">
                                  {bulletContent.split(/(\*\*.*?\*\*|\d+(?:\.\d+)?%?)/).map((part, k) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                      return (
                                        <span key={k} className="font-semibold text-primary bg-primary/10 px-1 rounded">
                                          {part.slice(2, -2)}
                                        </span>
                                      );
                                    }
                                    return /\d+(?:\.\d+)?%?/.test(part) ? 
                                      <span key={k} className="font-semibold text-primary">{part}</span> : 
                                      part;
                                  })}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // Handle tables
                  if (block.includes('|')) {
                    const tableLines = block.split('\n').filter(line => line.trim() && line.includes('|'));
                    const headers = tableLines[0]
                      .split('|')
                      .filter(cell => cell.trim())
                      .map(cell => cell.trim());
                    
                    const rows = tableLines
                      .filter((_, i) => i > 1)
                      .map(line => 
                        line
                          .split('|')
                          .filter(cell => cell.trim())
                          .map(cell => {
                            const value = cell.trim();
                            if (value.includes('%')) return value;
                            const num = parseFloat(value.replace(/,/g, ''));
                            return !isNaN(num) ? num.toLocaleString() : value;
                          })
                      );

                    return (
                      <div key={i} className="overflow-x-auto bg-gradient-to-br from-card to-card/95 rounded-lg border border-border/60 shadow-lg">
                        <table className="min-w-full divide-y divide-border/60">
                          <thead className="bg-gradient-to-r from-muted/80 to-muted">
                            <tr>
                              {headers.map((header, j) => (
                                <th key={j} className="text-left py-4 px-6 text-sm font-semibold text-primary border-b border-border/60 first:rounded-tl-lg last:rounded-tr-lg">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/40 bg-transparent">
                            {rows.map((row, j) => (
                              <tr key={j} className="hover:bg-muted/30 transition-colors duration-200">
                                {row.map((cell, k) => (
                                  <td key={k} className="py-3.5 px-6 text-sm text-muted-foreground whitespace-nowrap font-medium">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  // Handle regular paragraphs
                  return (
                    <div key={i} className="bg-card/50 border border-border/50 rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {block.split(/(\*\*.*?\*\*|\d+(?:\.\d+)?%?)/).map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <span key={j} className="font-semibold text-primary bg-primary/10 px-1 rounded">
                                {part.slice(2, -2)}
                              </span>
                            );
                          }
                          return /\d+(?:\.\d+)?%?/.test(part) ? 
                            <span key={j} className="font-semibold text-primary">{part}</span> : 
                            part;
                        })}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
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

    </motion.div>
  )
}