'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare,
  Send,
  Bot,
  User,
  Maximize2,
  Minimize2,
  Sparkles,
  Clock,
  PlayCircle,
  HelpCircle,
  Search,
  Zap,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  videoReference?: {
    title: string;
    timestamp: string;
    videoId: string;
  };
}

const sampleQuestions = [
  "🔥 How do I make epic lighting effects?",
  "⚡ What's the coolest particle trick?",
  "🎮 How can I optimize for max FPS?",
  "🌙 Show me the day/night cycle hack"
];

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Yo! 👋 I'm your Blox Genius! I've watched ALL these videos and memorized everything. Ask me anything about the module - I'll find the exact spot in the video for you! What do you wanna know?",
  }
];

export default function AIAssistant() {
  const [isExpanded, setIsExpanded] = useState(true); // Open by default
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual N8n API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Yooo that's a great question! 🔥 So dynamic lighting is super cool - you can use PointLights for that glowing orb effect, SpotLights for dramatic beams, and SurfaceLight for that sick neon look! The video shows the exact setup at this timestamp 👇",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        videoReference: {
          title: "Dynamic Lighting Systems",
          timestamp: "5:23",
          videoId: "light-1"
        }
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <>
      {/* Collapsed State */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-dark rounded-xl border border-white/60 shadow-lg shadow-white/10 overflow-hidden"
          >
            {/* Chat Header Bar */}
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full p-4 hover:bg-blox-darkblue2/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blox-teal to-blox-success rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-blox-darkblue"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-blox-text-primary flex items-center gap-2">
                      Blox Chat Buddy
                      <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                        ONLINE
                      </span>
                    </h3>
                    <p className="text-xs text-blox-text-muted">
                      I know everything about these videos! 🚀
                    </p>
                  </div>
                  
                  {/* Pro Badge Mini */}
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded border border-yellow-500/30 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-bold text-yellow-400">Pro</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blox-text-muted group-hover:text-blox-teal transition-colors">
                    Click to chat
                  </span>
                  <ChevronDown className="w-4 h-4 text-blox-text-muted group-hover:text-blox-teal transition-all group-hover:translate-y-0.5" />
                </div>
              </div>
            </button>

            {/* Quick Question Buttons */}
            <div className="p-3 bg-blox-darkblue2/20 border-t border-blox-glass-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-blox-text-muted">Quick questions:</p>
                <button className="px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded hover:shadow-glow-yellow transition-all">
                  Try Free Trial
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {sampleQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="p-2.5 bg-gradient-to-r from-blox-purple-DEFAULT/20 to-blox-teal/20 hover:from-blox-purple-DEFAULT/30 hover:to-blox-teal/30 border border-blox-glass-border hover:border-blox-teal/50 rounded-lg transition-all text-xs text-blox-text-primary font-medium text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded State */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="glass-dark rounded-xl border border-white/60 shadow-lg shadow-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-blox-glass-border bg-gradient-to-r from-blox-teal/10 to-blox-success/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blox-teal to-blox-success rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-blox-darkblue"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-blox-text-primary">
                      Blox Chat Buddy 🤖
                    </h3>
                    <p className="text-xs text-blox-text-muted">
                      Video knowledge activated! ⚡
                    </p>
                  </div>
                  
                  {/* Pro Badge */}
                  <div className="ml-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <div>
                      <p className="text-xs font-bold text-yellow-400">
                        Pro Feature
                      </p>
                      <p className="text-xs text-yellow-300/80">
                        $4.99/mo
                      </p>
                    </div>
                    <button className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded hover:shadow-glow-yellow transition-all">
                      Try Free
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 hover:bg-blox-darkblue2/50 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-blox-text-muted" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-blox-darkblue2/20">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                        : 'bg-gradient-to-br from-blox-teal to-blox-success'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div>
                      <div className={`px-4 py-2.5 rounded-xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                          : 'bg-blox-darkblue/50 border border-blox-glass-border'
                      }`}>
                        <p className="text-sm text-blox-text-primary">
                          {message.content}
                        </p>
                        
                        {/* Video Reference */}
                        {message.videoReference && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-3 p-2.5 bg-blox-darkblue2/50 rounded-lg border border-blox-teal/30"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <PlayCircle className="w-4 h-4 text-blox-teal" />
                              <span className="text-xs font-semibold text-blox-teal">
                                Found in video:
                              </span>
                            </div>
                            <p className="text-xs text-blox-text-secondary">
                              {message.videoReference.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-blox-text-muted" />
                              <span className="text-xs text-blox-text-muted">
                                at {message.videoReference.timestamp}
                              </span>
                              <button className="ml-auto text-xs text-blox-teal hover:text-blox-success transition-colors">
                                Jump to →
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Timestamp */}
                      {message.timestamp && (
                        <p className="text-xs text-blox-text-muted mt-1 px-1">
                          {message.timestamp}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blox-teal to-blox-success rounded-lg flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 bg-blox-darkblue/50 border border-blox-glass-border rounded-xl">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-blox-teal rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blox-teal rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blox-teal rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-3 border-t border-blox-glass-border bg-blox-darkblue2/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3 text-blox-text-muted" />
                <span className="text-xs text-blox-text-muted">Suggested questions:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="flex-shrink-0 px-3 py-1.5 bg-blox-darkblue/50 hover:bg-blox-darkblue/70 border border-blox-glass-border hover:border-blox-teal/30 rounded-full text-xs text-blox-text-secondary hover:text-blox-teal transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-blox-glass-border bg-blox-darkblue2/50">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything! I've got your back 🎮"
                    className="w-full px-4 py-2.5 bg-blox-darkblue/50 border border-blox-glass-border rounded-lg text-sm text-blox-text-primary placeholder-blox-text-muted focus:outline-none focus:border-blox-teal transition-colors pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blox-text-muted" />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2.5 bg-gradient-to-r from-blox-teal to-blox-success text-white rounded-lg font-medium hover:shadow-glow-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-blox-text-muted">Blox Buddy Active 🚀</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-blox-text-muted">Video Knowledge: LOADED</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}