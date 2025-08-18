# Blox Buddy - Learning Platform for Young Roblox Developers

Welcome to Blox Buddy! A comprehensive learning ecosystem designed to help young developers (ages 10-25) master Roblox game development through structured learning paths, team collaboration, and community support.

## 🎯 Project Vision

Blox Buddy is a two-phase ecosystem:
- **Phase 1 (Current)**: Blox Buddy - Foundational learning platform with curated YouTube content
- **Phase 2 (Future)**: Code Buddy - Advanced scripting and development tools

## 🏗️ Project Structure

This monorepo contains both the marketing landing page and the interactive application:

```
blox-buddy/
├── landing/           # Marketing/landing page (React + Tailwind)
│   ├── src/          # React components and pages
│   ├── public/       # Static assets and images
│   └── package.json  # Landing page dependencies
│
├── app/              # Interactive application (Next.js 14)
│   ├── app/         # Next.js app directory
│   ├── components/  # Application components
│   ├── public/      # App assets
│   └── package.json # Application dependencies
│
├── shared/           # Shared components and utilities
│   ├── components/   # Reusable UI components
│   ├── styles/      # Shared Tailwind configuration
│   └── hooks/       # Custom React hooks
│
├── supabase/        # Database configuration (coming soon)
│   ├── migrations/  # Database migrations
│   └── functions/   # Edge functions
│
├── docs/            # Project documentation
│   ├── Architecture Design Document.md
│   └── Product Requirements Document.md
│
└── tasks/           # Development task tracking
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Agentic-Person/BloxBuddy.git
cd blox-buddy
```

2. Install dependencies for both projects:

**Landing Page:**
```bash
cd landing
npm install
npm start
# Runs on http://localhost:3001
```

**Application:**
```bash
cd app
npm install
npm run dev
# Runs on http://localhost:3000
```

## 🎨 Design System

Both the landing page and application share a cohesive design system:

### Visual Identity
- **Color Palette**: 
  - Primary: Dark blue (#001d39) to purple (#2D1B69) gradients
  - Accent: Teal (#36b0d9)
  - Success: Green (#10B981)
  - Text: White, light gray, muted blue
- **Typography**: Inter font family
- **Effects**: Glass morphism, subtle animations, gradient overlays

### Shared Components
- `AnimatedCTAButton` - Sparkle-animated call-to-action buttons
- `FloatingAIAssistant` - Jimi AI helper (ready for n8n integration)
- Glass morphism cards and panels
- Consistent navigation patterns

### Animations
- Framer Motion throughout
- Spring physics for natural movement
- Reduced motion support for accessibility
- Stagger animations for lists
- Parallax scrolling effects

## 🔧 Technology Stack

### Frontend
- **Landing Page**: React 19, TypeScript, Tailwind CSS
- **Application**: Next.js 14, TypeScript, App Router
- **Styling**: Tailwind CSS (shared configuration)
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **State Management**: Zustand

### Backend (Coming Soon)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Discord OAuth
- **Real-time**: Supabase Realtime for collaboration
- **Storage**: Supabase Storage for user uploads
- **Automation**: n8n for workflows and Discord bot

### Payments (Planned)
- **Processor**: Stripe
- **Plans**: Free, Pro ($9.99/mo), Team ($29.99/mo)
- **Features**: Subscriptions, one-time purchases

## 🌐 Deployment Strategy

### Domain Structure
- **Landing Page**: `bloxbuddy.com`
- **Application**: `app.bloxbuddy.com`
- **API**: `api.bloxbuddy.com`
- **Docs**: `docs.bloxbuddy.com`

### Hosting
- **Platform**: Vercel
- **Branch**: Automatic deployments from `main`
- **Preview**: Pull request previews
- **CDN**: Vercel Edge Network

## 📝 Environment Variables

Create `.env.local` files in both `/landing` and `/app`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Discord OAuth
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_BOT_TOKEN=your_bot_token

# Stripe
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# n8n
N8N_WEBHOOK_URL=your_n8n_webhook_url

# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key
```

## 🎯 Current Status

### ✅ Completed
- Project architecture and documentation
- Monorepo structure with shared design system
- Landing page with animations and AI assistant
- Application dashboard with glass morphism UI
- Shared Tailwind configuration
- Framer Motion animation system

### 🚧 In Progress
- Supabase authentication setup
- User profile management
- Learning path implementation

### 📋 Upcoming
- Stripe payment integration
- Discord bot and community features
- YouTube video player with progress tracking
- Team formation and collaboration
- n8n workflow automation
- Production deployment

## 🎮 Features

### For Learners
- 📚 Structured 6-month learning journey
- 🎥 Curated YouTube content library
- 🏆 Achievement and badge system
- 📊 Progress tracking and analytics
- 👥 Team formation and collaboration
- 💬 Discord community integration

### For Parents/Educators
- 👨‍👩‍👧 Parent consent workflow (COPPA compliant)
- 📈 Progress monitoring dashboard
- 🔒 Safe, moderated environment
- 📝 Structured curriculum alignment
- 🎯 Clear learning objectives

### For Teams
- 🤝 Team discovery and matching
- 💼 Project collaboration tools
- 🔊 Discord channel auto-creation
- 📁 Shared project repositories
- 🏅 Team achievements

## 🛠️ Development

### Scripts

**Landing Page:**
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

**Application:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📊 Metrics & Analytics

Tracking key metrics for platform success:
- User registration and retention
- Course completion rates
- Team formation success
- Video engagement metrics
- Community participation

## 🔒 Security

- HTTPS everywhere
- Environment variables for secrets
- Row Level Security in Supabase
- Input validation and sanitization
- COPPA compliance for users under 13
- Regular security audits

## 📚 Documentation

- [Architecture Design Document](docs/Blox%20Buddy%20App%20Architecture%20Design%20Document.md)
- [Product Requirements Document](docs/Blox%20Buddy%20-%20Product%20Requirements%20Document%20v2.md)
- [API Documentation](docs/api) (coming soon)
- [Component Library](https://storybook.bloxbuddy.com) (planned)

## 🐛 Known Issues

- Landing page in `/blox-buddy-app` needs migration to `/landing`
- Cross-browser testing needed
- Mobile responsiveness optimization ongoing

## 📱 Roadmap

### Q1 2025
- ✅ Landing page and dashboard
- 🚧 Authentication and user management
- 📋 Basic learning path

### Q2 2025
- Payment processing
- Team features
- Discord integration

### Q3 2025
- Advanced analytics
- Mobile app (React Native)
- Community features

### Q4 2025
- Code Buddy beta
- Mentorship program
- Live events platform

## 👥 Team

Built with ❤️ by the Blox Buddy team for young Roblox developers worldwide.

## 📄 License

Copyright © 2025 Blox Buddy. All rights reserved.

Private and confidential. This project is not open source.

## 🙏 Acknowledgments

- Roblox Developer Community
- YouTube content creators
- Discord for community platform
- Vercel for hosting
- Supabase for backend infrastructure

---

**Repository**: [github.com/Agentic-Person/BloxBuddy](https://github.com/Agentic-Person/BloxBuddy)  
**Website**: [bloxbuddy.com](https://bloxbuddy.com) (coming soon)  
**Discord**: [discord.gg/bloxbuddy](https://discord.gg/bloxbuddy) (coming soon)

Last updated: August 18, 2025