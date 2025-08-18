'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Star,
  Globe,
  Clock,
  Zap,
  MessageSquare,
  ChevronRight,
  UserPlus,
  Shield,
  Trophy,
  Target,
  Sparkles,
  Hash,
  Calendar,
  MapPin
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

// Mock team data
const teams = [
  {
    id: 1,
    name: "Obby Masters",
    description: "We're building the ultimate obstacle course with unique mechanics!",
    members: 3,
    maxMembers: 5,
    level: "Intermediate",
    project: "Mega Obby Adventure",
    lookingFor: ["Scripter", "UI Designer"],
    tags: ["Obby", "Adventure", "Multiplayer"],
    leader: "CoolBuilder123",
    createdAt: "2 days ago",
    discord: "obby-masters",
    isRecruiting: true,
    xpRequired: 500
  },
  {
    id: 2,
    name: "RPG Legends",
    description: "Creating an epic fantasy RPG with quests, dungeons, and boss battles",
    members: 4,
    maxMembers: 6,
    level: "Advanced",
    project: "Realm of Legends",
    lookingFor: ["3D Modeler", "Sound Designer"],
    tags: ["RPG", "Fantasy", "Combat"],
    leader: "ProDev456",
    createdAt: "1 week ago",
    discord: "rpg-legends",
    isRecruiting: true,
    xpRequired: 1000
  },
  {
    id: 3,
    name: "Tycoon Titans",
    description: "Building innovative tycoon games with unique progression systems",
    members: 5,
    maxMembers: 5,
    level: "Beginner",
    project: "Space Station Tycoon",
    lookingFor: [],
    tags: ["Tycoon", "Simulation", "Economy"],
    leader: "TycoonKing",
    createdAt: "3 days ago",
    discord: "tycoon-titans",
    isRecruiting: false,
    xpRequired: 200
  },
  {
    id: 4,
    name: "Horror Squad",
    description: "Developing spine-chilling horror experiences with immersive storytelling",
    members: 2,
    maxMembers: 4,
    level: "Intermediate",
    project: "Haunted Mansion Escape",
    lookingFor: ["Builder", "Scripter"],
    tags: ["Horror", "Story", "Puzzle"],
    leader: "SpookyDev",
    createdAt: "5 hours ago",
    discord: "horror-squad",
    isRecruiting: true,
    xpRequired: 750
  },
  {
    id: 5,
    name: "Racing Revolution",
    description: "Creating high-speed racing games with custom vehicles and tracks",
    members: 3,
    maxMembers: 5,
    level: "Advanced",
    project: "Ultimate Race League",
    lookingFor: ["Vehicle Designer", "Track Builder"],
    tags: ["Racing", "Vehicles", "Competition"],
    leader: "SpeedRacer",
    createdAt: "4 days ago",
    discord: "racing-rev",
    isRecruiting: true,
    xpRequired: 1200
  }
];

const skillFilters = [
  "All Skills",
  "Builder",
  "Scripter",
  "UI Designer",
  "3D Modeler",
  "Sound Designer",
  "Game Designer",
  "Artist"
];

