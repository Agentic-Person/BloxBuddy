# Blox Buddy - Architectural Design & Technical Implementation Document
## For Solo Development with Claude Code

**Document Version:** 2.0  
**Date:** August 18, 2025  
**Developer:** Solo Developer  
**Tech Stack:** Next.js 14, React 19, Tailwind CSS, Supabase, n8n  
**Development Tool:** Claude Code  
**Status:** 30% Implemented - Foundation Complete

---

## 1. Executive Technical Summary

This document provides a complete technical blueprint for building Blox Buddy as a solo developer using Claude Code. The architecture has been updated to reflect the improved monorepo structure with separate landing page and application, prioritizing maintainability, scalability, and clear separation of concerns.

### Key Technical Decisions (UPDATED)
- **Monorepo Structure** with separate `/landing` (React) and `/app` (Next.js 14)
- **Subdomain Strategy** for deployment (bloxbuddy.com vs app.bloxbuddy.com)
- **Shared Design System** in `/shared` directory for consistency
- **Next.js 14 App Router** for the application
- **React 19** for the landing page
- **Tailwind CSS** with shared configuration
- **Supabase** for backend-as-a-service (auth, database, real-time, storage)
- **n8n** for automation workflows and content health monitoring
- **Vercel** for deployment with automatic CI/CD

## 2. System Architecture Overview (UPDATED)

```
┌─────────────────────────────────────────────────────────────┐
│                     Monorepo Structure                        │
├─────────────────────────────────────────────────────────────┤
│  Landing (React)  │  App (Next.js 14)  │  Shared Resources  │
│  bloxbuddy.com   │  app.bloxbuddy.com │  Components/Styles  │
├─────────────────────────────────────────────────────────────┤
│                    API Routes (Next.js)                       │
├─────────────────────────────────────────────────────────────┤
│                      Supabase Client                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Backend                         │
├─────────────────────────────────────────────────────────────┤
│   Auth   │   Database   │   Storage   │   Real-time         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     n8n Automation Layer                      │
├─────────────────────────────────────────────────────────────┤
│ Content Health │ Discord Bot │ Analytics │ Email Workflows  │
└─────────────────────────────────────────────────────────────┘
```

## 3. Current Implementation Status

### ✅ Completed (30%)
- Monorepo structure established
- Landing page with animations (React 19)
- Application dashboard UI (Next.js 14)
- Shared Tailwind configuration
- Shared component library started (AnimatedCTAButton)
- Glass morphism design system
- Framer Motion animations
- Development environment configured

### 🚧 In Progress
- Supabase project setup
- Authentication flow implementation
- User profile management

### 📋 Pending (70%)
- Discord OAuth integration
- YouTube video player
- Progress tracking system
- Team formation features
- n8n automation workflows
- Stripe payment integration
- Production deployment

## 4. Project Structure (UPDATED - CURRENT)

```
blox-buddy/
├── landing/                    # Marketing/Landing Page (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── WhatIsBloxBuddy.jsx
│   │   │   ├── CTASection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FloatingAIAssistant.jsx
│   │   │   └── SmoothScrollProvider.jsx
│   │   ├── utils/
│   │   │   └── animations.js
│   │   ├── App.tsx
│   │   └── index.css
│   ├── public/
│   │   ├── BuildersRoundTable.png
│   │   ├── jimiHacksBloxBuddy.png
│   │   └── blocks_buddy_*.png
│   ├── package.json
│   └── tailwind.config.js
│
├── app/                        # Interactive Application (Next.js 14)
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── learn/
│   │   │   │   ├── [module]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── teams/
│   │   │   │   ├── [teamId]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── callback/
│   │   │   │       └── route.ts
│   │   │   ├── progress/
│   │   │   │   └── route.ts
│   │   │   ├── teams/
│   │   │   │   └── route.ts
│   │   │   └── webhooks/
│   │   │       ├── discord/
│   │   │       │   └── route.ts
│   │   │       └── n8n/
│   │   │           └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx (dashboard)
│   │   └── globals.css
│   ├── components/
│   │   ├── auth/
│   │   ├── learning/
│   │   ├── teams/
│   │   └── ui/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── youtube/
│   │   └── discord/
│   ├── public/
│   ├── package.json
│   └── tailwind.config.ts
│
├── shared/                     # Shared Resources (NEW)
│   ├── components/
│   │   └── AnimatedCTAButton.jsx
│   ├── styles/
│   │   └── tailwind.config.shared.js
│   ├── hooks/
│   │   └── useAnimations.js
│   └── types/
│       └── database.ts
│
├── supabase/                   # Database Configuration
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_teams_tables.sql
│   │   └── 003_content_tables.sql
│   └── seed.sql
│
├── docs/                       # Documentation
│   ├── Blox Buddy App Architecture Design Document.md
│   ├── Blox Buddy - Product Requirements Document v2.md
│   └── (this document)
│
├── tasks/                      # Task Tracking
│   └── *.md
│
├── n8n/                        # Automation Workflows
│   ├── workflows/
│   └── README.md
│
└── README.md                   # Project Overview
```

