'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Home,
  GraduationCap,
  Users,
  Trophy,
  BookOpen,
  Target,
  MessageSquare,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Zap,
  Calendar,
  BarChart3,
  StickyNote,
  FileText,
  Download,
  Youtube
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Learning Path', href: '/learning', icon: GraduationCap },
  { name: 'Teams', href: '/teams', icon: Users },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { 
    name: 'Resources', 
    href: '/resources', 
    icon: BookOpen,
    hasSubmenu: true,
    submenu: [
      { name: 'YouTube Resources', href: '/resources/youtube', icon: Youtube },
      { name: 'Templates', href: '/resources/templates', icon: FileText },
      { name: 'Downloads', href: '/resources/downloads', icon: Download }
    ]
  },
  { name: 'My Notes', href: '/notes', icon: StickyNote },
  { name: 'Progress', href: '/progress', icon: BarChart3 },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Community', href: '/community', icon: MessageSquare },
];

const bottomNav = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showProDetails, setShowProDetails] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleSubmenu = (name: string) => {
    setExpandedMenus(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <motion.aside
      initial={{ x: 0 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-blox-darkblue2/50 backdrop-blur-xl border-r border-blox-glass-border z-40"
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-blox-glass-border">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              animate={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blox-teal to-blox-success rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col"
                  >
                    <span className="text-lg font-bold text-blox-text-primary">
                      BLOX BUDDY
                    </span>
                    <span className="text-xs text-blox-teal">Learning Hub</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 hover:bg-blox-darkblue/50 rounded-lg transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 text-blox-text-muted" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-blox-text-muted" />
              )}
            </button>
          </div>
        </div>

        {/* User Progress Mini Card */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-b border-blox-glass-border"
            >
              <div className="bg-gradient-to-br from-blox-purple-DEFAULT/20 to-blox-teal/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-blox-text-muted">Level Progress</span>
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-xl font-bold text-blox-text-primary mb-1">
                  Level 3
                </div>
                <div className="w-full h-2 bg-blox-darkblue rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blox-teal to-blox-success"
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="text-xs text-blox-text-muted mt-1">
                  325 / 500 XP
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
                           (item.submenu && item.submenu.some(sub => pathname === sub.href));
            const isExpanded = expandedMenus.includes(item.name);
            
            return (
              <div key={item.name}>
                {item.hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-blox-teal/20 to-blox-success/20 text-blox-teal border border-blox-teal/30' 
                          : 'hover:bg-blox-darkblue/30 text-blox-text-secondary hover:text-blox-text-primary'
                        }
                        ${collapsed ? 'justify-center' : ''}
                      `}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-blox-teal' : ''}`} />
                      <AnimatePresence>
                        {!collapsed && (
                          <>
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="font-medium flex-1 text-left"
                            >
                              {item.name}
                            </motion.span>
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </>
                        )}
                      </AnimatePresence>
                    </button>
                    
                    {/* Submenu */}
                    <AnimatePresence>
                      {!collapsed && isExpanded && item.submenu && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-6 mt-1 space-y-1">
                            {item.submenu.map((subItem) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`
                                    flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm
                                    ${isSubActive 
                                      ? 'bg-blox-teal/10 text-blox-teal' 
                                      : 'hover:bg-blox-darkblue/30 text-blox-text-muted hover:text-blox-text-secondary'
                                    }
                                  `}
                                >
                                  <subItem.icon className="w-4 h-4" />
                                  <span>{subItem.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-blox-teal/20 to-blox-success/20 text-blox-teal border border-blox-teal/30' 
                        : 'hover:bg-blox-darkblue/30 text-blox-text-secondary hover:text-blox-text-primary'
                      }
                      ${collapsed ? 'justify-center' : ''}
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-blox-teal' : ''}`} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!collapsed && isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto"
                      >
                        <Sparkles className="w-4 h-4 text-blox-teal" />
                      </motion.div>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-blox-glass-border space-y-1">
          {bottomNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  hover:bg-blox-darkblue/30 text-blox-text-secondary hover:text-blox-text-primary
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

        {/* Pro Badge */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4"
            >
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-400">
                    Upgrade to Pro
                  </span>
                </div>
                <p className="text-xs text-blox-text-muted mb-3">
                  Unlock Blox Chat Buddy - Your AI Learning Assistant
                </p>
                
                {/* Learn More Button */}
                <button 
                  onClick={() => setShowProDetails(!showProDetails)}
                  className="w-full py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:shadow-glow-yellow transition-all flex items-center justify-center gap-1"
                >
                  {showProDetails ? 'Hide Details' : 'Learn More'}
                  <ChevronRight className={`w-3 h-3 transition-transform ${showProDetails ? 'rotate-90' : ''}`} />
                </button>

                {/* Expandable Details */}
                <AnimatePresence>
                  {showProDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-yellow-500/20">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-blox-text-secondary font-medium">
                                Blox Chat Buddy
                              </p>
                              <p className="text-xs text-blox-text-muted">
                                AI-powered assistant that knows every video inside out
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-blox-text-secondary font-medium">
                                Instant Answers
                              </p>
                              <p className="text-xs text-blox-text-muted">
                                Find exact timestamps and explanations from any video
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 p-2 bg-blox-darkblue/50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-yellow-400">
                                Only $4.99/month
                              </span>
                              <span className="text-xs text-blox-text-muted">
                                Cancel anytime
                              </span>
                            </div>
                            <p className="text-xs text-blox-text-muted">
                              We use advanced AI (LLM) technology to power the chat buddy. We're keeping costs as low as possible for young developers! 💛
                            </p>
                          </div>

                          <button className="w-full mt-2 py-1.5 bg-gradient-to-r from-blox-teal to-blox-success text-white text-xs font-bold rounded-lg hover:shadow-glow-teal transition-all">
                            Start Free Trial
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}