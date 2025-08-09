"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, Users, DollarSign, Activity, BarChart3, PieChart as PieChartIcon } from 'lucide-react'
import { useState } from 'react'

interface DataDisplayProps {
  data: any[];
}


export default function DataDisplay({ data }: DataDisplayProps) {
  const [xColSelected, setXColSelected] = useState<string>('');
  const [yColSelected, setYColSelected] = useState<string>('');
  const [yCol2Selected, setYCol2Selected] = useState<string>('');
  const [activeChart, setActiveChart] = useState<string>('line');

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Data Visualization</h2>
        <div className="text-center text-muted-foreground py-12">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Activity className="mx-auto mb-4" size={48} />
          </motion.div>
          <p>Upload a CSV file to see your data visualized</p>
        </div>
      </motion.div>
    );
  }

  // Dynamically detect columns
  const columns = Object.keys(data[0] || {});
  // Find first two numeric columns for chart axes
  const numericColumns = columns.filter(col =>
    data.some((row: any) => !isNaN(parseFloat(row[col])) && row[col] !== '' && row[col] !== null)
  );
  const xCol = xColSelected || columns[0] || 'Row';
  const yCol = yColSelected || numericColumns[0] || columns[1] || columns[0] || 'Value';
  const yCol2 = yCol2Selected || numericColumns[1] || numericColumns[0] || columns[2] || columns[1] || 'Value2';

  // Prepare chart data
  const chartData = data.slice(0, 50).map((item: any, index: number) => {
    return {
      name: item[xCol] || `Row ${index + 1}`,
      value1: parseFloat(item[yCol]) || 0,
      value2: parseFloat(item[yCol2]) || 0,
      ...item
    };
  });

  // Stats for relevant columns only
  const stats = [];
  // Always show total records
  stats.push({
    title: 'Total Records',
    value: data.length.toString(),
    icon: Users,
    color: 'text-blue-500',
    change: '',
    changeType: 'positive'
  });

  // Show only numeric columns with nonzero average
  columns.forEach((col, idx) => {
    const values = data.map((row: any) => row[col]).filter((v: any) => v !== '' && v !== null && !isNaN(parseFloat(v)));
    const total = values.reduce((sum: number, v: any) => sum + parseFloat(v), 0);
    const avg = values.length ? total / values.length : 0;
    if (avg !== 0 && !isNaN(avg)) {
      stats.push({
        title: `${col} (avg)`,
        value: avg.toFixed(2),
        icon: idx === 0 ? Users : idx === 1 ? DollarSign : TrendingUp,
        color: idx === 0 ? 'text-blue-500' : idx === 1 ? 'text-green-500' : 'text-purple-500',
        change: '',
        changeType: 'positive'
      });
    }
  });

  const chartTypes = [
    { id: 'line', label: `Line Chart`, icon: TrendingUp },
    { id: 'bar', label: `Bar Chart`, icon: BarChart3 },
    { id: 'pie', label: `Pie Chart`, icon: PieChartIcon },
    { id: 'scatter', label: `Scatter Chart`, icon: Activity },
    { id: 'area', label: `Area Chart`, icon: TrendingUp },
    { id: 'radar', label: `Radar Chart`, icon: TrendingUp },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-lg max-w-5xl mx-auto w-full"
    >
  <h2 className="text-xl font-semibold mb-4 md:mb-6 text-center">Data Visualization</h2>
      {/* Stats Cards */}
  <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(stats.length, 3)} gap-4 mb-4 md:mb-6`}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-accent rounded-lg p-4 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <motion.p 
                  className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.change} from last month
                </motion.p>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className={`${stat.color}`} size={24} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Column Selector Filter */}
  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4 md:mb-6 items-center justify-center">
        <div className="flex flex-col items-start">
          <label className="text-sm font-medium mb-1">X Axis:</label>
          <select className="px-2 py-1 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" value={xCol} onChange={e => setXColSelected(e.target.value)}>
            {columns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label className="text-sm font-medium mb-1">Y Axis:</label>
          <select className="px-2 py-1 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" value={yCol} onChange={e => setYColSelected(e.target.value)}>
            {columns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label className="text-sm font-medium mb-1">Y2 Axis:</label>
          <select className="px-2 py-1 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" value={yCol2} onChange={e => setYCol2Selected(e.target.value)}>
            <option value="">None</option>
            {columns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {chartTypes.map((chartType) => (
            <motion.button
              key={chartType.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveChart(chartType.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium shadow transition-colors border border-border focus:outline-none focus:ring-2 focus:ring-primary duration-150 ${
                activeChart === chartType.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-accent text-accent-foreground hover:bg-accent/80'
              }`}
            >
              <chartType.icon size={18} />
              <span className="text-sm">{chartType.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="bg-accent rounded-lg p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-64"
          >
            {activeChart === 'line' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="value1" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2 }} />
                  {yCol2 !== yCol && <Line type="monotone" dataKey="value2" stroke="#00C49F" strokeWidth={2} dot={{ fill: '#00C49F', strokeWidth: 2, r: 3 }} activeDot={{ r: 5, stroke: '#00C49F', strokeWidth: 2 }} />}
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'bar' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                  <Bar dataKey="value1" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  {yCol2 !== yCol && <Bar dataKey="value2" fill="#8884d8" radius={[4, 4, 0, 0]} />}
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'pie' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData.slice(0, 10)} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value1">
                    {chartData.slice(0, 10).map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'scatter' && (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis dataKey="value1" name={yCol} />
                  <YAxis dataKey="value2" name={yCol2} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Data" data={chartData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'area' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value1" stroke="#8884d8" fill="#8884d8" />
                  {yCol2 !== yCol && <Area type="monotone" dataKey="value2" stroke="#00C49F" fill="#00C49F" />}
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'radar' && (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar name={yCol} dataKey="value1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  {yCol2 !== yCol && <Radar name={yCol2} dataKey="value2" stroke="#00C49F" fill="#00C49F" fillOpacity={0.4} />}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}