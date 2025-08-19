'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  GraduationCap, 
  Lock, 
  CheckCircle2, 
  PlayCircle,
  Clock,
  Zap,
  Trophy,
  Star,
  ChevronRight,
  Sparkles,
  Target,
  BookOpen,
  Video,
  ArrowRight
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';

// Mock curriculum data - 6 month journey
const curriculum = [
  {
    id: 1,
    module: "Module 1",
    title: "Roblox Studio Basics",
    description: "Master the fundamentals of Roblox Studio and basic building",
    weeks: "Weeks 1-4",
    status: "completed",
    progress: 100,
    totalVideos: 12,
    completedVideos: 12,
    totalXP: 300,
    earnedXP: 300,
    topics: [
      "Studio Interface Tour",
      "Basic Parts & Properties",
      "Toolbox & Models",
      "Terrain Editor Basics"
    ]
  },
  {
    id: 2,
    module: "Module 2",
    title: "Introduction to Scripting",
    description: "Learn Lua basics and write your first scripts",
    weeks: "Weeks 5-8",
    status: "completed",
    progress: 100,
    totalVideos: 15,
    completedVideos: 15,
    totalXP: 450,
    earnedXP: 450,
    topics: [
      "Variables & Data Types",
      "Functions & Events",
      "Conditional Statements",
      "Loops & Tables"
    ]
  },
  {
    id: 3,
    module: "Module 3",
    title: "Advanced Building Techniques",
    description: "Create complex structures and optimize your builds",
    weeks: "Weeks 9-12",
    status: "in-progress",
    progress: 65,
    totalVideos: 18,
    completedVideos: 12,
    totalXP: 600,
    earnedXP: 390,
    topics: [
      "Advanced Modeling",
      "Lighting & Atmosphere",
      "Particle Effects",
      "Sound Design"
    ],
    currentVideo: {
      title: "Creating Dynamic Lighting Systems",
      duration: "18:45",
      xp: 50
    }
  },
  {
    id: 4,
    module: "Module 4",
    title: "Game Mechanics & Systems",
    description: "Build core game systems like inventory, shops, and combat",
    weeks: "Weeks 13-16",
    status: "locked",
    progress: 0,
    totalVideos: 20,
    completedVideos: 0,
    totalXP: 800,
    earnedXP: 0,
    topics: [
      "Player Data & Leaderstats",
      "Shop Systems",
      "Combat Mechanics",
      "Save Systems"
    ]
  },
  {
    id: 5,
    module: "Module 5",
    title: "UI/UX Design",
    description: "Design beautiful and functional user interfaces",
    weeks: "Weeks 17-20",
    status: "locked",
    progress: 0,
    totalVideos: 16,
    completedVideos: 0,
    totalXP: 650,
    earnedXP: 0,
    topics: [
      "GUI Basics",
      "Advanced UI Elements",
      "Animations & Tweening",
      "Mobile Optimization"
    ]
  },
  {
    id: 6,
    module: "Module 6",
    title: "Publishing & Monetization",
    description: "Launch your game and build a player community",
    weeks: "Weeks 21-24",
    status: "locked",
    progress: 0,
    totalVideos: 14,
    completedVideos: 0,
    totalXP: 700,
    earnedXP: 0,
    topics: [
      "Game Publishing Process",
      "Monetization Strategies",
      "Marketing Your Game",
      "Community Building"
    ]
  }
];

