"use client"

import { motion } from 'framer-motion'
import { Filter, Calendar, Tag, MapPin } from 'lucide-react'

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void
}

export function FilterPanel({ onFiltersChange }: FilterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="text-primary" size={20} />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Date Range</label>
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-muted-foreground" />
            <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <div className="flex items-center space-x-2">
            <Tag size={16} className="text-muted-foreground" />
            <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Region</label>
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-muted-foreground" />
            <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Regions</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Apply Filters
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors"
        >
          Clear Filters
        </motion.button>
      </div>
    </motion.div>
  )
} 