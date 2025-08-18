# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blox Buddy is a free learning and community platform for young Roblox developers (ages 10-25) that provides:
- Structured 6-month learning journey through curated YouTube content
- Team formation and collaboration features
- Discord community integration
- Progress tracking and gamification

This is Phase 1 of a two-part ecosystem, with Phase 2 being "Roblox Code Buddy" for advanced scripting.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Framer Motion for animations
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **Authentication**: Supabase Auth with Discord OAuth
- **State Management**: Zustand
- **Video Integration**: YouTube iframe API
- **Automation**: n8n for content health checks and Discord bot
- **Deployment**: Vercel

## Project Structure

Since this is a greenfield project, the implementation will follow this structure:

```
blox-buddy/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── learning/         # Learning/video components
│   ├── teams/            # Team management components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client setup
│   ├── youtube/          # YouTube API integration
│   └── discord/          # Discord webhook handlers
├── store/                 # Zustand state stores
├── types/                 # TypeScript type definitions
└── supabase/             # Database migrations
```

## Development Commands

### Initial Setup
```bash
# Create Next.js project
npx create-next-app@latest blox-buddy --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
npm install framer-motion react-hot-toast zustand
npm install react-youtube @types/react-youtube
npm install lucide-react

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start
```

## Core Features to Implement

### 1. Landing Page
- Hero section with animations
- Feature highlights
- Learning path preview
- Discord community CTA
- Responsive design with mobile-first approach

### 2. Authentication System
- Discord OAuth primary login
- User profile creation and management
- Age range collection for safety
- Parent email for users under 13
- Onboarding flow

### 3. Learning Management System
- YouTube video player with progress tracking
- Curriculum navigation (6-month structure)
- Module and week-based organization
- Progress persistence
- Achievement system

### 4. Team Formation Hub
- Team discovery with skill filtering
- Team creation wizard
- Member management
- Discord channel auto-creation via n8n
- Team project tracking

### 5. Community Features
- Project showcase gallery
- Skill exchange system
- Discord integration
- Weekly events calendar

## Database Schema Overview

Key tables to implement in Supabase:
- `users` - User profiles with Discord integration
- `learning_progress` - Video completion tracking
- `content_items` - Curated YouTube content library
- `teams` - Team information
- `team_members` - Team membership and roles
- `projects` - Individual and team projects
- `content_health_logs` - Content availability monitoring

## API Endpoints Pattern

```typescript
// Standard API route structure
GET    /api/curriculum/:module     # Get module content
POST   /api/progress/complete      # Mark content complete
GET    /api/teams/recruiting       # Get recruiting teams
POST   /api/teams/create          # Create new team
POST   /api/webhooks/discord      # Discord bot webhooks
POST   /api/webhooks/n8n          # n8n automation webhooks
```

## Key Implementation Priorities

1. **MVP Features (Week 1)**
   - Landing page with core messaging
   - Discord OAuth authentication
   - Basic learning progress tracking
   - YouTube video embedding
   - Simple team listing

2. **Enhancement Features (Week 2)**
   - Complete curriculum navigation
   - Team formation flow
   - Discord bot integration
   - Progress analytics
   - Mobile optimization

## Integration Points

### YouTube API
- Use YouTube iframe API for video embedding
- Track watch time and completion
- Handle video availability checks

### Discord Integration
- OAuth for authentication
- Webhook for team channel creation
- Bot commands for progress checking
- Community event notifications

### n8n Automation Workflows
- Weekly content health checks
- Discord channel creation
- Analytics aggregation
- Email notifications (optional)

## Code Buddy Future Integration

This project shares database infrastructure with the future Code Buddy application:
- Shared user authentication
- Unified progress tracking
- Team persistence across platforms
- Portfolio continuity

## Security Considerations

- Use environment variables for all secrets
- Implement Row Level Security (RLS) in Supabase
- Validate all user inputs
- Use HTTPS for all external APIs
- Implement rate limiting on API routes
- Parent consent flow for users under 13

## Performance Optimization

- Use Next.js Image component for all images
- Implement lazy loading for video content
- Use Suspense boundaries for async components
- Cache YouTube API responses
- Optimize Supabase queries with proper indexes

## Testing Strategy

Focus testing on:
- Authentication flow
- Progress tracking accuracy
- Team formation logic
- API route validation
- Mobile responsiveness

## Deployment Configuration

- Use Vercel for hosting
- Set up environment variables in Vercel dashboard
- Configure custom domain
- Set up monitoring with Vercel Analytics
- Implement error tracking (Sentry optional)

## Content Management

The platform uses curated YouTube content organized by:
- **Modules**: Major learning topics
- **Weeks**: Time-based progression (1-24)
- **Learning Objectives**: Clear outcomes per video
- **Prerequisites**: Required knowledge

Content must be regularly audited for availability and relevance.

## Development Workflow Tips

1. Start with the landing page to establish design system
2. Implement auth early to test Discord OAuth
3. Build video player component with mock data first
4. Add Supabase integration incrementally
5. Test on mobile devices throughout development
6. Use TypeScript strictly for better code quality
7. Keep components small and focused
8. Document API routes as you build them