## 5. Development Environment Setup (UPDATED)

### 5.1 Current Setup Script
```bash
#!/bin/bash
echo "🚀 Setting up Blox Buddy Development Environment"

# The project has been restructured as follows:
# 1. Landing page moved to /landing (React + Tailwind)
# 2. Application created in /app (Next.js 14)
# 3. Shared components in /shared

# Landing Page (Already Complete)
cd landing
npm install
# Runs on port 3001

# Application (Already Created)
cd ../app
npm install
# Dependencies already installed:
# - @supabase/supabase-js
# - @supabase/ssr
# - framer-motion
# - lucide-react
# - zustand
# Runs on port 3000

# Shared configuration is in /shared/styles/tailwind.config.shared.js
```

### 5.2 Environment Variables Configuration
```bash
# app/.env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_secret
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
N8N_WEBHOOK_URL=your_n8n_webhook_url
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 6. Shared Design System (IMPLEMENTED)

### 6.1 Shared Tailwind Configuration
Located in `/shared/styles/tailwind.config.shared.js`:

```javascript
// Color Palette (Currently Active)
colors: {
  'blox': {
    blackblue: '#001c38',
    darkblue: '#001d39',
    darkblue2: '#002246',
    purple: {
      deep: '#2D1B69',
      dark: '#4C2E83',
      DEFAULT: '#6B46C1',
    },
    teal: '#36b0d9',
    text: {
      primary: '#FFFFFF',
      secondary: '#DDDDDD',
      muted: '#9ab6e0',
      body: '#596d8c',
    },
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    glass: {
      white: 'rgba(255, 255, 255, 0.08)',
      light: 'rgba(255, 255, 255, 0.04)',
      border: 'rgba(54, 176, 217, 0.2)',
    }
  }
}
```

### 6.2 Shared Components
- `AnimatedCTAButton` - Sparkle-animated buttons (IMPLEMENTED)
- `FloatingAIAssistant` - AI chat interface (READY FOR N8N)
- Glass morphism cards (IMPLEMENTED)
- Animation hooks in `/shared/hooks/useAnimations.js` (IMPLEMENTED)

## 7. Current Dashboard Implementation

The application dashboard (`/app/app/page.tsx`) currently includes:
- Glass morphism navigation header
- Welcome section with user greeting
- Stats grid (Videos Watched, Achievements, Team Members, Progress)
- Current Module display with progress bar
- Quick Actions panel
- Consistent dark blue/purple gradient background
- Framer Motion animations throughout

## 8. Database Implementation (PENDING)

### 8.1 Supabase Setup Script (TO BE EXECUTED)
```sql
-- Run this in Supabase SQL Editor
-- File: supabase/migrations/001_initial_schema.sql

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Core users table (shared with Code Buddy)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  discord_id TEXT UNIQUE,
  discord_username TEXT,
  avatar_url TEXT,
  age_range TEXT CHECK (age_range IN ('10-12', '13-15', '16-18', '19-25', '25+')),
  parent_email TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  code_buddy_eligible BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create RLS policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- Learning progress table
