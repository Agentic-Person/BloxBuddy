'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayCircle,
  Clock,
  TrendingUp,
  Award,
  Users,
  Calendar,
  ArrowRight,
  Star,
  Zap,
  Target,
  BookOpen,
  MessageSquare,
  Video,
  ChevronRight,
  Sparkles,
  Trophy,
  Flame
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { demoAuth, DemoUser } from '@/lib/auth/demo-auth';

// Mock data for upcoming videos
const upcomingVideos = [
  {
    id: 1,
    title: "Advanced Scripting Patterns",
    duration: "15:42",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    module: "Module 3",
    difficulty: "Intermediate",
    xp: 50
  },
  {
    id: 2,
    title: "Creating Dynamic NPCs",
    duration: "22:18",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    module: "Module 3",
    difficulty: "Advanced",
    xp: 75
  },
  {
    id: 3,
    title: "UI/UX Best Practices",
    duration: "18:30",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    module: "Module 4",
    difficulty: "Beginner",
    xp: 30
  }
];

// Mock achievements
const recentAchievements = [
  { id: 1, name: "First Steps", icon: "🎯", rarity: "common" },
  { id: 2, name: "Script Master", icon: "💻", rarity: "rare" },
  { id: 3, name: "Team Player", icon: "🤝", rarity: "epic" },
];

// Mock team activity
const teamActivity = [
  { id: 1, user: "CoolBuilder123", action: "completed", target: "Obby Tutorial", time: "2 hours ago" },
  { id: 2, user: "ProGamer456", action: "joined", target: "Team Alpha", time: "5 hours ago" },
  { id: 3, user: "NoobMaster", action: "earned", target: "Script Wizard Badge", time: "1 day ago" },
];

