'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import AIAssistant from '@/components/chat/AIAssistant';
import { 
  ArrowLeft,
  PlayCircle,
  Clock,
  Zap,
  Trophy,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Target,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  FileText,
  Download,
  Users,
  StickyNote,
  Video,
  Maximize2,
  Volume2,
  Settings,
  SkipForward,
  SkipBack,
  Play,
  Pause,
  ChevronDown,
  X,
  Send,
  Sparkles,
  Code,
  HelpCircle,
  AlertCircle,
  Youtube,
  Gamepad2
} from 'lucide-react';
import Link from 'next/link';

// Mock video data with more details
const videoData = {
  'adv-1': {
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    title: 'Complex Part Manipulation',
    description: 'Learn advanced techniques for manipulating parts including CSG operations and unions',
    moduleTitle: 'Module 3: Advanced Building Techniques',
    moduleId: '3',
    xpReward: 40,
    duration: '18:45',
    difficulty: 'Intermediate',
    nextVideoId: 'adv-2',
    nextVideoTitle: 'Creating Custom Meshes',
    previousVideoId: null,
    previousVideoTitle: null,
    learningObjectives: [
      'Understand CSG operations in Roblox Studio',
      'Master union and negate operations',
      'Learn performance optimization for complex parts',
      'Create reusable part templates'
    ],
    resources: [
      { name: 'CSG Operations Guide', type: 'pdf', size: '2.3 MB', url: '#' },
      { name: 'Part Template Library', type: 'rbxl', size: '5.1 MB', url: '#' },
      { name: 'Practice Exercises', type: 'zip', size: '1.8 MB', url: '#' }
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction' },
      { time: '02:15', label: 'CSG Basics' },
      { time: '06:30', label: 'Union Operations' },
      { time: '10:45', label: 'Negate & Subtract' },
      { time: '14:20', label: 'Performance Tips' },
      { time: '17:00', label: 'Summary & Practice' }
    ]
  },
  'light-1': {
    videoId: 'dQw4w9WgXcQ',
    title: 'Dynamic Lighting Systems',
    description: 'Create immersive lighting that changes with gameplay',
    moduleTitle: 'Module 3: Advanced Building Techniques',
    moduleId: '3',
    xpReward: 45,
    duration: '19:30',
    difficulty: 'Intermediate',
    nextVideoId: 'light-2',
    nextVideoTitle: 'Day/Night Cycles',
    previousVideoId: 'adv-4',
    previousVideoTitle: 'Modular Building Systems',
    learningObjectives: [
      'Implement dynamic lighting changes',
      'Script lighting transitions',
      'Optimize lighting for performance',
      'Create mood with lighting'
    ],
    resources: [
      { name: 'Lighting Script Template', type: 'lua', size: '450 KB', url: '#' },
      { name: 'Example World', type: 'rbxl', size: '8.2 MB', url: '#' }
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction' },
      { time: '03:00', label: 'Lighting Properties' },
      { time: '07:30', label: 'Scripting Basics' },
      { time: '12:00', label: 'Transitions' },
      { time: '16:00', label: 'Performance' }
    ]
  }
};

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const videoKey = params.videoId as string || 'light-1';
  const video = videoData[videoKey as keyof typeof videoData] || videoData['light-1'];
  
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'notes' | 'transcript'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [hasWatched75Percent, setHasWatched75Percent] = useState(false);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<{timestamp: string, note: string}[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: `Hey! I'm Blox Chat Genius, your AI learning buddy! I'm here to help you master "${video.title}". Ask me anything about the concepts in this video - I can explain things differently, give you code examples, or help you troubleshoot!`
    }
  ]);
  const [showFloatingProgress, setShowFloatingProgress] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const playerRef = useRef<any>(null);

  // Mock transcript data for each chapter
  const chapterTranscripts = [
    "Welcome everyone to this comprehensive guide on Complex Part Manipulation in Roblox Studio. Today we're going to explore some of the most powerful tools available for creating advanced geometry in your games.",
    "CSG stands for Constructive Solid Geometry. It's a modeling technique that allows you to create complex shapes by combining simple geometric forms. In Roblox, we use Union, Negate, and Separate operations to achieve incredible results.",
    "Union operations are the foundation of CSG. When you union two or more parts together, they become a single object. This is perfect for creating custom shapes that would be impossible with standard parts alone.",
    "The Negate operation is like the opposite of Union. It allows you to subtract one shape from another. Think of it like carving - you can create holes, indentations, and complex negative spaces.",
    "Performance is crucial when working with CSG. Each union operation increases the complexity of your part, which can impact game performance. Always separate unions when you're done editing, and avoid creating too many complex unions.",
    "Let's recap what we've learned today and look at some practice exercises. Remember, mastering CSG takes practice, but it opens up endless possibilities for your Roblox creations."
  ];

  // Simulate video progress
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 0.5, 100);
          if (newProgress >= 75 && !hasWatched75Percent) {
            setHasWatched75Percent(true);
          }
          if (newProgress === 100) {
            setIsPlaying(false);
            setShowCompletionModal(true);
          }
          return newProgress;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, hasWatched75Percent]);

  // Show floating progress when scrolled past video
  useEffect(() => {
    const handleScroll = () => {
      const videoElement = document.getElementById('video-player');
      if (videoElement) {
        const rect = videoElement.getBoundingClientRect();
        setShowFloatingProgress(rect.bottom < 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      
      switch(e.key) {
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // Skip back 10 seconds
          break;
        case 'ArrowRight':
          e.preventDefault();
          // Skip forward 10 seconds
          break;
        case 'f':
          e.preventDefault();
          // Toggle fullscreen
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory(prev => [...prev, { role: 'user', content: chatMessage }]);
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: `I understand you're asking about "${chatMessage}". In this video, we cover that concept around the middle section. Would you like me to explain it in more detail?`
      }]);
    }, 1000);
    setChatMessage('');
  };

  const quickPrompts = [
    { icon: HelpCircle, text: "Explain this concept", prompt: "Can you explain the main concept being discussed?" },
    { icon: Code, text: "Show me code", prompt: "Can you show me a code example of what's being taught?" },
    { icon: Sparkles, text: "Give me tips", prompt: "What are some pro tips for this technique?" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blox-darkblue2 via-blox-darkblue to-blox-purple-deep">
      <Sidebar />
      
      <main className="ml-[280px]">
        {/* Header with back navigation */}
        <div className="p-6 pb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <Link 
              href={`/learning/module/${video.moduleId}`}
              className="inline-flex items-center gap-2 text-blox-text-muted hover:text-blox-teal transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {video.moduleTitle}
            </Link>
          </motion.div>
        </div>

        {/* Video Player Section */}
        <div className="px-6">
          <motion.div
            id="video-player"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative glass-dark rounded-xl overflow-hidden border border-blox-glass-border"
          >
            {/* Module and XP Badges */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between pointer-events-none">
              <div className="px-3 py-1 bg-blox-darkblue2/90 backdrop-blur-sm rounded-lg border border-blox-glass-border pointer-events-auto">
                <span className="text-xs text-blox-text-muted">{video.moduleTitle}</span>
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30 flex items-center gap-2 pointer-events-auto">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-semibold text-yellow-400">+{video.xpReward} XP</span>
              </div>
            </div>

            {/* Video Container - Larger */}
            <div className="aspect-video bg-black relative group">
              {/* Placeholder for YouTube Player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white ml-0" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-blox-teal transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button className="text-white hover:text-blox-teal transition-colors">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button className="text-white hover:text-blox-teal transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-xs text-white">0:00</span>
                    <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blox-teal transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-white">{video.duration}</span>
                  </div>
                  <button className="text-white hover:text-blox-teal transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button className="text-white hover:text-blox-teal transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="text-white hover:text-blox-teal transition-colors">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar with Chapters */}
            <div className="bg-blox-darkblue2/80 p-3">
              <div className="relative">
                <div className="h-2 bg-blox-darkblue rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blox-teal to-blox-success"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {/* Chapter Markers */}
                {video.timestamps.map((timestamp, index) => {
                  const position = (index / (video.timestamps.length - 1)) * 100;
                  return (
                    <div
                      key={index}
                      className="absolute top-0 w-2 h-2 bg-blox-glass-border rounded-full transform -translate-x-1/2 cursor-pointer hover:bg-blox-teal transition-colors"
                      style={{ left: `${position}%` }}
                      title={timestamp.label}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Chat Section Below Video */}
        <div className="px-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-dark rounded-xl border border-blox-glass-border p-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[400px]">
              {/* AI Assistant Chat */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-blox-glass-border">
                  <Sparkles className="w-5 h-5 text-blox-teal" />
                  <h3 className="font-semibold text-blox-text-primary">Blox Chat Genius</h3>
                  <span className="text-xs text-blox-text-muted ml-auto">Your AI Learning Buddy</span>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                  {chatHistory.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-blox-teal/20 text-blox-text-primary' 
                          : 'bg-blox-darkblue2/50 text-blox-text-secondary'
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Prompts */}
                <div className="flex gap-2 mb-3">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setChatMessage(prompt.prompt)}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-blox-darkblue2/50 hover:bg-blox-darkblue2/70 rounded-lg transition-all text-blox-text-muted hover:text-blox-text-primary"
                    >
                      <prompt.icon className="w-3 h-3" />
                      {prompt.text}
                    </button>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about this video..."
                    className="flex-1 px-3 py-2 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-sm text-blox-text-primary placeholder:text-blox-text-muted focus:outline-none focus:border-blox-teal"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-gradient-to-r from-blox-teal to-blox-success text-white rounded-lg hover:shadow-glow-teal transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Community Discussion */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-blox-glass-border">
                  <Users className="w-5 h-5 text-blox-success" />
                  <h3 className="font-semibold text-blox-text-primary">Community Discussion</h3>
                  <span className="text-xs text-blox-text-muted ml-auto">42 learners online</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                  {/* Sample Comments */}
                  <div className="p-3 bg-blox-darkblue2/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
                      <span className="text-sm font-medium text-blox-text-primary">Alex_Builder</span>
                      <span className="text-xs text-blox-text-muted">5 min ago</span>
                    </div>
                    <p className="text-sm text-blox-text-secondary">
                      Great explanation of CSG! The performance tips at 14:20 really helped me optimize my game.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blox-darkblue2/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full" />
                      <span className="text-sm font-medium text-blox-text-primary">GameDev2024</span>
                      <span className="text-xs text-blox-text-muted">12 min ago</span>
                    </div>
                    <p className="text-sm text-blox-text-secondary">
                      Anyone else having issues with unions disappearing? Check your collision settings!
                    </p>
                  </div>

                  <div className="p-3 bg-blox-darkblue2/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full" />
                      <span className="text-sm font-medium text-blox-text-primary">ProBuilder</span>
                      <span className="text-xs text-blox-text-muted">1 hour ago</span>
                    </div>
                    <p className="text-sm text-blox-text-secondary">
                      Pro tip: Always separate your unions before publishing to avoid corruption issues!
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Join the discussion..."
                    className="flex-1 px-3 py-2 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-sm text-blox-text-primary placeholder:text-blox-text-muted focus:outline-none focus:border-blox-teal"
                  />
                  <button className="px-4 py-2 bg-blox-darkblue2/50 hover:bg-blox-darkblue2/70 text-blox-text-secondary rounded-lg transition-all">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabbed Content Section */}
        <div className="px-6 mt-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-dark rounded-xl border border-blox-glass-border"
          >
            {/* Tab Headers */}
            <div className="flex border-b border-blox-glass-border">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'resources', label: 'Resources', icon: Download },
                { id: 'notes', label: 'Notes', icon: StickyNote },
                { id: 'transcript', label: 'Transcript', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-blox-darkblue2/50 text-blox-teal border-b-2 border-blox-teal'
                      : 'text-blox-text-muted hover:text-blox-text-secondary hover:bg-blox-darkblue2/30'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-blox-text-primary mb-3">{video.title}</h2>
                      <p className="text-blox-text-secondary">{video.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-blox-text-primary mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-blox-teal" />
                        Learning Objectives
                      </h3>
                      <ul className="space-y-2">
                        {video.learningObjectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-blox-text-secondary">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-blox-text-primary mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-400" />
                        Video Chapters
                      </h3>
                      <div className="space-y-2">
                        {video.timestamps.map((timestamp, index) => (
                          <div key={index}>
                            <button
                              onClick={() => setSelectedChapter(selectedChapter === index ? null : index)}
                              className="w-full flex items-center justify-between p-2 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-blox-teal font-mono">{timestamp.time}</span>
                                <span className="text-sm text-blox-text-secondary group-hover:text-blox-text-primary transition-colors">
                                  {timestamp.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <PlayCircle className="w-4 h-4 text-blox-text-muted group-hover:text-blox-teal transition-colors" />
                                <ChevronDown className={`w-4 h-4 text-blox-text-muted transition-all ${
                                  selectedChapter === index ? 'rotate-180' : ''
                                }`} />
                              </div>
                            </button>
                            
                            {/* Transcript Preview */}
                            <AnimatePresence>
                              {selectedChapter === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-3 mt-2 bg-blox-darkblue2/20 rounded-lg border border-blox-glass-border">
                                    <p className="text-sm text-blox-text-secondary italic">
                                      "{chapterTranscripts[index]}"
                                    </p>
                                    <button className="mt-2 text-xs text-blox-teal hover:text-blox-success transition-colors">
                                      View full transcript →
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'resources' && (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-blox-text-primary">
                        Video Resources
                      </h3>
                      <Link
                        href="/resources/youtube"
                        className="text-xs text-blox-teal hover:text-blox-success transition-colors"
                      >
                        View All YouTube Resources →
                      </Link>
                    </div>
                    
                    {/* YouTube Description Resources */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <h4 className="text-sm font-semibold text-blox-text-secondary">From Video Description</h4>
                      </div>
                      <div className="space-y-2">
                        {video.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                resource.type === 'pdf' ? 'bg-red-500/20' :
                                resource.type === 'lua' ? 'bg-blue-500/20' :
                                resource.type === 'rbxl' ? 'bg-green-500/20' :
                                'bg-purple-500/20'
                              }`}>
                                {resource.type === 'pdf' ? <FileText className="w-5 h-5 text-red-400" /> :
                                 resource.type === 'lua' ? <Code className="w-5 h-5 text-blue-400" /> :
                                 resource.type === 'rbxl' ? <Gamepad2 className="w-5 h-5 text-green-400" /> :
                                 <BookOpen className="w-5 h-5 text-purple-400" />}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-blox-text-primary">{resource.name}</p>
                                <p className="text-xs text-blox-text-muted">{resource.type.toUpperCase()} • {resource.size}</p>
                              </div>
                            </div>
                            <Download className="w-5 h-5 text-blox-text-muted group-hover:text-blox-teal transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                    
                    {/* Additional Resources */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-blox-teal" />
                        <h4 className="text-sm font-semibold text-blox-text-secondary">Blox Buddy Extras</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-3 bg-gradient-to-br from-blox-purple-DEFAULT/20 to-blox-teal/20 rounded-lg hover:from-blox-purple-DEFAULT/30 hover:to-blox-teal/30 transition-all">
                          <div className="flex flex-col items-center gap-2">
                            <Target className="w-6 h-6 text-blox-teal" />
                            <span className="text-xs text-blox-text-secondary">Practice Exercises</span>
                          </div>
                        </button>
                        <button className="p-3 bg-gradient-to-br from-blox-purple-DEFAULT/20 to-blox-teal/20 rounded-lg hover:from-blox-purple-DEFAULT/30 hover:to-blox-teal/30 transition-all">
                          <div className="flex flex-col items-center gap-2">
                            <Users className="w-6 h-6 text-blox-success" />
                            <span className="text-xs text-blox-text-secondary">Community Projects</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    {/* Quick Tip */}
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-yellow-400 font-semibold mb-1">Pro Tip!</p>
                          <p className="text-xs text-blox-text-secondary">
                            All resources from YouTube videos are automatically organized in your sidebar under Resources → YouTube Resources for easy access later!
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-blox-text-primary">Your Notes</h3>
                      <div className="flex items-center gap-2">
                        <Link
                          href="/notes"
                          className="text-xs text-blox-teal hover:text-blox-success transition-colors"
                        >
                          View All Notes →
                        </Link>
                        <span className="text-xs text-blox-text-muted">Auto-saved</span>
                      </div>
                    </div>
                    
                    {/* Quick Note Actions */}
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => {
                          const timestamp = `[${Math.floor(progress * video.duration.split(':')[0] / 100)}:${Math.floor((progress * 60) % 60).toString().padStart(2, '0')}]`;
                          setNotes(notes + (notes ? '\n' : '') + timestamp + ' ');
                        }}
                        className="px-3 py-1.5 bg-blox-darkblue2/50 hover:bg-blox-darkblue2/70 rounded-lg text-xs text-blox-text-secondary transition-all flex items-center gap-1"
                      >
                        <Clock className="w-3 h-3" />
                        Add Timestamp
                      </button>
                      <button
                        onClick={() => {
                          if (selectedChapter !== null && chapterTranscripts[selectedChapter]) {
                            const quote = `"${chapterTranscripts[selectedChapter].substring(0, 100)}..."`;
                            setNotes(notes + (notes ? '\n\n' : '') + quote);
                          }
                        }}
                        className="px-3 py-1.5 bg-blox-darkblue2/50 hover:bg-blox-darkblue2/70 rounded-lg text-xs text-blox-text-secondary transition-all flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        Quote from Transcript
                      </button>
                      <button
                        onClick={() => {
                          const note = notes.trim();
                          if (note) {
                            const timestamp = `${Math.floor(progress * video.duration.split(':')[0] / 100)}:${Math.floor((progress * 60) % 60).toString().padStart(2, '0')}`;
                            setSavedNotes([...savedNotes, { timestamp, note }]);
                            setNotes('');
                          }
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-blox-teal to-blox-success text-white rounded-lg text-xs font-semibold transition-all hover:shadow-glow-teal flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Save Note
                      </button>
                    </div>
                    
                    {/* Note Taking Area */}
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes while watching the video... Use shortcuts above to add timestamps or quotes!"
                      className="w-full h-48 p-4 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-sm text-blox-text-primary placeholder:text-blox-text-muted focus:outline-none focus:border-blox-teal resize-none font-mono"
                    />
                    
                    {/* Saved Notes */}
                    {savedNotes.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-blox-text-secondary">Saved Notes from This Video</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {savedNotes.map((note, index) => (
                            <div key={index} className="p-3 bg-blox-darkblue2/30 rounded-lg border border-blox-glass-border">
                              <div className="flex items-start gap-2">
                                <span className="text-xs text-blox-teal font-mono">{note.timestamp}</span>
                                <p className="text-sm text-blox-text-secondary flex-1">{note.note}</p>
                                <button
                                  onClick={() => setSavedNotes(savedNotes.filter((_, i) => i !== index))}
                                  className="text-blox-text-muted hover:text-red-400 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'transcript' && (
                  <motion.div
                    key="transcript"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-blox-text-primary mb-3">Video Transcript</h3>
                    <div className="space-y-3 text-sm text-blox-text-secondary">
                      <p>
                        <span className="text-blox-teal font-mono mr-3">00:00</span>
                        Welcome to this comprehensive guide on Complex Part Manipulation in Roblox Studio...
                      </p>
                      <p>
                        <span className="text-blox-teal font-mono mr-3">00:15</span>
                        Today we'll be diving deep into CSG operations, which stands for Constructive Solid Geometry...
                      </p>
                      <p>
                        <span className="text-blox-teal font-mono mr-3">00:45</span>
                        These powerful tools allow you to create complex shapes by combining simple parts...
                      </p>
                      <p className="text-blox-text-muted italic">
                        [Full transcript would be loaded here from the database]
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Floating Progress Card */}
        <AnimatePresence>
          {showFloatingProgress && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 glass-dark rounded-lg p-4 border border-blox-glass-border shadow-lg z-40"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-blox-darkblue"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${progress * 1.25} 125`}
                      className="text-blox-teal"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blox-text-primary">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blox-text-primary">{video.title}</p>
                  <p className="text-xs text-blox-text-muted">
                    {hasWatched75Percent ? 'Almost complete!' : 'In progress'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Video Floating Card */}
        <AnimatePresence>
          {progress > 80 && video.nextVideoId && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed top-24 right-6 glass-dark rounded-lg p-4 border border-blox-glass-border shadow-lg z-40 w-80"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-blox-text-primary">Up Next</span>
                <button className="text-blox-text-muted hover:text-blox-text-primary">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="aspect-video bg-blox-darkblue rounded-lg mb-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blox-purple-DEFAULT/50 to-blox-teal/50 flex items-center justify-center">
                  <PlayCircle className="w-10 h-10 text-white/50" />
                </div>
              </div>
              <p className="text-sm font-medium text-blox-text-primary mb-3">{video.nextVideoTitle}</p>
              <Link
                href={`/learning/video/${video.nextVideoId}`}
                className="block w-full py-2 bg-gradient-to-r from-blox-teal to-blox-success text-white text-sm font-semibold text-center rounded-lg hover:shadow-glow-teal transition-all"
              >
                Continue Learning
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Modal */}
        <AnimatePresence>
          {showCompletionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowCompletionModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-dark rounded-2xl p-8 border border-blox-glass-border max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-blox-text-primary mb-2">
                    Video Complete! 🎉
                  </h2>
                  
                  <p className="text-blox-text-muted mb-6">
                    Great job! You've earned <span className="text-yellow-400 font-semibold">+{video.xpReward} XP</span>
                  </p>
                  
                  <div className="flex gap-3">
                    {video.nextVideoId ? (
                      <>
                        <button
                          onClick={() => setShowCompletionModal(false)}
                          className="flex-1 py-3 bg-blox-darkblue2/50 text-blox-text-secondary font-semibold rounded-lg hover:bg-blox-darkblue2/70 transition-all"
                        >
                          Review Video
                        </button>
                        <Link
                          href={`/learning/video/${video.nextVideoId}`}
                          className="flex-1 py-3 bg-gradient-to-r from-blox-teal to-blox-success text-white font-semibold rounded-lg hover:shadow-glow-teal transition-all flex items-center justify-center"
                        >
                          Next Video
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/learning/module/${video.moduleId}`}
                        className="w-full py-3 bg-gradient-to-r from-blox-teal to-blox-success text-white font-semibold rounded-lg hover:shadow-glow-teal transition-all flex items-center justify-center"
                      >
                        Back to Module
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}