CREATE TABLE public.learning_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  module_name TEXT NOT NULL,
  week_number INT,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INT DEFAULT 0,
  notes TEXT,
  UNIQUE(user_id, content_id)
);

-- Teams table
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_name TEXT NOT NULL,
  team_slug TEXT UNIQUE NOT NULL,
  description TEXT,
  skill_needs TEXT[],
  max_members INT DEFAULT 5,
  is_recruiting BOOLEAN DEFAULT true,
  discord_channel_id TEXT,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members table
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('leader', 'member', 'moderator')),
  is_active BOOLEAN DEFAULT true,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Content items table
CREATE TABLE public.content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  youtube_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  module_name TEXT NOT NULL,
  week_number INT,
  duration_seconds INT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content health logs
CREATE TABLE public.content_health_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES public.content_items(id),
  is_available BOOLEAN,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  error_message TEXT
);

-- Create indexes for performance
CREATE INDEX idx_users_discord_id ON public.users(discord_id);
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_progress_user_id ON public.learning_progress(user_id);
CREATE INDEX idx_progress_module ON public.learning_progress(module_name, week_number);
CREATE INDEX idx_teams_recruiting ON public.teams(is_recruiting);
CREATE INDEX idx_team_members_user ON public.team_members(user_id);
```

## 9. Implementation Roadmap (UPDATED)

### Phase 1: Foundation ✅ COMPLETE
- ✅ Monorepo structure with /landing and /app
- ✅ Shared design system configuration
- ✅ Landing page with animations
- ✅ Dashboard UI with glass morphism
- ✅ Development environment setup

### Phase 2: Authentication & Database (CURRENT)
- [ ] Create Supabase project
- [ ] Execute database migrations
- [ ] Implement Discord OAuth
- [ ] User profile management
- [ ] Protected routes middleware
- [ ] Session management across subdomains

### Phase 3: Core Learning Features
- [ ] YouTube video player component
- [ ] Progress tracking system
- [ ] Curriculum navigation
- [ ] Achievement badges
- [ ] Learning analytics dashboard

### Phase 4: Team Collaboration
- [ ] Team creation wizard
- [ ] Team discovery with filters
- [ ] Member management
- [ ] Discord channel integration via n8n
- [ ] Real-time team chat

### Phase 5: Automation & Payments
- [ ] n8n workflow setup
- [ ] Content health monitoring
- [ ] Discord bot integration
- [ ] Stripe payment processing
- [ ] Subscription management

### Phase 6: Production Deployment
- [ ] Vercel configuration
- [ ] Subdomain routing (bloxbuddy.com, app.bloxbuddy.com)
- [ ] Environment variables
- [ ] CI/CD pipeline
- [ ] Monitoring and analytics

## 10. Next Implementation Steps

### Immediate Tasks (Today)
1. **Set up Supabase Project**
   ```bash
   # 1. Go to supabase.com and create new project
   # 2. Copy project URL and anon key to .env.local
   # 3. Run migrations from Section 8.1
   ```

2. **Implement Supabase Client**
   ```typescript
   // app/lib/supabase/client.ts
   import { createBrowserClient } from '@supabase/ssr'
   
   export function createClient() {
     return createBrowserClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
     )
   }
   ```

3. **Add Discord OAuth**
   - Configure Discord OAuth in Supabase dashboard
   - Create login page with Discord button
   - Implement auth callback route

## 11. Deployment Configuration (UPDATED)

### 11.1 Vercel Deployment Strategy
```json
// vercel.json (root level)
{
  "projects": [
    {
      "name": "blox-buddy-landing",
      "root": "landing",
      "domains": ["bloxbuddy.com", "www.bloxbuddy.com"],
      "framework": "create-react-app"
    },
    {
      "name": "blox-buddy-app",
      "root": "app",
      "domains": ["app.bloxbuddy.com"],
      "framework": "nextjs"
    }
  ]
}
```

### 11.2 Shared Environment Variables
Both projects will share certain environment variables:
- Supabase credentials
- Discord OAuth settings
- n8n webhook URLs

## 12. Component Implementation Guide

### 12.1 Video Player Component (NEXT TO BUILD)
Location: `app/components/learning/VideoPlayer.tsx`
```typescript
// Implementation details in original document Section 6.1
// Will integrate with YouTube API
// Progress tracking to Supabase
// Real-time sync across devices
```

### 12.2 Team Formation Component (PENDING)
Location: `app/components/teams/TeamFinder.tsx`
```typescript
// Implementation details in original document Section 6.2
// Skill-based matching
// Discord integration
// Real-time updates
```

## 13. API Routes Structure

All API routes will be in `/app/app/api/`:
- `/auth/callback` - Discord OAuth callback
- `/progress` - Learning progress tracking
- `/teams` - Team management
- `/webhooks/discord` - Discord bot webhooks
- `/webhooks/n8n` - n8n automation webhooks
- `/webhooks/stripe` - Payment webhooks

## 14. State Management Strategy

Using Zustand for client-side state:
- `authStore` - User authentication state
- `progressStore` - Learning progress
- `teamStore` - Team management
- `uiStore` - UI preferences and settings

## 15. Security Considerations

### 15.1 Authentication Flow
- Discord OAuth primary
- Supabase RLS for data protection
- JWT tokens for session management
- Subdomain cookie sharing

### 15.2 COPPA Compliance
- Age verification during onboarding
- Parent email collection for users under 13
- Restricted features for younger users
- Data retention policies

## 16. Performance Optimizations

### 16.1 Current Optimizations
- ✅ Lazy loading with Next.js dynamic imports
- ✅ Optimized images in public folders
- ✅ Tailwind CSS purging unused styles
- ✅ Framer Motion reduced motion support

### 16.2 Planned Optimizations
- [ ] Service worker for offline support
- [ ] Redis caching for frequently accessed data
- [ ] CDN for static assets
- [ ] Database query optimization

## 17. Testing Strategy

### 17.1 Unit Testing
- Components with React Testing Library
- API routes with Jest
- Zustand stores testing

### 17.2 E2E Testing
- Authentication flow
- Learning path completion
- Team formation process
- Payment processing

## 18. Monitoring & Analytics

### 18.1 Application Monitoring
- Vercel Analytics for performance
- Sentry for error tracking
- Custom analytics events

### 18.2 User Analytics
- Progress tracking metrics
- Engagement analytics
- Team collaboration metrics
- Content performance

## 19. Code Buddy Integration Points

### 19.1 Shared Infrastructure
- Same Supabase project
- Shared user authentication
- Progress data migration
- Team persistence

### 19.2 Eligibility System
- Track module completion
- Unlock Code Buddy features
- Seamless transition between platforms

## 20. Development Commands Reference

### Current Working Commands
```bash
# Landing Page (React)
cd landing
npm start  # Runs on http://localhost:3001

