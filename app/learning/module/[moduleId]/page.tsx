'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  PlayCircle,
  Clock,
  Zap,
  Trophy,
  CheckCircle2,
  Lock,
  Download,
  BookOpen,
  Video,
  Filter,
  Grid,
  List,
  Calendar,
  Award,
  Users,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Flame,
  AlertCircle,
  Search,
  X
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import AIAssistant from '@/components/chat/AIAssistant';
import WeekOverview from '@/components/learning/WeekOverview';
import Link from 'next/link';
import { sampleModule3 } from '@/lib/curriculum/curriculum-data';

// Module data with all videos organized by week
const moduleData = {
  '3': {
    id: 3,
    title: "Advanced Building Techniques",
    description: "Master complex structures, optimize your builds, and create stunning visual effects that will make your games stand out.",
    weeks: "Weeks 9-12",
    totalVideos: 18,
    completedVideos: 12,
    totalXP: 600,
    earnedXP: 390,
    estimatedTime: "12 hours",
    difficulty: "Intermediate",
    prerequisites: ["Roblox Studio Basics", "Introduction to Scripting"],
    certificate: "Advanced Builder Certificate",
    instructor: "BuildMaster Pro",
    videos: {
      week9: {
        title: "Week 9: Advanced Modeling",
        videos: [
          {
            id: "adv-1",
            title: "Complex Part Manipulation",
            description: "Learn advanced techniques for manipulating parts including CSG operations and unions",
            duration: "18:45",
            xp: 40,
            difficulty: "Intermediate",
            completed: true,
            thumbnail: "modeling-1"
          },
          {
            id: "adv-2",
            title: "Creating Custom Meshes",
            description: "Import and optimize custom 3D models for your Roblox games",
            duration: "22:30",
            xp: 50,
            difficulty: "Advanced",
            completed: true,
            thumbnail: "modeling-2"
          },
          {
            id: "adv-3",
            title: "Advanced Terrain Sculpting",
            description: "Master the terrain editor to create realistic landscapes",
            duration: "25:15",
            xp: 45,
            difficulty: "Intermediate",
            completed: true,
            thumbnail: "terrain-1"
          },
          {
            id: "adv-4",
            title: "Modular Building Systems",
            description: "Create reusable building components for efficient development",
            duration: "20:00",
            xp: 40,
            difficulty: "Intermediate",
            completed: true,
            thumbnail: "modular-1"
          }
        ]
      },
      week10: {
        title: "Week 10: Lighting & Atmosphere",
        videos: [
          {
            id: "light-1",
            title: "Dynamic Lighting Systems",
            description: "Create immersive lighting that changes with gameplay",
            duration: "19:30",
            xp: 45,
            difficulty: "Intermediate",
            completed: true,
            thumbnail: "lighting-1",
            isCurrent: true
          },
          {
            id: "light-2",
            title: "Day/Night Cycles",
            description: "Implement realistic time-of-day systems",
            duration: "24:00",
            xp: 50,
            difficulty: "Advanced",
            completed: true,
            thumbnail: "daynight-1"
          },
          {
            id: "light-3",
            title: "Atmospheric Effects",
            description: "Add fog, clouds, and weather effects to enhance mood",
            duration: "21:15",
            xp: 40,
            difficulty: "Intermediate",
            completed: true,
            thumbnail: "atmosphere-1"
          },
          {
            id: "light-4",
            title: "Performance Optimization",
            description: "Optimize lighting for better game performance",
            duration: "18:00",
            xp: 35,
            difficulty: "Beginner",
            completed: true,
            thumbnail: "optimize-1"
          },
          {
            id: "light-5",
            title: "Color Grading & Post Effects",
            description: "Use ColorCorrection and Bloom for cinematic looks",
            duration: "20:30",
            xp: 40,
            difficulty: "Intermediate",
            completed: false,
            thumbnail: "color-1"
          }
        ]
      },
      week11: {
        title: "Week 11: Particle Effects",
        videos: [
          {
            id: "particle-1",
            title: "Introduction to Particle Emitters",
            description: "Master the basics of particle systems in Roblox",
            duration: "17:45",
            xp: 35,
            difficulty: "Beginner",
            completed: true,
            thumbnail: "particle-1"
          },
          {
            id: "particle-2",
            title: "Creating Fire & Smoke Effects",
            description: "Design realistic fire, smoke, and explosion effects",
            duration: "22:00",
            xp: 45,
            difficulty: "Intermediate",
            completed: true,
            thumbnail: "fire-1"
          },
          {
            id: "particle-3",
            title: "Magic & Fantasy Effects",
            description: "Create magical particle effects for fantasy games",
            duration: "25:30",
            xp: 50,
            difficulty: "Advanced",
            completed: true,
            thumbnail: "magic-1"
          },
          {
            id: "particle-4",
            title: "Environmental Particles",
            description: "Add rain, snow, and other weather particles",
            duration: "19:15",
            xp: 40,
            difficulty: "Intermediate",
            completed: false,
            thumbnail: "weather-1"
          }
        ]
      },
      week12: {
        title: "Week 12: Sound Design & Polish",
        videos: [
          {
            id: "sound-1",
            title: "3D Spatial Audio",
            description: "Implement directional sound for immersive experiences",
            duration: "18:30",
            xp: 40,
            difficulty: "Intermediate",
            completed: false,
            thumbnail: "sound-1",
            locked: true
          },
          {
            id: "sound-2",
            title: "Dynamic Music Systems",
            description: "Create adaptive music that responds to gameplay",
            duration: "23:45",
            xp: 50,
            difficulty: "Advanced",
            completed: false,
            thumbnail: "music-1",
            locked: true
          },
          {
            id: "sound-3",
            title: "Sound Effects Library",
            description: "Build and organize your sound effect collection",
            duration: "16:00",
            xp: 30,
            difficulty: "Beginner",
            completed: false,
            thumbnail: "sfx-1",
            locked: true
          },
          {
            id: "sound-4",
            title: "Final Project: Complete Scene",
            description: "Combine everything to create a polished game scene",
            duration: "35:00",
            xp: 75,
            difficulty: "Advanced",
            completed: false,
            thumbnail: "final-1",
            locked: true
          },
          {
            id: "sound-5",
            title: "Module Review & Certificate",
            description: "Review key concepts and earn your certificate",
            duration: "15:00",
            xp: 25,
            difficulty: "Beginner",
            completed: false,
            thumbnail: "review-1",
            locked: true
          }
        ]
      }
    },
    resources: [
      { name: "Lighting Template Pack", type: "template", size: "2.3 MB" },
      { name: "Particle Effect Library", type: "library", size: "5.1 MB" },
      { name: "Sound Design Guide", type: "pdf", size: "1.2 MB" },
      { name: "Performance Checklist", type: "document", size: "450 KB" }
    ],
    achievements: [
      { name: "Lighting Expert", icon: "💡", earned: true },
      { name: "Particle Master", icon: "✨", earned: true },
      { name: "Sound Designer", icon: "🎵", earned: false },
      { name: "Module Champion", icon: "🏆", earned: false }
    ]
  }
};

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string || '3';
  const module = moduleData[moduleId as keyof typeof moduleData];
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(10); // Default to week 10 as current
  const searchInputRef = useRef<HTMLInputElement>(null);

  if (!module) {
    return <div>Module not found</div>;
  }

  const progress = Math.round((module.completedVideos / module.totalVideos) * 100);

  // Extract common keywords from video titles
  const keywords = useMemo(() => {
    const allTitles = Object.values(module.videos).flatMap(week => 
      week.videos.map(v => v.title)
    ).join(' ');
    
    // Extract meaningful words (nouns, verbs, tech terms)
    const words = allTitles.match(/\b[A-Z][a-z]+\b|\b[a-z]+\b/g) || [];
    const commonWords = ['the', 'and', 'for', 'with', 'to', 'of', 'in', 'on', 'at', 'by'];
    
    // Count occurrences and filter
    const wordCount = new Map<string, number>();
    words.forEach(word => {
      const lower = word.toLowerCase();
      if (!commonWords.includes(lower) && lower.length > 2) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      }
    });
    
    // Sort by frequency and return top keywords
    return Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([word]) => word);
  }, [module]);

  // Filter suggestions based on current input
  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return keywords;
    return keywords.filter(keyword => 
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [keywords, searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blox-darkblue2 via-blox-darkblue to-blox-purple-deep">
      <Sidebar />
      
      <main className="ml-[280px] p-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-3"
        >
          <Link 
            href="/learning"
            className="inline-flex items-center gap-2 text-blox-text-muted hover:text-blox-teal transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Path
          </Link>
        </motion.div>

        {/* Module Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-xl p-8 border border-blox-glass-border mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-blox-text-primary">
                  {module.title}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {module.difficulty}
                </span>
              </div>
              <p className="text-blox-text-muted mb-4 max-w-3xl">
                {module.description}
              </p>
              
              {/* Module Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blox-text-muted" />
                  <span className="text-blox-text-secondary">{module.weeks}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blox-text-muted" />
                  <span className="text-blox-text-secondary">{module.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-blox-text-muted" />
                  <span className="text-blox-text-secondary">{module.totalVideos} videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-blox-text-secondary">{module.totalXP} XP available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blox-text-muted" />
                  <span className="text-blox-text-secondary">Instructor: {module.instructor}</span>
                </div>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="glass-dark rounded-lg p-4 border border-yellow-500/30 text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-yellow-400">
                {module.certificate}
              </p>
              <p className="text-xs text-blox-text-muted mt-1">
                Complete to earn
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blox-text-muted">Overall Progress</span>
              <span className="text-sm font-semibold text-blox-text-primary">
                {module.completedVideos}/{module.totalVideos} videos • {module.earnedXP}/{module.totalXP} XP
              </span>
            </div>
            <div className="w-full h-3 bg-blox-darkblue rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blox-teal to-blox-success"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-blox-text-muted">{progress}% Complete</span>
              {progress >= 75 && (
                <span className="text-yellow-400 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  Almost there! Keep going!
                </span>
              )}
            </div>
          </div>

          {/* Prerequisites - Moved here */}
          <div className="mt-6 pt-6 border-t border-blox-glass-border">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-blox-text-secondary">Prerequisites</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {module.prerequisites.map((prereq, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-blox-darkblue2/50 rounded-lg border border-blox-glass-border"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-blox-text-secondary">{prereq}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Videos by Week */}
          <div className="lg:col-span-2">
            {/* Filters and View Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-dark rounded-xl p-4 border border-blox-glass-border mb-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Filter className="w-4 h-4 text-blox-text-muted" />
                  
                  {/* Search Input with Suggestions */}
                  <div className="relative" ref={searchInputRef}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blox-text-muted" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search videos..."
                        className="pl-9 pr-8 py-1.5 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-sm text-blox-text-primary placeholder:text-blox-text-muted focus:outline-none focus:border-blox-teal w-[200px]"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blox-text-muted hover:text-blox-text-primary"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {/* Suggestions Dropdown */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-1 left-0 right-0 bg-blox-darkblue2 border border-blox-glass-border rounded-lg shadow-lg z-10 max-h-48 overflow-auto"
                      >
                        <div className="p-1">
                          {filteredSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchTerm(suggestion);
                                setShowSuggestions(false);
                              }}
                              className="w-full text-left px-3 py-1.5 text-sm text-blox-text-secondary hover:bg-blox-darkblue/50 hover:text-blox-text-primary rounded transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="px-3 py-1.5 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-sm text-blox-text-primary focus:outline-none focus:border-blox-teal"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1.5 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-sm text-blox-text-primary focus:outline-none focus:border-blox-teal"
                  >
                    <option value="all">All Videos</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Not Started</option>
                    <option value="available">Available</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blox-teal/20 text-blox-teal' 
                        : 'text-blox-text-muted hover:text-blox-text-secondary'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-blox-teal/20 text-blox-teal' 
                        : 'text-blox-text-muted hover:text-blox-text-secondary'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Video Sections by Week */}
            {Object.entries(module.videos).map(([weekKey, weekData], weekIndex) => (
              <motion.div
                key={weekKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + weekIndex * 0.1 }}
                className="mb-8"
              >
                <h2 className="text-xl font-bold text-blox-text-primary mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blox-teal" />
                  {weekData.title}
                </h2>

                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
                  {weekData.videos.map((video, videoIndex) => {
                    // Apply filters
                    if (searchTerm && !video.title.toLowerCase().includes(searchTerm.toLowerCase())) return null;
                    if (filterDifficulty !== 'all' && video.difficulty !== filterDifficulty) return null;
                    if (filterStatus === 'completed' && !video.completed) return null;
                    if (filterStatus === 'incomplete' && video.completed) return null;
                    if (filterStatus === 'available' && video.locked) return null;

                    return (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + videoIndex * 0.05 }}
                        whileHover={{ y: -2 }}
                        className={`glass-dark rounded-xl border ${
                          video.isCurrent ? 'border-blox-teal/50' : 'border-blox-glass-border'
                        } overflow-hidden hover:border-blox-teal/30 transition-all ${
                          video.locked ? 'opacity-60' : ''
                        }`}
                      >
                        {viewMode === 'grid' ? (
                          // Grid View
                          <>
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-blox-darkblue2">
                              <div className="absolute inset-0 bg-gradient-to-br from-blox-purple-DEFAULT/30 to-blox-teal/30 flex items-center justify-center">
                                {video.locked ? (
                                  <Lock className="w-12 h-12 text-blox-text-muted" />
                                ) : video.completed ? (
                                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                                ) : (
                                  <PlayCircle className="w-12 h-12 text-white/50" />
                                )}
                              </div>
                              {video.isCurrent && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-blox-teal/90 text-white text-xs font-semibold rounded">
                                  CONTINUE
                                </div>
                              )}
                              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                                {video.duration}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                              <h3 className="font-semibold text-blox-text-primary mb-1">
                                {video.title}
                              </h3>
                              <p className="text-xs text-blox-text-muted mb-3 line-clamp-2">
                                {video.description}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    video.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                    video.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                  }`}>
                                    {video.difficulty}
                                  </span>
                                  <span className="text-xs text-blox-teal flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    +{video.xp} XP
                                  </span>
                                </div>
                                
                                {!video.locked && (
                                  <Link
                                    href={`/learning/video/${video.id}`}
                                    className="text-xs text-blox-teal hover:text-blox-success transition-colors flex items-center gap-1"
                                  >
                                    {video.completed ? 'Review' : 'Start'}
                                    <ChevronRight className="w-3 h-3" />
                                  </Link>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          // List View
                          <div className="p-4 flex items-center gap-4">
                            {/* Status Icon */}
                            <div className="w-12 h-12 rounded-lg bg-blox-darkblue2 flex items-center justify-center flex-shrink-0">
                              {video.locked ? (
                                <Lock className="w-6 h-6 text-blox-text-muted" />
                              ) : video.completed ? (
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                              ) : (
                                <PlayCircle className="w-6 h-6 text-blox-teal" />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h3 className="font-semibold text-blox-text-primary">
                                  {video.title}
                                  {video.isCurrent && (
                                    <span className="ml-2 px-2 py-0.5 bg-blox-teal/20 text-blox-teal text-xs font-semibold rounded">
                                      CURRENT
                                    </span>
                                  )}
                                </h3>
                                {!video.locked && (
                                  <Link
                                    href={`/learning/video/${video.id}`}
                                    className="px-3 py-1 bg-gradient-to-r from-blox-teal to-blox-success text-white text-sm font-semibold rounded-lg hover:shadow-glow-teal transition-all"
                                  >
                                    {video.completed ? 'Review' : 'Watch'}
                                  </Link>
                                )}
                              </div>
                              <p className="text-sm text-blox-text-muted mb-2">
                                {video.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1 text-blox-text-muted">
                                  <Clock className="w-3 h-3" />
                                  {video.duration}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full ${
                                  video.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                  video.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {video.difficulty}
                                </span>
                                <span className="text-blox-teal flex items-center gap-1">
                                  <Zap className="w-3 h-3" />
                                  +{video.xp} XP
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Week Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <WeekOverview 
                weeks={sampleModule3.weeks_data}
                selectedWeek={selectedWeek}
                onWeekSelect={setSelectedWeek}
                moduleId={3}
              />
            </motion.div>

            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <AIAssistant />
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <h3 className="text-lg font-semibold text-blox-text-primary mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-blox-teal" />
                Resources
              </h3>
              <div className="space-y-3">
                {module.resources.map((resource, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-blox-text-muted" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-blox-text-primary">
                          {resource.name}
                        </p>
                        <p className="text-xs text-blox-text-muted">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-blox-text-muted group-hover:text-blox-teal transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Module Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <h3 className="text-lg font-semibold text-blox-text-primary mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Module Achievements
              </h3>
              <div className="space-y-3">
                {module.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      achievement.earned
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-blox-darkblue2/30 border-blox-glass-border opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        achievement.earned ? 'text-yellow-400' : 'text-blox-text-muted'
                      }`}>
                        {achievement.name}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Discussion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="glass-dark rounded-xl p-6 border border-blox-glass-border"
            >
              <h3 className="text-lg font-semibold text-blox-text-primary mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blox-success" />
                Community
              </h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-sm text-blox-text-secondary">
                  💬 Module Discussion (42 active)
                </button>
                <button className="w-full py-2 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-sm text-blox-text-secondary">
                  🤝 Find Study Buddy
                </button>
                <button className="w-full py-2 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 rounded-lg transition-all text-sm text-[#5865F2]">
                  Join Discord Channel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}