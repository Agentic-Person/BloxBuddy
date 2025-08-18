# Blox Buddy App Architecture Design Document

## Executive Summary

This document outlines the comprehensive architecture for the Blox Buddy interactive application, which will serve as the primary learning platform for young Roblox developers. The app will be separate from but visually consistent with the marketing landing page, utilizing a subdomain strategy for clear separation of concerns.

## Architecture Overview

### Deployment Strategy: Subdomain Approach (Option 1)

- **Landing Page**: `bloxbuddy.com` - Marketing, signup, and product information
- **Application**: `app.bloxbuddy.com` - Interactive learning platform and dashboard
- **API Endpoints**: `api.bloxbuddy.com` - Backend services and integrations

### Core Architecture Principles

1. **Browser-Based Application**: No installation required, accessible via web browser
2. **Shared Design System**: Consistent visual language across landing and app
3. **Monorepo Structure**: Single repository for easier management and deployment
4. **Progressive Enhancement**: Core features work everywhere, enhanced features for modern browsers

## Project Structure

```
blox-buddy/
├── landing/                 # Marketing/landing page
│   ├── components/         # Landing-specific components
│   ├── pages/             # Landing page routes
│   └── public/            # Landing assets
│
├── app/                    # Interactive application
│   ├── components/        # App-specific components
│   ├── pages/            # App routes
│   ├── features/         # Feature modules
│   │   ├── auth/        # Authentication
│   │   ├── learning/    # Learning management
│   │   ├── teams/       # Team collaboration
│   │   └── dashboard/   # User dashboard
│   └── api/             # API routes
│
├── shared/                # Shared resources
│   ├── components/       # Reusable UI components
│   ├── styles/          # Tailwind config & global styles
│   ├── utils/           # Shared utilities
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript definitions
│
├── supabase/             # Database configuration
│   ├── migrations/      # Database migrations
│   ├── functions/       # Edge functions
│   └── schemas/         # Type definitions
│
├── docs/                 # Documentation
└── public/              # Shared public assets
```

## Technology Stack

### Frontend Framework
- **Next.js 14** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Backend & Database
- **Supabase**
  - PostgreSQL database
  - Authentication (Discord OAuth primary)
  - Real-time subscriptions
  - Storage for user uploads
  - Row Level Security (RLS)

### Payment Processing
- **Stripe**
  - Subscription management (Free, Pro, Team tiers)
  - One-time purchases for premium content
  - Webhook handling for payment events
  - Customer portal for subscription management

### Automation & Integrations
- **n8n Workflows**
  - Content health monitoring
  - Discord bot integration
  - Team channel creation
  - Analytics aggregation
  - Email notifications

### External APIs
- **YouTube Data API** for video content
- **Discord API** for community integration
- **GitHub API** for code repository features

## Shared Design System

### Visual Consistency
Maintain the established design language from the landing page:

```javascript
// Shared Tailwind Configuration
colors: {
  'blox': {
    // Dark blue professional palette
    blackblue: '#001c38',
    darkblue: '#001d39',
    darkblue2: '#002246',
    
    // Purple gradient colors
    purple: {
      deep: '#2D1B69',
      dark: '#4C2E83',
      DEFAULT: '#6B46C1',
    },
    
    // Primary accent
    teal: '#36b0d9',
    
    // Text hierarchy
    text: {
      primary: '#FFFFFF',
      secondary: '#DDDDDD',
      muted: '#9ab6e0',
    }
  }
}

// Background Gradients
backgroundImage: {
  'blox-gradient': 'linear-gradient(135deg, #2D1B69 0%, #001d39 100%)',
}
```

### Component Library
- Glass morphism effects for cards and panels
- Animated CTA buttons with sparkle effects
- Smooth scroll navigation
- Floating AI assistant interface
- Responsive grid layouts (40-20-40 pattern)

### Animation System
- Consistent Framer Motion variants
- Reduced motion support
- Spring physics for natural feel
- Stagger animations for lists
- Parallax effects for depth

## Feature Architecture

### 1. Authentication System
```
- Discord OAuth (primary)
- Email/password (secondary)
- Multi-factor authentication
- Session management across subdomains
- Role-based access control (Student, Parent, Educator, Admin)
```

### 2. Learning Management System (LMS)
```
- 6-month structured curriculum
- YouTube video integration with progress tracking
- Module and week-based organization
- Achievement and badge system
- Progress persistence and analytics
- Offline progress caching
```

### 3. Team Formation Hub
```
- Team discovery with skill-based matching
- Real-time collaboration features
- Project management tools
- Discord channel integration
- Team analytics and progress tracking
```

