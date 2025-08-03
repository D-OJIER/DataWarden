"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Users, Plus, Mail, Phone, Crown, UserPlus } from 'lucide-react'

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Data Analyst',
      email: 'sarah@datawarden.com',
      phone: '+1 (555) 123-4567',
      avatar: 'SJ',
      status: 'online',
      isAdmin: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Data Scientist',
      email: 'mike@datawarden.com',
      phone: '+1 (555) 234-5678',
      avatar: 'MC',
      status: 'away'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Business Analyst',
      email: 'emily@datawarden.com',
      phone: '+1 (555) 345-6789',
      avatar: 'ED',
      status: 'offline'
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      role: 'Data Engineer',
      email: 'alex@datawarden.com',
      phone: '+1 (555) 456-7890',
      avatar: 'AR',
      status: 'online'
    }
  ]

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
              <h1 className="text-3xl font-bold mb-2">Team</h1>
              <p className="text-muted-foreground">
                Manage your team members and collaboration
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Team Members */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Team Members</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <UserPlus size={16} />
                      <span>Add Member</span>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-accent rounded-lg p-4 cursor-pointer border border-transparent hover:border-primary/20 transition-colors"
                        onClick={() => setSelectedMember(member.id.toString())}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                              {member.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                              member.status === 'online' ? 'bg-green-500' :
                              member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{member.name}</h3>
                              {member.isAdmin && <Crown size={14} className="text-yellow-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">{member.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">{member.phone}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Team Stats */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold mb-6">Team Stats</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users size={20} className="text-blue-500" />
                        <span className="text-sm font-medium">Total Members</span>
                      </div>
                      <span className="text-lg font-bold">{teamMembers.length}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span className="text-sm font-medium">Online</span>
                      </div>
                      <span className="text-lg font-bold">
                        {teamMembers.filter(m => m.status === 'online').length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Crown size={20} className="text-yellow-500" />
                        <span className="text-sm font-medium">Admins</span>
                      </div>
                      <span className="text-lg font-bold">
                        {teamMembers.filter(m => m.isAdmin).length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
} 