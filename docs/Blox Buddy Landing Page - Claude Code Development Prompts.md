# Blox Buddy Landing Page - Claude Code Development Prompts

## Project Overview
**Tech Stack**: React, Node.js, Tailwind CSS, Supabase (future), n8n (future)  
**Purpose**: Marketing landing page for Blox Buddy platform  
**Key Features**: Hero with game genre cards, educational content section, Discord/App links

---

## Stage 1: Structure & Layout Only

```
Create a React landing page structure for Blox Buddy. Focus ONLY on layout and component structure - no colors or styling yet.

Project setup:
- Initialize React app with Tailwind CSS configured
- Install dependencies: npm install framer-motion react-icons
- Create a clean component structure

Component structure to create:

1. Navbar.jsx:
   - Fixed header container
   - Logo area with text "BLOX BUDDY" and game controller icon placeholder
   - Navigation items: "Learn", "Community", "Discord"
   - Basic flexbox layout for spacing

2. Hero.jsx:
   - Full viewport height section
   - Container for headline and subheadline text
   - Two button placeholders for CTAs
   - 2x2 grid layout for game genre cards
   - IMPORTANT: All 4 cards must be aspect-ratio 16:9
   - Card titles: "Obbies & Parkour", "Simulators & Tycoons", "Battle & PvP", "Roleplay & Social"
   - Each card is just a div with the aspect ratio enforced

3. WhatIsBloxBuddy.jsx:
   - Section container with max-width
   - Section title area
   - 5 educational cards with alternating layout structure:
     - Odd cards: flex row with image area (40%) and content area (60%)
     - Even cards: flex row-reverse with content area (60%) and image area (40%)
   - Card titles only for now:
     1. "Learn at Your Own Pace"
     2. "Curated YouTube Learning"  
     3. "Perfect for Parents & Homeschoolers"
     4. "Master Essential Skills"
     5. "Build Real Games"

4. CTASection.jsx:
   - Full-width section container
   - Centered content area
   - Headline and subtext containers
   - Two button placeholders

5. Footer.jsx:
   - Container with three-column grid
   - Brand column, links column, newsletter column
   - Social icons row at bottom

Layout requirements:
- Use semantic HTML (nav, main, section, footer)
- Set up responsive grid structures
- Ensure 16:9 aspect ratio on ALL hero cards using aspect-video class
- Use container and spacing utilities
- No colors, just structure and layout
```

---

## Stage 2: Color Palette & Styling

```
Add a comprehensive color palette and styling to the Blox Buddy landing page using Tailwind CSS custom colors.

First, configure tailwind.config.js with custom Blox Buddy color palette:

module.exports = {
  theme: {
    extend: {
      colors: {
        'blox': {
          purple: {
            light: '#8B5CF6',
            DEFAULT: '#6B46C1',
            dark: '#5B21B6'
          },
          blue: {
            light: '#3B82F6',
            DEFAULT: '#2563EB',
            dark: '#1E40AF'
          },
          fuchsia: {
            light: '#F472B6',
            DEFAULT: '#EC4899',
            dark: '#DB2777'
          },
          cyan: {
            light: '#22D3EE',
            DEFAULT: '#06B6D4',
            dark: '#0891B2'
          },
          glass: {
            white: 'rgba(255, 255, 255, 0.1)',
            light: 'rgba(255, 255, 255, 0.05)',
            border: 'rgba(255, 255, 255, 0.2)'
          }
        }
      },
      backgroundImage: {
        'blox-gradient': 'linear-gradient(135deg, #6B46C1 0%, #2563EB 100%)',
        'fuchsia-gradient': 'linear-gradient(135deg, #EC4899 0%, #6B46C1 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)'
      }
    }
  }
}

Now apply the color palette to all components:

1. Global background:
   - Apply bg-blox-gradient to main container
   - Ensure full viewport coverage

2. Navbar styling:
   - Glass morphism: bg-blox-glass-white backdrop-blur-md
   - Border: border-b border-blox-glass-border
   - Text: text-white
   - Hover states: hover:text-blox-cyan

3. Hero section:
   - Headlines: text-white with text-blox-cyan accents
   - Primary CTA: bg-fuchsia-gradient with hover:shadow-blox-fuchsia/50
   - Secondary CTA: bg-cyan-gradient with hover:shadow-blox-cyan/50
   - Genre cards: bg-blox-glass-light backdrop-blur border-blox-glass-border
   - Card hover: hover:bg-blox-glass-white hover:scale-105

4. Educational cards:
   - Glass morphism: bg-blox-glass-light backdrop-blur
   - Borders: border border-blox-glass-border
   - Title text: text-blox-cyan
   - Body text: text-white/90
   - Image placeholders: bg-fuchsia-gradient or bg-cyan-gradient

5. CTA section:
   - Background: bg-fuchsia-gradient
   - Buttons with glow: shadow-lg shadow-blox-fuchsia/50

6. Footer:
   - Background: bg-blox-purple-dark/50 backdrop-blur
   - Text: text-white/80
   - Links: hover:text-blox-cyan

Apply consistent styling:
- All interactive elements should have transitions
- Maintain high contrast for readability
- Use the custom colors exclusively (no default Tailwind colors)
- Add subtle shadows with color tints for depth
```

---

