'use client';

import { useState, useCallback, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, 
  PauseCircle, 
  SkipForward, 
  SkipBack,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  Clock,
  Zap,
  ChevronRight,
  BookOpen,
  Target,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark
} from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  description?: string;
  moduleTitle?: string;
  nextVideoId?: string;
  nextVideoTitle?: string;
  xpReward?: number;
  duration?: string;
  onComplete?: (videoId: string) => void;
  onProgress?: (videoId: string, progress: number) => void;
}

export default function YouTubePlayer({
  videoId,
  title,
  description,
  moduleTitle,
  nextVideoId,
  nextVideoTitle,
  xpReward = 50,
  duration,
  onComplete,
  onProgress
}: YouTubePlayerProps) {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [hasWatched75Percent, setHasWatched75Percent] = useState(false);

  // YouTube player options
  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 1,
      fs: 1,
    },
  };

  const onReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target);
    setTotalTime(event.target.getDuration());
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    setIsPlaying(event.data === 1); // 1 = playing
    
    // Video ended
    if (event.data === 0 && hasWatched75Percent) {
      handleVideoComplete();
    }
  };

  const handleVideoComplete = () => {
    setShowCompletionModal(true);
    if (onComplete) {
      onComplete(videoId);
    }
  };

  // Track progress
  useEffect(() => {
    if (!player || !isPlaying) return;

    const interval = setInterval(() => {
      const current = player.getCurrentTime();
      const total = player.getDuration();
      
      setCurrentTime(current);
      setTotalTime(total);
      
      const progressPercent = (current / total) * 100;
      setProgress(progressPercent);
      
      // Mark as watched if user has seen 75% of the video
      if (progressPercent >= 75 && !hasWatched75Percent) {
        setHasWatched75Percent(true);
      }
      
      if (onProgress) {
        onProgress(videoId, progressPercent);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, isPlaying, videoId, hasWatched75Percent, onProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!player) return;
    
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleMuteToggle = () => {
    if (!player) return;
    
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleSkip = (seconds: number) => {
    if (!player) return;
    const current = player.getCurrentTime();
    player.seekTo(current + seconds);
  };

  return (
    <div className="space-y-6">
      {/* Video Player Container */}
      <div className="relative">
        <div className="glass-dark rounded-xl overflow-hidden border border-blox-glass-border">
          {/* Module Badge */}
          {moduleTitle && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-blox-darkblue2/90 backdrop-blur-sm rounded-lg border border-blox-glass-border">
              <span className="text-sm text-blox-text-muted">{moduleTitle}</span>
            </div>
          )}

          {/* XP Reward Badge */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400">+{xpReward} XP</span>
          </div>

          {/* YouTube Player */}
          <div className="aspect-video bg-black">
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
              className="w-full h-full"
            />
          </div>

          {/* Custom Progress Bar */}
          <div className="p-4 bg-blox-darkblue2/50">
            <div className="flex items-center gap-4">
              <span className="text-sm text-blox-text-muted">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 h-2 bg-blox-darkblue rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blox-teal to-blox-success"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm text-blox-text-muted">
                {formatTime(totalTime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Actions */}
          <div className="glass-dark rounded-xl p-6 border border-blox-glass-border">
            <h1 className="text-2xl font-bold text-blox-text-primary mb-2">
              {title}
            </h1>
            
            {description && (
              <p className="text-blox-text-muted mb-4">
                {description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blox-darkblue2/50 hover:bg-blox-darkblue2/70 rounded-lg transition-all flex items-center gap-2 text-blox-text-secondary">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="px-4 py-2 bg-blox-darkblue2/50 hover:bg-blox-darkblue2/70 rounded-lg transition-all flex items-center gap-2 text-blox-text-secondary">
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button className="px-4 py-2 bg-blox-darkblue2/50 hover:bg-blox-darkblue2/70 rounded-lg transition-all flex items-center gap-2 text-blox-text-secondary">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="px-4 py-2 bg-blox-darkblue2/50 hover:bg-blox-darkblue2/70 rounded-lg transition-all flex items-center gap-2 text-blox-text-secondary">
                <MessageSquare className="w-4 h-4" />
                <span>Discuss</span>
              </button>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="glass-dark rounded-xl p-6 border border-blox-glass-border">
            <h2 className="text-lg font-semibold text-blox-text-primary mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blox-teal" />
              Learning Objectives
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-blox-text-secondary">
                  Understand the fundamentals of dynamic lighting systems
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-blox-text-secondary">
                  Learn how to implement day/night cycles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-blox-text-secondary">
                  Create atmospheric effects with lighting
                </span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="glass-dark rounded-xl p-6 border border-blox-glass-border">
            <h2 className="text-lg font-semibold text-blox-text-primary mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Resources & Downloads
            </h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blox-text-primary">
                      Lighting Script Template
                    </p>
                    <p className="text-xs text-blox-text-muted">lighting_system.lua</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-blox-text-muted group-hover:text-blox-teal transition-colors" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blox-text-primary">
                      Example Project File
                    </p>
                    <p className="text-xs text-blox-text-muted">dynamic_lighting.rbxl</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-blox-text-muted group-hover:text-blox-teal transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="glass-dark rounded-xl p-6 border border-blox-glass-border">
            <h3 className="text-lg font-semibold text-blox-text-primary mb-4">
              Your Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-blox-text-muted">Video Progress</span>
                  <span className="text-blox-teal font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-blox-darkblue rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blox-teal to-blox-success transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              {hasWatched75Percent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400 font-semibold">
                      Video Completed!
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Next Video */}
          {nextVideoId && (
            <div className="glass-dark rounded-xl p-6 border border-blox-glass-border">
              <h3 className="text-lg font-semibold text-blox-text-primary mb-4">
                Up Next
              </h3>
              <div className="space-y-3">
                <div className="aspect-video bg-blox-darkblue rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blox-purple-DEFAULT/50 to-blox-teal/50 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white/50" />
                  </div>
                </div>
                <p className="text-sm font-medium text-blox-text-primary">
                  {nextVideoTitle}
                </p>
                <button className="w-full py-2 bg-gradient-to-r from-blox-teal to-blox-success text-white font-semibold rounded-lg hover:shadow-glow-teal transition-all">
                  Continue Learning
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="glass-dark rounded-xl p-6 border border-blox-glass-border">
            <h3 className="text-lg font-semibold text-blox-text-primary mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-sm text-blox-text-secondary">
                📝 Take Notes
              </button>
              <button className="w-full text-left p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-sm text-blox-text-secondary">
                🔄 Practice in Studio
              </button>
              <button className="w-full text-left p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-sm text-blox-text-secondary">
                💬 Ask in Discord
              </button>
              <button className="w-full text-left p-3 bg-blox-darkblue2/30 hover:bg-blox-darkblue2/50 rounded-lg transition-all text-sm text-blox-text-secondary">
                📚 View Transcript
              </button>
            </div>
          </div>
        </div>
      </div>

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
                  Great job! You've earned <span className="text-yellow-400 font-semibold">+{xpReward} XP</span>
                </p>
                
                <div className="flex gap-3">
                  {nextVideoId ? (
                    <>
                      <button
                        onClick={() => setShowCompletionModal(false)}
                        className="flex-1 py-3 bg-blox-darkblue2/50 text-blox-text-secondary font-semibold rounded-lg hover:bg-blox-darkblue2/70 transition-all"
                      >
                        Review Video
                      </button>
                      <button
                        onClick={() => {
                          setShowCompletionModal(false);
                          // Navigate to next video
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-blox-teal to-blox-success text-white font-semibold rounded-lg hover:shadow-glow-teal transition-all"
                      >
                        Next Video
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowCompletionModal(false)}
                      className="w-full py-3 bg-gradient-to-r from-blox-teal to-blox-success text-white font-semibold rounded-lg hover:shadow-glow-teal transition-all"
                    >
                      Back to Learning Path
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}