### 4. Dashboard Architecture
```
- Personalized learning path
- Progress visualization
- Team activity feed
- Upcoming events calendar
- Resource library access
```

### 5. Community Features
```
- Project showcase gallery
- Skill exchange marketplace
- Discord integration panel
- Live event streaming
- Forum/discussion boards
```

## Database Schema Design

### Core Tables
```sql
-- Users and Authentication
users
profiles
user_roles
parent_consent

-- Learning Progress
learning_paths
content_items
user_progress
achievements
certificates

-- Teams and Collaboration
teams
team_members
team_projects
team_invitations

-- Community
projects
project_comments
skills
skill_exchanges

-- Content Management
youtube_videos
content_health_logs
curriculum_modules
```

## Integration Architecture

### Supabase Authentication Flow
1. User visits landing page
2. Clicks "Get Started" → Redirects to app.bloxbuddy.com
3. Discord OAuth flow initiated
4. Profile creation/update
5. Session established across subdomains

### Payment Integration Flow
1. User selects plan on landing page
2. Stripe Checkout session created
3. Payment processed
4. Webhook updates user subscription in Supabase
5. Access granted in application

### Real-time Features
- Team chat and notifications
- Live progress updates
- Collaborative project editing
- Discord presence integration

## Deployment Configuration

### Environment Variables
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Discord
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_BOT_TOKEN=

# n8n
N8N_WEBHOOK_URL=

# YouTube
YOUTUBE_API_KEY=
```

### Vercel Deployment
```json
{
  "projects": [
    {
      "name": "blox-buddy-landing",
      "root": "landing",
      "domains": ["bloxbuddy.com", "www.bloxbuddy.com"]
    },
    {
      "name": "blox-buddy-app",
      "root": "app",
      "domains": ["app.bloxbuddy.com"]
    }
  ]
}
```

## Security Considerations

### Authentication & Authorization
- JWT tokens with refresh mechanism
- Row Level Security (RLS) in Supabase
- API rate limiting
- CORS configuration for subdomain access

### Data Protection
- HTTPS everywhere
- Encrypted sensitive data
- GDPR compliance
- COPPA compliance for users under 13
- Parent consent workflow

### Content Security
- YouTube content validation
- User-generated content moderation
- Safe search enforcement
- Age-appropriate content filtering

## Performance Optimization

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization with Next.js Image
- Static generation where possible
- Edge caching with Vercel
- Service worker for offline features

### Database Optimization
- Proper indexing strategies
- Query optimization
- Connection pooling
- Caching with Redis (future)

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Set up monorepo structure
- [ ] Configure shared Tailwind and components
- [ ] Implement Supabase authentication
- [ ] Create basic dashboard layout

### Phase 2: Core Features (Week 2)
- [ ] Learning path UI
- [ ] YouTube video player integration
- [ ] Progress tracking system
- [ ] Basic team creation

### Phase 3: Integrations (Week 3)
- [ ] Stripe payment processing
- [ ] Discord bot setup
- [ ] n8n workflow configuration
- [ ] Email notifications

### Phase 4: Polish & Launch (Week 4)
- [ ] Performance optimization
- [ ] Security audit
- [ ] User testing
- [ ] Production deployment

## Future Considerations

### Code Buddy Integration
- Shared authentication system
- Unified progress tracking
- Cross-platform team persistence
- Integrated portfolio system

### Scalability Planning
- Microservices architecture (future)
- CDN implementation
- Database sharding strategy
- Horizontal scaling preparation

### Mobile Application
- React Native implementation
- Shared business logic
- Offline-first architecture
- Push notifications

## Success Metrics

### Technical KPIs
- Page load time < 2 seconds
- 99.9% uptime
- API response time < 200ms
- Real-time latency < 100ms

### User Experience KPIs
- User retention rate > 60%
- Course completion rate > 40%
- Team formation success rate > 70%
- Parent satisfaction score > 4.5/5

## Conclusion

This architecture provides a solid foundation for building the Blox Buddy interactive application while maintaining consistency with the existing landing page. The subdomain approach ensures clear separation of concerns while the shared design system maintains brand cohesion. The chosen technology stack enables rapid development while ensuring scalability and maintainability for future growth.

## Appendices

### A. API Endpoint Specifications
Detailed REST API documentation to be maintained separately

### B. Database Migration Scripts
Version-controlled migration files in `/supabase/migrations`

### C. Design System Documentation
Component library and usage guidelines in Storybook

### D. Deployment Checklist
Production deployment verification steps

---

*Document Version: 1.0*  
*Last Updated: August 2025*  
*Author: Blox Buddy Development Team*