export default function Dashboard() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [streakDays, setStreakDays] = useState(7);

  useEffect(() => {
    const checkUser = () => {
      const demoUser = demoAuth.getUser();
      setUser(demoUser);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blox-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blox-darkblue2 via-blox-darkblue to-blox-purple-deep">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="ml-[280px] p-8">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-blox-text-primary mb-2">
                Welcome back, {user?.username}! 👋
              </h1>
              <p className="text-blox-text-muted">
                You're on fire! Keep up the amazing progress.
              </p>
            </div>
            
            {/* Streak Counter */}
            <div className="flex items-center gap-4">
              <div className="glass-dark rounded-xl px-6 py-4 border border-orange-500/30">
                <div className="flex items-center gap-3">
                  <Flame className="w-8 h-8 text-orange-500" />
                  <div>
                    <div className="text-3xl font-bold text-blox-text-primary">
                      {streakDays}
                    </div>
                    <div className="text-xs text-blox-text-muted">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              label: 'Total XP', 
              value: '1,250', 
              change: '+125 this week',
              icon: Zap,
              color: 'from-yellow-500 to-orange-500',
              bgColor: 'bg-yellow-500/10'
            },
            { 
              label: 'Videos Completed', 
              value: '24', 
              change: '3 this week',
              icon: PlayCircle,
              color: 'from-blox-teal to-blox-success',
              bgColor: 'bg-blox-teal/10'
            },
            { 
              label: 'Current Level', 
              value: 'Level 5', 
              change: '65% to next',
              icon: Trophy,
              color: 'from-purple-500 to-pink-500',
              bgColor: 'bg-purple-500/10'
            },
            { 
              label: 'Team Rank', 
              value: '#42', 
              change: '↑ 8 positions',
              icon: Users,
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'bg-blue-500/10'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border relative overflow-hidden group"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative">
                <div className={`inline-flex p-3 ${stat.bgColor} rounded-lg mb-4`}>
                  <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className="text-2xl font-bold text-blox-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-blox-text-muted">{stat.label}</div>
                <div className="text-xs text-blox-teal mt-2">{stat.change}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Path Progress - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-dark rounded-xl p-6 border border-blox-glass-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blox-text-primary flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blox-teal" />
                Continue Learning
              </h2>
              <button className="text-sm text-blox-teal hover:text-blox-success transition-colors flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Current Module Progress */}
            <div className="bg-gradient-to-r from-blox-purple-DEFAULT/20 to-blox-teal/20 rounded-lg p-5 mb-6 border border-blox-purple-DEFAULT/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blox-text-primary mb-1">
                    Module 3: Advanced Building Techniques
                  </h3>
                  <p className="text-sm text-blox-text-muted">
                    Master complex structures and optimize your builds
                  </p>
                </div>
                <span className="px-3 py-1 bg-blox-teal/20 text-blox-teal text-xs font-semibold rounded-full">
                  IN PROGRESS
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-blox-text-muted">Module Progress</span>
                  <span className="text-blox-text-primary font-semibold">65%</span>
                </div>
                <div className="w-full h-3 bg-blox-darkblue rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blox-teal to-blox-success rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-blox-teal to-blox-success text-white font-semibold rounded-lg hover:shadow-glow-teal transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Resume Last Video
              </button>
            </div>

            {/* Upcoming Videos */}
            <h3 className="text-lg font-semibold text-blox-text-primary mb-4">
              Up Next in Your Path
            </h3>
            <div className="space-y-3">
              {upcomingVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-blox-darkblue2/30 rounded-lg hover:bg-blox-darkblue2/50 transition-all cursor-pointer group"
                >
                  {/* Video Thumbnail */}
                  <div className="relative w-24 h-14 bg-blox-darkblue rounded-lg overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blox-purple-DEFAULT/50 to-blox-teal/50 flex items-center justify-center">
                      <Video className="w-8 h-8 text-white/50" />
                    </div>
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-blox-text-primary group-hover:text-blox-teal transition-colors">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-blox-text-muted">{video.module}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        video.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        video.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {video.difficulty}
                      </span>
                      <span className="text-xs text-blox-teal">+{video.xp} XP</span>
                    </div>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-blox-text-muted group-hover:text-blox-teal transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blox-text-primary flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Recent Achievements
                </h3>
                <span className="text-xs text-blox-text-muted">3 new</span>
              </div>
              
              <div className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      achievement.rarity === 'common' ? 'bg-gray-500/10 border-gray-500/30' :
                      achievement.rarity === 'rare' ? 'bg-blue-500/10 border-blue-500/30' :
                      'bg-purple-500/10 border-purple-500/30'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-blox-text-primary">
                        {achievement.name}
                      </div>
                      <div className={`text-xs capitalize ${
                        achievement.rarity === 'common' ? 'text-gray-400' :
                        achievement.rarity === 'rare' ? 'text-blue-400' :
                        'text-purple-400'
                      }`}>
                        {achievement.rarity}
                      </div>
                    </div>
                    <Sparkles className={`w-4 h-4 ${
                      achievement.rarity === 'common' ? 'text-gray-400' :
                      achievement.rarity === 'rare' ? 'text-blue-400' :
                      'text-purple-400'
                    }`} />
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-blox-teal hover:text-blox-success transition-colors flex items-center justify-center gap-1">
                View All Achievements
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Team Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blox-text-primary flex items-center gap-2">
                  <Users className="w-5 h-5 text-blox-success" />
                  Community Activity
                </h3>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              <div className="space-y-3">
                {teamActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blox-teal to-blox-success flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-blox-text-secondary">
                        <span className="font-semibold text-blox-text-primary">
                          {activity.user}
                        </span>{' '}
                        {activity.action}{' '}
                        <span className="text-blox-teal">{activity.target}</span>
                      </p>
                      <p className="text-xs text-blox-text-muted mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-blox-teal hover:text-blox-success transition-colors flex items-center justify-center gap-1">
                Join Discord
                <MessageSquare className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <h3 className="text-lg font-semibold text-blox-text-primary mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-center">
                  <Calendar className="w-6 h-6 text-blox-teal mx-auto mb-2" />
                  <span className="text-xs text-blox-text-secondary">Events</span>
                </button>
                <button className="p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-center">
                  <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <span className="text-xs text-blox-text-secondary">Goals</span>
                </button>
                <button className="p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-center">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <span className="text-xs text-blox-text-secondary">Leaderboard</span>
                </button>
                <button className="p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-center">
                  <MessageSquare className="w-6 h-6 text-blox-success mx-auto mb-2" />
                  <span className="text-xs text-blox-text-secondary">Forums</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}