## Stage 3: Animations & Interactivity

```
Add Framer Motion animations and interactive effects to the Blox Buddy landing page.

Animation implementations:

1. Navbar animations:
   - Initial load: Animate from y: -100 to y: 0 with spring bounce
   - Scroll behavior: Add background opacity change on scroll
   - Nav items: Underline animation on hover using Framer Motion

2. Hero section animations:
   - Headline: Fade in with slight scale (0.9 to 1)
   - Buttons: Stagger animation with fade up
   - Genre cards: Stagger animation with whileInView trigger
   - Add floating animation to decorative elements (if any)
   - Card hover: Scale to 1.05 with spring transition

3. Educational cards:
   - Scroll-triggered animations using whileInView
   - Alternating cards slide in from left/right
   - Stagger delay between cards (0.1s each)
   - Parallax effect on scroll (slower scroll speed for images)

4. Interactive effects:
   - Button hover: Scale 1.05 + glow intensifies
   - Card hover: Subtle lift with shadow
   - Smooth scroll to sections when nav items clicked
   - Active section highlighting in navbar

5. Performance considerations:
   - Use will-change for animated properties
   - Implement useReducedMotion for accessibility
   - Lazy load animations below the fold
   - Keep animations under 300ms for snappiness

Framer Motion setup:
- Wrap components with motion.div
- Use variants for complex animations
- Implement AnimatePresence for route transitions
- Set up scroll-triggered animations with whileInView

Add these micro-interactions:
- Cursor glow effect on buttons (optional)
- Parallax on background gradient
- Smooth transitions between all states
- Loading states for future content
```

---

## Stage 4: Content & Final Polish

```
Add final content, responsive design, and prepare for deployment.

Content additions:

1. Complete text content:
   - Write compelling headlines and descriptions
   - Add proper CTAs with correct external links
   - Include alt text for future images
   - Add proper semantic HTML tags

2. Responsive design:
   - Mobile (< 640px):
     * Stack 2x2 grid to single column
     * Adjust font sizes (smaller headlines)
     * Full-width buttons
     * Simplified navigation (hamburger menu optional)
   
   - Tablet (640px - 1024px):
     * 2-column grid for genre cards
     * Adjusted spacing
     * Maintain alternating layout for education cards

   - Desktop (> 1024px):
     * Full layouts as designed
     * Maximum width constraints (max-w-7xl)

3. External links setup:
   - Discord invite link (target="_blank")
   - Link to main Blox Buddy app
   - Social media links in footer
   - Parent resources link

4. SEO and Meta:
   - Page title and description
   - Open Graph tags for social sharing
   - Favicon setup
   - Basic structured data

5. Performance optimization:
   - Image optimization strategy (for future images)
   - Code splitting setup
   - Lighthouse audit fixes
   - Bundle size optimization

6. Deployment prep:
   - Environment variables setup (.env.example)
   - Build and start scripts
   - Vercel/Netlify configuration
   - Error boundary implementation

7. Future integration comments:
   - Mark Supabase connection points
   - Mark n8n webhook endpoints
   - Mark analytics tracking points
   - Document component props for app integration

Final checklist:
- All links working
- Animations smooth on all devices
- Color contrast passes WCAG AA
- Loading states implemented
- 404 handling
- Cross-browser testing
```

---

## Stage 5: Testing & Documentation (Optional)

```
Add testing, documentation, and prepare for handoff.

Testing setup:
1. Component testing structure
2. Accessibility testing
3. Performance benchmarks
4. Cross-browser compatibility checks

Documentation:
1. README with setup instructions
2. Component documentation
3. Color palette reference
4. Deployment guide
5. Future feature roadmap

This completes the Blox Buddy landing page development.
```

---

## Quick Reference

### Color Palette Variables
- `blox-purple`: Main purple (#6B46C1)
- `blox-blue`: Main blue (#2563EB)
- `blox-fuchsia`: Accent fuchsia (#EC4899)
- `blox-cyan`: Accent cyan (#06B6D4)
- `blox-glass-white`: Glass effect (rgba(255,255,255,0.1))
- `blox-gradient`: Main background gradient
- `fuchsia-gradient`: CTA button gradient
- `cyan-gradient`: Secondary button gradient

### Key Components
1. Navbar.jsx
2. Hero.jsx (with 16:9 cards)
3. WhatIsBloxBuddy.jsx (5 alternating cards)
4. CTASection.jsx
5. Footer.jsx

### External Dependencies
- framer-motion (animations)
- react-icons (icons)
- tailwindcss (styling)
- Future: Supabase, n8n
</artifact>
</artifacts>

Perfect! I've created the complete prompt document for Claude Code with your requested changes:

1. **Stage 1** now focuses purely on structure and layout - no colors or styling
2. **Stage 2** implements a fully customizable color palette in Tailwind config, so you can easily change any colors in one place
3. The hero cards are specifically marked as 16:9 aspect ratio (using `aspect-video` class)
4. Everything is organized in clear, sequential stages

The color palette is defined as custom Tailwind colors with semantic names like `blox-purple`, `blox-blue`, etc., making it super easy to adjust the entire site's color scheme by just updating the config file.

You can now download this MD file for your docs folder and use these prompts directly in Claude Code to build out your landing page stage by stage!