const levelFilters = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All Skills");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [showRecruitingOnly, setShowRecruitingOnly] = useState(false);

  // Filter teams based on search and filters
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.project.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = selectedSkill === "All Skills" || 
                         team.lookingFor.includes(selectedSkill);
    
    const matchesLevel = selectedLevel === "All Levels" || 
                         team.level === selectedLevel;
    
    const matchesRecruiting = !showRecruitingOnly || team.isRecruiting;
    
    return matchesSearch && matchesSkill && matchesLevel && matchesRecruiting;
  });

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
                <Users className="w-10 h-10 text-blox-teal" />
                Team Hub
              </h1>
              <p className="text-blox-text-muted">
                Find your perfect team or recruit talented developers for your project
              </p>
            </div>
            
            <button className="px-6 py-3 bg-gradient-to-r from-blox-teal to-blox-success text-white font-bold rounded-xl hover:shadow-glow-teal transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Team
            </button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-dark rounded-xl p-6 border border-blox-glass-border mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blox-text-muted" />
                <input
                  type="text"
                  placeholder="Search teams by name, project, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-blox-text-primary placeholder-blox-text-muted focus:outline-none focus:border-blox-teal transition-colors"
                />
              </div>
            </div>

            {/* Skill Filter */}
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-3 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-blox-text-primary focus:outline-none focus:border-blox-teal transition-colors"
            >
              {skillFilters.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 bg-blox-darkblue2/50 border border-blox-glass-border rounded-lg text-blox-text-primary focus:outline-none focus:border-blox-teal transition-colors"
            >
              {levelFilters.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            {/* Recruiting Toggle */}
            <button
              onClick={() => setShowRecruitingOnly(!showRecruitingOnly)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                showRecruitingOnly 
                  ? 'bg-blox-teal/20 text-blox-teal border border-blox-teal/30' 
                  : 'bg-blox-darkblue2/50 text-blox-text-secondary border border-blox-glass-border hover:border-blox-teal/50'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              Recruiting
            </button>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-blox-text-muted">
              Showing {filteredTeams.length} teams
            </span>
            {(selectedSkill !== "All Skills" || selectedLevel !== "All Levels" || showRecruitingOnly) && (
              <>
                <span className="text-blox-text-muted">•</span>
                <button
                  onClick={() => {
                    setSelectedSkill("All Skills");
                    setSelectedLevel("All Levels");
                    setShowRecruitingOnly(false);
                  }}
                  className="text-sm text-blox-teal hover:text-blox-success transition-colors"
                >
                  Clear filters
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-dark rounded-xl border border-blox-glass-border overflow-hidden hover:border-blox-teal/50 transition-all"
            >
              {/* Team Header */}
              <div className="p-6 border-b border-blox-glass-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-blox-text-primary mb-1 flex items-center gap-2">
                      {team.name}
                      {team.isRecruiting && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          RECRUITING
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-blox-text-muted flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Led by {team.leader}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    team.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    team.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {team.level}
                  </div>
                </div>

                <p className="text-blox-text-secondary mb-4">
                  {team.description}
                </p>

                {/* Project Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-blox-teal" />
                    <span className="text-sm text-blox-text-secondary font-medium">
                      {team.project}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blox-text-muted" />
                    <span className="text-sm text-blox-text-muted">
                      {team.members}/{team.maxMembers}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blox-text-muted" />
                    <span className="text-sm text-blox-text-muted">
                      {team.createdAt}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {team.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blox-darkblue2/50 text-xs text-blox-text-secondary rounded-lg flex items-center gap-1"
                    >
                      <Hash className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Looking For */}
                {team.lookingFor.length > 0 && (
                  <div className="p-3 bg-blox-teal/10 border border-blox-teal/30 rounded-lg">
                    <p className="text-sm font-semibold text-blox-teal mb-2">
                      Looking for:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {team.lookingFor.map(role => (
                        <span
                          key={role}
                          className="px-3 py-1 bg-blox-teal/20 text-blox-teal text-xs font-medium rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Team Footer */}
              <div className="p-4 bg-blox-darkblue2/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#5865F2]" />
                    <span className="text-xs text-blox-text-muted">
                      #{team.discord}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-blox-text-muted">
                      {team.xpRequired} XP required
                    </span>
                  </div>
                </div>
                
                <button 
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                    team.isRecruiting
                      ? 'bg-gradient-to-r from-blox-teal to-blox-success text-white hover:shadow-glow-teal'
                      : 'bg-blox-darkblue2/50 text-blox-text-muted cursor-not-allowed'
                  }`}
                  disabled={!team.isRecruiting}
                >
                  {team.isRecruiting ? (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Apply to Join
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4" />
                      Team Full
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-dark rounded-xl p-12 border border-blox-glass-border text-center"
          >
            <Users className="w-16 h-16 text-blox-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blox-text-primary mb-2">
              No teams found
            </h3>
            <p className="text-blox-text-muted mb-6">
              Try adjusting your filters or search terms
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blox-teal to-blox-success text-white font-bold rounded-xl hover:shadow-glow-teal transition-all">
              Create Your Own Team
            </button>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Active Teams", value: "156", icon: Users, color: "text-blox-teal" },
            { label: "Recruiting Now", value: "42", icon: UserPlus, color: "text-green-400" },
            { label: "Projects Launched", value: "89", icon: Trophy, color: "text-yellow-400" },
            { label: "Members Online", value: "234", icon: Globe, color: "text-purple-400" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass-dark rounded-lg p-4 border border-blox-glass-border flex items-center gap-3"
            >
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <div className="text-2xl font-bold text-blox-text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-blox-text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}