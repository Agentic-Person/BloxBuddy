# 🏗️ Blox Buddy - Clean Project Structure

## 📁 Directory Overview

```
blox-buddy/
├── 🎮 landing/                    # 3D Interactive Landing Page (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/               # ⭐ 3D Chicken Coop Building Game
│   │   │   │   ├── Scene3D.tsx          # Main 3D scene with Three.js
│   │   │   │   ├── PlacementSystem.tsx  # Drag & drop logic
│   │   │   │   ├── ObjectPalette.tsx    # Building tools UI
│   │   │   │   ├── GrassPlatform.tsx    # Game platform
│   │   │   │   └── objects/
│   │   │   │       ├── FenceComponent.tsx    # Smart fence connections
│   │   │   │       ├── GateComponent.tsx     # Interactive gates
│   │   │   │       └── BuildingObjects.tsx  # Houses, trees, etc.
│   │   │   ├── Hero3D.tsx        # 3D game integration in hero
│   │   │   ├── Hero.jsx          # Fallback 2D hero
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── WhatIsBloxBuddy.jsx
│   │   │   └── FloatingAIAssistant.jsx
│   │   ├── store/
│   │   │   └── gameStore.ts      # Zustand game state management
│   │   ├── utils/
│   │   │   └── animations.js     # Framer Motion helpers
│   │   ├── App.tsx               # Main app with 3D hero toggle
│   │   ├── index.tsx
│   │   └── index.css
│   ├── public/                   # Static assets & images
│   ├── package.json             # React + Three.js dependencies
│   └── tailwind.config.js       # Styling configuration
├── 🚀 app/                       # Next.js Dashboard Application
│   ├── app/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   └── AIAssistant.tsx       # Interactive learning AI
│   │   │   ├── layout/
│   │   │   │   └── Sidebar.tsx           # Navigation sidebar
│   │   │   └── learning/
│   │   │       └── WeekOverview.tsx      # Learning progress
│   │   ├── learning/
│   │   │   ├── page.tsx                  # Learning hub
│   │   │   └── module/[moduleId]/
│   │   │       └── page.tsx              # Individual modules
│   │   └── page.tsx             # Dashboard home
│   ├── lib/
│   │   └── curriculum/
│   │       └── curriculum-data.ts        # Learning content data
│   ├── package.json             # Next.js + Supabase dependencies
│   └── tailwind.config.js       # Dashboard styling
├── 📚 docs/                     # Project Documentation
│   ├── Blox Buddy - Product Requirements Document v2.md
│   ├── Blox Buddy App Architecture Design Document.md
│   └── [other documentation files]
├── 🗄️ supabase/                # Database Configuration
│   └── migrations/
│       └── 001_initial_schema.sql
├── 📝 CLAUDE.md                 # AI Assistant Instructions
├── 📝 PROJECT_STRUCTURE.md      # This file
├── 📝 README.md                 # Main project README
├── 🔧 package.json             # Workspace configuration
└── ☁️ vercel.json              # Deployment configuration
```

## 🎯 Key Features

### 🎮 3D Interactive Landing Page (`/landing/`)
- **React Three Fiber** 3D engine
- **Interactive chicken coop building game** with 8 objects
- **Drag & drop** with snap-to-grid placement
- **Smart fence connection system**
- **Keyboard controls** (R=rotate, D=delete, Escape=exit)
- **Zustand state management** for game logic
- **Framer Motion animations** throughout
- **Professional UI integration** in hero section

### 🚀 Dashboard Application (`/app/`)
- **Next.js 14** with App Router
- **AI-powered learning assistant** with video knowledge
- **Interactive curriculum** with progress tracking
- **Sidebar navigation** with achievements and stats
- **Module-based learning** system
- **Supabase integration** (ready for implementation)

## 🛠️ Development Commands

### Root Level (Workspace)
```bash
# Install all dependencies
npm run install:all

# Start landing page (3D game)
npm run dev:landing        # → http://localhost:3000

# Start dashboard app
npm run dev:app           # → http://localhost:3000 (Next.js)

# Build everything for production
npm run build
```

### Individual Projects
```bash
# Landing page (3D game)
cd landing
npm start                 # Development server
npm run build            # Production build

# Dashboard app
cd app  
npm run dev              # Development server
npm run build            # Production build
```

## 🎨 Design System

Both projects share the same **Blox Buddy design system**:
- **Dark blue professional palette** (#001c38, #001d39, #002246)
- **Purple gradients** for visual depth (#2D1B69, #4C2E83, #6B46C1)
- **Teal accent colors** (#36b0d9) for CTAs and interactions
- **Glass morphism effects** with subtle transparency
- **Consistent typography** and spacing scales

## 🚀 Deployment

### Vercel Configuration
- **Landing page** (`/`) → Static React build
- **Dashboard app** (`/app/*`) → Next.js serverless functions
- **Automatic deployments** from Git pushes
- **Environment variables** configured in Vercel dashboard

### Environment Variables Needed
```bash
# Supabase (for app/)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# YouTube API (for video integration)
YOUTUBE_API_KEY=your_youtube_api_key

# Discord (for community features)
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
```

## 🔄 Workflow

1. **Primary Landing Page**: Users arrive at `/` (3D game landing page)
2. **Engagement**: Interactive 3D chicken coop building game
3. **Conversion**: Call-to-action buttons lead to dashboard
4. **Learning**: Full curriculum in `/app/learning`
5. **Community**: Team formation and progress tracking

## 🎯 Current Status

✅ **Landing Page** - Fully functional with 3D game  
✅ **3D Game** - Complete interactive building system  
✅ **Dashboard UI** - Professional components ready  
✅ **Design System** - Consistent across both apps  
🚧 **Backend Integration** - Supabase ready for connection  
🚧 **Authentication** - Discord OAuth components ready  
🚧 **Payments** - Stripe integration planned  

## 📞 Quick Start

1. **Clone and install**:
   ```bash
   git clone [repo-url]
   cd blox-buddy
   npm run install:all
   ```

2. **Start development**:
   ```bash
   # Terminal 1: Landing page with 3D game
   npm run dev:landing
   
   # Terminal 2: Dashboard app  
   npm run dev:app
   ```

3. **View your 3D game**: http://localhost:3000
4. **View dashboard**: http://localhost:3000 (when running app)

## 🎮 3D Game Controls

- **Click** objects in palette to select
- **Click** on green platform to place
- **R key** to rotate objects
- **D key** for delete mode
- **Escape** to exit modes
- **Mouse hover** for visual feedback

---

*Last updated: August 2025 by Claude Code AI Assistant*