# Application (Next.js)
cd app
npm run dev  # Runs on http://localhost:3000

# Both are currently running and accessible
```

### Upcoming Commands
```bash
# Database migrations
npx supabase db push

# n8n workflows
n8n start

# Testing
npm test
npm run test:e2e

# Production build
npm run build
npm run start
```

---

## Conclusion (UPDATED)

This technical implementation document reflects the current state of Blox Buddy development with the improved monorepo architecture. We have successfully completed the foundation (30%) with proper separation between landing page and application, shared design system, and consistent visual language.

### Key Improvements Made:
1. **Better Architecture**: Monorepo with clear separation
2. **Subdomain Ready**: Separate apps for different domains
3. **Shared Resources**: Centralized design system
4. **Scalability**: Easy to maintain and extend

### Next Critical Steps:
1. Set up Supabase project and run migrations
2. Implement Discord OAuth authentication
3. Build core learning components
4. Configure n8n automation
5. Deploy to Vercel with subdomains

### Success Metrics:
- 30% Complete: Foundation and structure ✅
- 50% Target: Authentication and database
- 75% Target: Core features working
- 100% Target: Deployed and operational

The architecture now supports rapid feature development while maintaining code quality and scalability for future Code Buddy integration.

**Last Updated:** August 18, 2025  
**Status:** Active Development - Foundation Complete