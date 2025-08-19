'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Youtube, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { Week, Video } from '@/lib/curriculum/curriculum-data';

interface WeekOverviewProps {
  weeks: Week[];
  selectedWeek: number;
  onWeekSelect: (weekNumber: number) => void;
  moduleId: number;
}

export default function WeekOverview({ weeks, selectedWeek, onWeekSelect, moduleId }: WeekOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const selectedWeekData = weeks.find(week => week.week === selectedWeek);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-xl border border-blox-glass-border mb-6 overflow-hidden"
    >
      {/* Header */}
      <div 
        className="p-4 border-b border-blox-glass-border cursor-pointer flex items-center justify-between hover:bg-blox-darkblue2/20 transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blox-teal to-blox-success rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blox-text-primary">
              Week Overview
            </h3>
            <p className="text-sm text-blox-text-muted">
              {weeks.length} weeks available
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-blox-text-muted" />
        </motion.div>
      </div>

      {/* Week Selection Grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {weeks.map((week, index) => (
                <WeekCard
                  key={week.week}
                  week={week}
                  isSelected={week.week === selectedWeek}
                  onSelect={() => onWeekSelect(week.week)}
                  index={index}
                  moduleId={moduleId}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WeekCard({ 
  week, 
  isSelected, 
  onSelect, 
  index,
  moduleId 
}: { 
  week: Week; 
  isSelected: boolean; 
  onSelect: () => void; 
  index: number;
  moduleId: number;
}) {
  // Get first few videos to show as thumbnails
  const featuredVideos = week.days
    .flatMap(day => day.videos)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onSelect}
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-blox-teal/10 border-blox-teal/30 shadow-glow-teal' 
          : 'bg-blox-darkblue2/30 border-blox-glass-border hover:bg-blox-darkblue2/50'
      } border rounded-lg p-4`}
    >
      <div className="flex items-start gap-4">
        {/* Week Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isSelected 
                ? 'bg-blox-teal text-white' 
                : 'bg-blox-darkblue text-blox-text-muted'
            }`}>
              {week.week}
            </div>
            <h4 className={`font-semibold transition-colors ${
              isSelected ? 'text-blox-teal' : 'text-blox-text-primary'
            }`}>
              {week.title}
            </h4>
          </div>
          
          <p className="text-sm text-blox-text-muted mb-3 line-clamp-2">
            {week.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-blox-text-muted">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{week.totalHours}h</span>
            </div>
            <div className="flex items-center gap-1">
              <Youtube className="w-3 h-3" />
              <span>{week.days.reduce((sum, day) => sum + day.videos.length, 0)} videos</span>
            </div>
          </div>
        </div>

        {/* Video Thumbnails */}
        <div className="flex gap-2 flex-shrink-0">
          {featuredVideos.map((video, videoIndex) => (
            <VideoThumbnail 
              key={video.id} 
              video={video} 
              index={videoIndex}
              isSelected={isSelected}
            />
          ))}
          {week.days.reduce((sum, day) => sum + day.videos.length, 0) > 3 && (
            <div className={`w-12 h-8 rounded flex items-center justify-center text-xs font-semibold ${
              isSelected 
                ? 'bg-blox-teal/20 text-blox-teal border border-blox-teal/30' 
                : 'bg-blox-darkblue2/50 text-blox-text-muted border border-blox-glass-border'
            }`}>
              +{week.days.reduce((sum, day) => sum + day.videos.length, 0) - 3}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function VideoThumbnail({ 
  video, 
  index, 
  isSelected 
}: { 
  video: Video; 
  index: number;
  isSelected: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`relative w-12 h-8 rounded overflow-hidden group ${
        isSelected ? 'ring-1 ring-blox-teal/50' : ''
      }`}
    >
      {/* Thumbnail placeholder with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        video.difficulty === 'Beginner' ? 'from-green-500/40 to-green-600/60' :
        video.difficulty === 'Intermediate' ? 'from-yellow-500/40 to-yellow-600/60' :
        'from-red-500/40 to-red-600/60'
      } flex items-center justify-center`}>
        <Youtube className="w-3 h-3 text-white/70" />
      </div>

      {/* Play overlay on hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Play className="w-3 h-3 text-white" />
      </div>

      {/* Duration badge */}
      <div className="absolute bottom-0.5 right-0.5 px-1 py-0.5 bg-black/70 text-white text-[8px] rounded">
        {video.duration.split(':')[0]}m
      </div>

      {/* XP indicator */}
      <div className="absolute top-0.5 left-0.5 px-1 py-0.5 bg-blox-teal/80 text-white text-[8px] rounded">
        +{video.xp}
      </div>
    </motion.div>
  );
}