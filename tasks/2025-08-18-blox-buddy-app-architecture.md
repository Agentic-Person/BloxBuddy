# Task: Blox Buddy App Architecture Design

## Status: In Progress
**Created**: 2025-08-18  
**Type**: Architecture Design & Planning

## Objective
Design and document the comprehensive architecture for the Blox Buddy interactive application, establishing the technical foundation for building a browser-based learning platform that integrates with Supabase, Stripe, and maintains visual consistency with the existing landing page.

## Context
The Blox Buddy project consists of two main components:
1. A marketing landing page (currently built)
2. An interactive web application (to be built)

The decision has been made to use a subdomain strategy (Option 1) where the landing page lives at bloxbuddy.com and the application at app.bloxbuddy.com.

## Requirements

### Architecture Requirements
- Separate subdomains for landing page and application
- Shared design system and Tailwind configuration
- Browser-based application (no installation required)
- Monorepo structure for easier management

### Technical Stack
- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (auth, database, real-time, storage)
- **Payments**: Stripe for subscriptions and one-time purchases
- **Automation**: n8n for workflows and Discord integration
- **Deployment**: Vercel with subdomain routing

### Design Consistency
- Maintain dark blue/purple gradient backgrounds
- Keep teal accent colors (#36b0d9)
- Preserve glass morphism effects
- Continue using animated CTA buttons with sparkles
- Implement 40-20-40 layout pattern where appropriate

## Approach

### 1. Documentation Strategy
Created comprehensive architecture document covering:
- Deployment strategy with subdomains
- Project structure (/landing, /app, /shared)
- Technology stack integration
- Database schema design
- Security considerations
- Implementation roadmap

### 2. Shared Resources Planning
- Tailwind configuration sharing
- Component library structure
- Animation utilities
- TypeScript type definitions
- Asset management

### 3. Integration Architecture
- Supabase authentication across subdomains
- Stripe payment flow from landing to app
- Discord bot integration
- YouTube API for video content
- n8n workflow automation

## Implementation Plan

### Phase 1: Foundation Setup
- Create monorepo structure
- Configure shared Tailwind
- Set up Supabase project
- Implement basic authentication

### Phase 2: Core Application
- Build dashboard layout
- Create learning path UI
- Implement progress tracking
- Add team formation features

### Phase 3: Integrations
- Stripe payment processing
- Discord bot setup
- n8n workflow configuration
- YouTube video player

### Phase 4: Polish & Deploy
- Performance optimization
- Security audit
- User testing
- Production deployment

## Key Decisions Made

1. **Subdomain Strategy**: Using app.bloxbuddy.com for clear separation
2. **Monorepo Structure**: Single repository for both landing and app
3. **Shared Design System**: Consistent visual language across platforms
4. **Browser-Based**: No installation required, accessible via web
5. **Supabase First**: Using Supabase for all backend needs
6. **Discord Primary Auth**: Discord OAuth as main authentication method

## Deliverables

- [x] Architecture Design Document created
- [ ] Project structure implementation
- [ ] Shared component library setup
- [ ] Supabase configuration
- [ ] Deployment pipeline setup

## Next Steps

1. Set up the monorepo project structure
2. Move existing landing page to /landing directory
3. Create /app directory for application
4. Configure shared Tailwind and components
5. Initialize Supabase project
6. Begin building authentication flow

## Related Documents
- `Blox Buddy App Architecture Design Document.md`
- `Blox Buddy - Product Requirements Document v2.md`
- `CLAUDE.md` (project instructions)

## Notes
- The app will maintain the same visual design language as the landing page
- Focus on creating a seamless experience between landing and app
- Prioritize mobile responsiveness from the start
- Consider PWA capabilities for app-like experience

---

*Task documented for knowledge transfer and project continuity*