export default function LearningPath() {
  const [selectedModule, setSelectedModule] = useState(3); // Current module
  const totalProgress = Math.round((2.65 / 6) * 100); // 2 complete + 0.65 of current

  return (
    <div className="min-h-screen bg-gradient-to-br from-blox-darkblue2 via-blox-darkblue to-blox-purple-deep">
      <Sidebar />
      
      <main className="ml-[280px] p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blox-text-primary mb-2 flex items-center gap-3">
                <GraduationCap className="w-10 h-10 text-blox-teal" />
                Your Learning Journey
              </h1>
              <p className="text-blox-text-muted">
                Master Roblox development in 6 months with our structured curriculum
              </p>
            </div>
            
            {/* Overall Progress */}
            <div className="glass-dark rounded-xl px-6 py-4 border border-blox-glass-border">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-blox-darkblue"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - totalProgress / 100)}`}
                      className="text-blox-teal transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-blox-text-primary">
                      {totalProgress}%
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blox-text-primary">
                    Week 11 of 24
                  </div>
                  <div className="text-sm text-blox-text-muted">
                    Overall Progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Video, label: "Videos Completed", value: "39/95", color: "text-blox-teal" },
            { icon: Zap, label: "Total XP Earned", value: "1,140", color: "text-yellow-400" },
            { icon: Trophy, label: "Modules Complete", value: "2/6", color: "text-purple-400" },
            { icon: Target, label: "Certificates", value: "2", color: "text-green-400" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="glass-dark rounded-lg p-4 border border-blox-glass-border flex items-center gap-3"
            >
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <div className="text-xl font-bold text-blox-text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-blox-text-muted">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Path Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Timeline */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {curriculum.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`relative ${module.id !== curriculum.length ? 'pb-4' : ''}`}
                >
                  {/* Connection Line */}
                  {module.id !== curriculum.length && (
                    <div className={`absolute left-10 top-20 w-0.5 h-full ${
                      module.status === 'completed' ? 'bg-blox-teal' : 'bg-blox-darkblue'
                    }`} />
                  )}

                  <Link
                    href={module.status !== 'locked' ? `/learning/module/${module.id}` : '#'}
                    className={`block glass-dark rounded-xl p-6 border ${
                      module.status === 'completed' ? 'border-blox-teal/50' :
                      module.status === 'in-progress' ? 'border-blox-teal/30' :
                      'border-blox-glass-border opacity-60'
                    } ${module.status !== 'locked' ? 'cursor-pointer hover:border-blox-teal/50' : 'cursor-not-allowed'} transition-all`}
                    onClick={(e) => {
                      if (module.status === 'locked') {
                        e.preventDefault();
                      }
                      setSelectedModule(module.id);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Module Status Icon */}
                      <div className={`relative flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center ${
                        module.status === 'completed' ? 'bg-gradient-to-br from-blox-teal to-blox-success' :
                        module.status === 'in-progress' ? 'bg-gradient-to-br from-blox-purple-DEFAULT to-blox-teal' :
                        'bg-blox-darkblue2'
                      }`}>
                        {module.status === 'completed' ? (
                          <CheckCircle2 className="w-10 h-10 text-white" />
                        ) : module.status === 'in-progress' ? (
                          <>
                            <PlayCircle className="w-10 h-10 text-white" />
                            <motion.div
                              className="absolute inset-0 rounded-full border-4 border-blox-teal"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
                            />
                          </>
                        ) : (
                          <Lock className="w-8 h-8 text-blox-text-muted" />
                        )}
                      </div>

                      {/* Module Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-blox-text-primary">
                                {module.title}
                              </h3>
                              {module.status === 'in-progress' && (
                                <span className="px-2 py-0.5 bg-blox-teal/20 text-blox-teal text-xs font-semibold rounded-full">
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-blox-text-muted mb-3">
                              {module.description}
                            </p>
                          </div>
                          <span className="text-sm text-blox-text-muted">
                            {module.weeks}
                          </span>
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {module.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blox-darkblue2/50 text-xs text-blox-text-secondary rounded-lg"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        {module.status !== 'locked' && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-blox-text-muted">
                                {module.completedVideos}/{module.totalVideos} videos
                              </span>
                              <span className="text-blox-teal font-semibold">
                                {module.earnedXP}/{module.totalXP} XP
                              </span>
                            </div>
                            <div className="w-full h-2 bg-blox-darkblue rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blox-teal to-blox-success"
                                initial={{ width: 0 }}
                                animate={{ width: `${module.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Current Video */}
                        {module.status === 'in-progress' && module.currentVideo && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-4 p-3 bg-blox-teal/10 border border-blox-teal/30 rounded-lg"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-blox-teal" />
                                <div>
                                  <p className="text-sm font-semibold text-blox-text-primary">
                                    Continue: {module.currentVideo.title}
                                  </p>
                                  <p className="text-xs text-blox-text-muted">
                                    {module.currentVideo.duration} • +{module.currentVideo.xp} XP
                                  </p>
                                </div>
                              </div>
                              <button className="px-3 py-1.5 bg-gradient-to-r from-blox-teal to-blox-success text-white text-sm font-semibold rounded-lg hover:shadow-glow-teal transition-all">
                                Resume
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Next Milestone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <h3 className="text-lg font-semibold text-blox-text-primary mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blox-teal" />
                Next Milestone
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blox-text-muted">Complete Module 3</span>
                  <span className="text-sm font-semibold text-blox-teal">35% left</span>
                </div>
                <div className="w-full h-2 bg-blox-darkblue rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gradient-to-r from-blox-teal to-blox-success" />
                </div>
                <p className="text-xs text-blox-text-muted">
                  Complete 6 more videos to unlock Module 4 and earn your Advanced Builder certificate!
                </p>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <h3 className="text-lg font-semibold text-blox-text-primary mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Module Certificates
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Studio Master", icon: "🎨", earned: true },
                  { name: "Script Novice", icon: "📝", earned: true },
                  { name: "Advanced Builder", icon: "🏗️", earned: false, progress: 65 },
                  { name: "Game Designer", icon: "🎮", earned: false },
                  { name: "UI Expert", icon: "🎨", earned: false },
                  { name: "Published Developer", icon: "🚀", earned: false }
                ].map((cert, index) => (
                  <div
                    key={cert.name}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      cert.earned 
                        ? 'bg-yellow-500/10 border-yellow-500/30' 
                        : 'bg-blox-darkblue2/30 border-blox-glass-border opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{cert.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        cert.earned ? 'text-yellow-400' : 'text-blox-text-muted'
                      }`}>
                        {cert.name}
                      </p>
                      {cert.progress && (
                        <div className="mt-1 w-full h-1 bg-blox-darkblue rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blox-teal to-blox-success"
                            style={{ width: `${cert.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {cert.earned && (
                      <CheckCircle2 className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Study Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <h3 className="text-lg font-semibold text-blox-text-primary mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Study Tips
              </h3>
              <ul className="space-y-2 text-sm text-blox-text-secondary">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Complete one video daily to maintain your streak</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Practice each concept in Studio after watching</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Join Discord to discuss with other learners</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Build mini-projects to reinforce learning</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}