'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Users, Trophy, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blox-darkblue2 via-blox-darkblue to-blox-purple-deep">
      <div className="container mx-auto px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-blox-text-primary mb-6">
            Welcome to <span className="text-gradient-teal">Blox Buddy</span>
          </h1>
          <p className="text-xl text-blox-text-secondary max-w-3xl mx-auto mb-8">
            Master Roblox development through our structured 6-month learning journey. 
            Build real games, learn from YouTube experts, and join a thriving community.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/learning"
              className="px-8 py-4 bg-gradient-to-r from-blox-teal to-blox-success text-white text-lg font-semibold rounded-xl hover:shadow-glow-teal transition-all flex items-center gap-2"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/teams"
              className="px-8 py-4 glass-dark border border-blox-glass-border text-blox-text-primary text-lg font-semibold rounded-xl hover:bg-blox-darkblue2/50 transition-all"
            >
              Find Teams
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="glass-dark rounded-xl p-6 border border-blox-glass-border text-center">
            <BookOpen className="w-12 h-12 text-blox-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blox-text-primary mb-3">
              Structured Learning
            </h3>
            <p className="text-blox-text-muted">
              Follow our carefully crafted 6-month curriculum with 95+ curated YouTube videos
            </p>
          </div>
          
          <div className="glass-dark rounded-xl p-6 border border-blox-glass-border text-center">
            <Users className="w-12 h-12 text-blox-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blox-text-primary mb-3">
              Team Building
            </h3>
            <p className="text-blox-text-muted">
              Connect with other developers and build amazing projects together
            </p>
          </div>
          
          <div className="glass-dark rounded-xl p-6 border border-blox-glass-border text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blox-text-primary mb-3">
              Achievements
            </h3>
            <p className="text-blox-text-muted">
              Earn XP, unlock certificates, and showcase your growing skills
            </p>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-blox-text-primary mb-8">
            Quick Access
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/learning/module/1"
              className="px-6 py-3 bg-blox-darkblue2/50 border border-blox-glass-border text-blox-text-secondary rounded-lg hover:bg-blox-darkblue2/70 transition-all"
            >
              Module 1: Modern Foundations
            </Link>
            <Link
              href="/learning/module/2"
              className="px-6 py-3 bg-blox-darkblue2/50 border border-blox-glass-border text-blox-text-secondary rounded-lg hover:bg-blox-darkblue2/70 transition-all"
            >
              Module 2: Texturing & Materials
            </Link>
            <Link
              href="/learning/module/3"
              className="px-6 py-3 bg-blox-darkblue2/50 border border-blox-glass-border text-blox-text-secondary rounded-lg hover:bg-blox-darkblue2/70 transition-all"
            >
              Module 3: Modern Scripting
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}