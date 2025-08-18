# Discord Setup Guide for Blox Buddy

## Overview

This guide covers the complete Discord integration setup for Blox Buddy, including OAuth authentication, bot configuration, and n8n automation workflows. Discord serves as the primary authentication method and community platform for the Blox Buddy learning ecosystem.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Discord Application Setup](#discord-application-setup)
3. [Discord Bot Configuration](#discord-bot-configuration)
4. [Server Setup](#server-setup)
5. [Environment Variables](#environment-variables)
6. [OAuth Integration](#oauth-integration)
7. [n8n Automation Workflows](#n8n-automation-workflows)
8. [Testing & Verification](#testing--verification)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have:
- Discord account with Developer access
- Admin access to your Discord server
- Supabase project configured
- n8n instance running (for automation)
- Node.js environment for testing

## Discord Application Setup

### Step 1: Create Discord Application

1. **Go to Discord Developer Portal**
   - Visit: https://discord.com/developers/applications
   - Click "New Application"
   - Name: "Blox Buddy" (or your preferred name)

2. **Configure General Information**
   ```
   Name: Blox Buddy
   Description: A curated learning platform for young Roblox developers
   App Icon: Upload your Blox Buddy logo
   Tags: education, gaming, roblox, learning
   ```

3. **Get Application Credentials**
   - Navigate to "General Information"
   - Copy `APPLICATION ID` → This is your `DISCORD_CLIENT_ID`
   - Copy `PUBLIC KEY` (save for later reference)

### Step 2: OAuth2 Configuration

1. **Navigate to OAuth2 → General**
   - Click "Reset Secret" to generate `CLIENT SECRET`
   - Copy `CLIENT SECRET` → This is your `DISCORD_CLIENT_SECRET`

2. **Configure Redirects**
   ```
   Redirect URIs:
   - http://localhost:3000/auth/callback/discord (development)
   - https://app.bloxbuddy.com/auth/callback/discord (production)
   - https://bloxbuddy.com/auth/callback/discord (landing page)
   ```

3. **Set OAuth2 Scopes**
   ```
   Required Scopes:
   ✓ identify (get user ID, username, avatar)
   ✓ email (get user email)
   ✓ guilds (see servers user is in)
   
   Optional Scopes (for enhanced features):
   ✓ guilds.join (add user to server)
   ✓ guilds.members.read (read server members)
   ```

## Discord Bot Configuration

### Step 1: Enable Bot

1. **Navigate to Bot Section**
   - Click "Bot" in left sidebar
   - Click "Add Bot" or "Create Bot"
   - Confirm the action

2. **Configure Bot Settings**
   ```
   Username: BloxBuddyBot
   Avatar: Upload bot avatar image
   
   Privileged Gateway Intents:
   ✓ SERVER MEMBERS INTENT (manage team members)
   ✓ MESSAGE CONTENT INTENT (read messages for commands)
   
   Bot Permissions:
   ✓ Send Messages
   ✓ Manage Channels
   ✓ Manage Roles
   ✓ Read Message History
   ✓ Add Reactions
   ✓ Use Slash Commands
   ```

3. **Get Bot Token**
   - Click "Reset Token"
   - Copy the token → This is your `DISCORD_BOT_TOKEN`
   - ⚠️ **IMPORTANT**: Never share this token publicly!

### Step 2: Bot Permissions Calculator

Calculate the permission integer for your bot:
```
Required Permissions (Decimal: 8589934592):
- Send Messages (2048)
- Manage Channels (16)
- Manage Roles (268435456)
- Read Message History (65536)
- Add Reactions (64)
- Use Slash Commands (2147483648)
```

## Server Setup

### Step 1: Create Discord Server Structure

1. **Server Categories**
   ```
   📚 LEARNING PATHS
   ├── #general-help
   ├── #progress-sharing
   └── #resource-library
   
   👥 TEAM FORMATION
   ├── #find-teammates
   ├── #project-showcase
   └── #skill-exchange
   
   🤖 TEAM CHANNELS (Auto-generated)
   ├── #team-[team-name]
   └── (Created by bot as needed)
   
   🎯 COMMUNITY
   ├── #announcements
   ├── #general-chat
   └── #feedback
   ```

2. **Role Structure**
   ```
   🔴 Admin
   🟠 Moderator
   🟡 Team Leader
   🟢 Member
   🔵 New Learner
   ```

### Step 2: Configure Permissions

1. **Channel Permissions Template**
   ```javascript
   // Default permissions for auto-generated team channels
   {
     "permission_overwrites": [
       {
         "id": "GUILD_ID", // Server ID
         "type": 0, // Role
         "deny": "1024" // VIEW_CHANNEL denied for @everyone
       },
       {
         "id": "TEAM_ROLE_ID", // Team-specific role
         "type": 0, // Role
         "allow": "3072" // VIEW_CHANNEL + SEND_MESSAGES
       }
     ]
   }
   ```

## Environment Variables

### Development (.env.local)
```bash
# Discord OAuth
DISCORD_CLIENT_ID=your_application_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here

# Discord Bot
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_GUILD_ID=your_server_id_here
DISCORD_TEAM_CATEGORY_ID=your_team_category_id_here

# n8n Integration
N8N_WEBHOOK_URL=http://localhost:5678
N8N_DISCORD_WEBHOOK_SECRET=your_webhook_secret

# Supabase (for user linking)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Production (Vercel Environment Variables)
```bash
# Add the same variables in Vercel dashboard
# Settings → Environment Variables
DISCORD_CLIENT_ID=production_app_id
DISCORD_CLIENT_SECRET=production_client_secret
DISCORD_BOT_TOKEN=production_bot_token
DISCORD_GUILD_ID=production_server_id
N8N_WEBHOOK_URL=https://your-n8n-instance.com
```

## OAuth Integration

### Step 1: Supabase Auth Configuration

1. **Add Discord Provider in Supabase**
   ```sql
   -- In Supabase Dashboard → Authentication → Providers
   -- Enable Discord provider
   -- Add your DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET
   ```

2. **Configure Redirect URLs**
   ```
   Site URL: https://app.bloxbuddy.com
   Redirect URLs:
   - https://app.bloxbuddy.com/auth/callback
   - http://localhost:3000/auth/callback (development)
   ```

### Step 2: Frontend Implementation

1. **Login Component Example**
   ```javascript
   // components/DiscordLogin.jsx
   import { supabase } from '@/lib/supabase'
   
   export default function DiscordLogin() {
     const handleDiscordLogin = async () => {
       const { data, error } = await supabase.auth.signInWithOAuth({
         provider: 'discord',
         options: {
           scopes: 'identify email guilds',
           redirectTo: `${window.location.origin}/auth/callback`
         }
       })
       
       if (error) console.error('Login error:', error)
     }
   
     return (
       <button 
         onClick={handleDiscordLogin}
         className="bg-teal-gradient text-white px-6 py-3 rounded-lg"
       >
         Login with Discord
       </button>
     )
   }
   ```

2. **Auth Callback Handler**
   ```javascript
   // app/auth/callback/route.js
   import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
   import { NextResponse } from 'next/server'
   
   export async function GET(request) {
     const { searchParams, origin } = new URL(request.url)
     const code = searchParams.get('code')
   
     if (code) {
       const supabase = createRouteHandlerClient({ cookies })
       await supabase.auth.exchangeCodeForSession(code)
     }
   
     return NextResponse.redirect(`${origin}/dashboard`)
   }
   ```

## n8n Automation Workflows

### Workflow 1: Team Channel Creation

```json
{
  "name": "Discord Team Channel Creator",
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "create-team-channel",
        "method": "POST",
        "authentication": "headerAuth"
      },
      "position": [250, 300]
    },
    {
      "name": "Validate Request",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "// Validate required fields\nconst { teamId, teamName, creatorDiscordId } = $json;\n\nif (!teamId || !teamName) {\n  throw new Error('Missing required fields');\n}\n\nreturn {\n  teamId,\n  teamName: teamName.toLowerCase().replace(/\\s+/g, '-'),\n  creatorDiscordId\n};"
      },
      "position": [450, 300]
    },
    {
      "name": "Create Discord Channel",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://discord.com/api/v10/guilds/{{$env.DISCORD_GUILD_ID}}/channels",
        "headers": {
          "Authorization": "Bot {{$env.DISCORD_BOT_TOKEN}}",
          "Content-Type": "application/json"
        },
        "body": {
          "name": "team-{{$json.teamName}}",
          "type": 0,
          "parent_id": "{{$env.DISCORD_TEAM_CATEGORY_ID}}",
          "topic": "Team channel for {{$json.teamName}} - Created via Blox Buddy",
          "permission_overwrites": [
            {
              "id": "{{$env.DISCORD_GUILD_ID}}",
              "type": 0,
              "deny": "1024"
            }
          ]
        }
      },
      "position": [650, 300]
    },
    {
      "name": "Send Welcome Message",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://discord.com/api/v10/channels/{{$json.id}}/messages",
        "headers": {
          "Authorization": "Bot {{$env.DISCORD_BOT_TOKEN}}",
          "Content-Type": "application/json"
        },
        "body": {
          "embeds": [
            {
              "title": "🎉 Welcome to your Team Channel!",
              "description": "This is your private space to collaborate and build amazing Roblox games together!",
              "color": 3553599,
              "fields": [
                {
                  "name": "📋 Getting Started",
                  "value": "• Share your project ideas\n• Plan your development timeline\n• Coordinate learning sessions",
                  "inline": false
                },
                {
                  "name": "🔗 Useful Links",
                  "value": "[Blox Buddy Dashboard](https://app.bloxbuddy.com)\n[Learning Resources](https://app.bloxbuddy.com/resources)",
                  "inline": false
                }
              ],
              "footer": {
                "text": "Blox Buddy Team Formation"
              }
            }
          ]
        }
      },
      "position": [850, 300]
    },
    {
      "name": "Update Database",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "PATCH",
        "url": "{{$env.SUPABASE_URL}}/rest/v1/teams?id=eq.{{$json.teamId}}",
        "headers": {
          "Authorization": "Bearer {{$env.SUPABASE_SERVICE_KEY}}",
          "apikey": "{{$env.SUPABASE_SERVICE_KEY}}",
          "Content-Type": "application/json"
        },
        "body": {
          "discord_channel_id": "{{$json.id}}"
        }
      },
      "position": [1050, 300]
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [["Validate Request"]]
    },
    "Validate Request": {
      "main": [["Create Discord Channel"]]
    },
    "Create Discord Channel": {
      "main": [["Send Welcome Message"]]
    },
    "Send Welcome Message": {
      "main": [["Update Database"]]
    }
  }
}
```

### Workflow 2: User Welcome Automation

```json
{
  "name": "Discord User Welcome",
  "nodes": [
    {
      "name": "Discord Event Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "discord-member-join",
        "method": "POST"
      }
    },
    {
      "name": "Send Welcome DM",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://discord.com/api/v10/users/{{$json.user.id}}/channels",
        "headers": {
          "Authorization": "Bot {{$env.DISCORD_BOT_TOKEN}}"
        },
        "body": {
          "recipient_id": "{{$json.user.id}}"
        }
      }
    },
    {
      "name": "Send Welcome Message",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://discord.com/api/v10/channels/{{$json.id}}/messages",
        "body": {
          "embeds": [
            {
              "title": "Welcome to Blox Buddy! 🎮",
              "description": "Ready to start your Roblox development journey?",
              "color": 3553599,
              "fields": [
                {
                  "name": "🚀 Get Started",
                  "value": "[Visit Dashboard](https://app.bloxbuddy.com/dashboard)\n[Join Learning Path](https://app.bloxbuddy.com/learn)",
                  "inline": true
                },
                {
                  "name": "👥 Find Teams",
                  "value": "[Browse Teams](https://app.bloxbuddy.com/teams)\n[Create Team](https://app.bloxbuddy.com/teams/create)",
                  "inline": true
                }
              ]
            }
          ]
        }
      }
    }
  ]
}
```

## Testing & Verification

### Step 1: OAuth Flow Testing

1. **Test Login Flow**
   ```bash
   # Start development server
   npm run dev
   
   # Navigate to login page
   # Click "Login with Discord"
   # Verify redirect to Discord
   # Authorize application
   # Verify redirect back to app
   # Check user data in Supabase
   ```

2. **Verify User Data**
   ```sql
   -- Check in Supabase SQL Editor
   SELECT 
     id,
     email,
     raw_user_meta_data->>'full_name' as discord_name,
     raw_user_meta_data->>'avatar_url' as discord_avatar,
     created_at
   FROM auth.users 
   WHERE raw_user_meta_data->>'provider' = 'discord';
   ```

### Step 2: Bot Functionality Testing

1. **Test Bot Commands**
   ```javascript
   // Test webhook endpoint
   curl -X POST http://localhost:5678/webhook/create-team-channel \
     -H "Content-Type: application/json" \
     -d '{
       "teamId": "test-123",
       "teamName": "Test Team",
       "creatorDiscordId": "123456789"
     }'
   ```

2. **Verify Channel Creation**
   - Check Discord server for new channel
   - Verify welcome message sent
   - Test channel permissions
   - Confirm database update

### Step 3: Integration Testing

1. **Full User Journey**
   ```
   1. User visits app.bloxbuddy.com
   2. Clicks "Login with Discord"
   3. Completes Discord OAuth
   4. Creates team in app
   5. Verifies Discord channel created
   6. Tests team collaboration features
   ```

## Troubleshooting

### Common Issues

#### 1. OAuth Redirect Mismatch
**Error**: `redirect_uri_mismatch`
**Solution**: 
- Verify redirect URLs in Discord Developer Portal
- Check Supabase redirect configuration
- Ensure URLs match exactly (including trailing slashes)

#### 2. Bot Permission Denied
**Error**: `Missing Permissions`
**Solution**:
- Verify bot has required permissions in server
- Check role hierarchy (bot role must be above managed roles)
- Ensure bot is in the correct server

#### 3. n8n Webhook Not Triggering
**Error**: Webhook timeout or 404
**Solution**:
- Verify n8n is running and accessible
- Check webhook URL configuration
- Test webhook endpoint manually
- Verify authentication headers

#### 4. Invalid Bot Token
**Error**: `Invalid Bot Token`
**Solution**:
- Regenerate bot token in Discord Developer Portal
- Update environment variables
- Restart application/n8n instance

### Debug Commands

```bash
# Test Discord API connectivity
curl -H "Authorization: Bot YOUR_BOT_TOKEN" \
     https://discord.com/api/v10/users/@me

# Verify webhook endpoint
curl -X POST http://localhost:5678/webhook/test \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'

# Check Supabase connection
curl -H "apikey: YOUR_ANON_KEY" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     https://YOUR_PROJECT.supabase.co/rest/v1/profiles
```

## Security Best Practices

### Environment Security
- Never commit tokens to version control
- Use different tokens for development/production
- Rotate tokens regularly
- Implement webhook signature verification

### Bot Security
- Limit bot permissions to minimum required
- Use role-based access control
- Monitor bot activity logs
- Implement rate limiting

### User Data Protection
- Follow Discord's Data Usage Policy
- Implement proper data retention policies
- Secure user data transmission
- Regular security audits

## Maintenance & Updates

### Regular Tasks
- [ ] Monitor Discord API changes
- [ ] Update bot permissions as needed
- [ ] Review webhook logs for errors
- [ ] Test OAuth flow monthly
- [ ] Update documentation for changes

### Scaling Considerations
- Implement webhook queuing for high volume
- Add error retry mechanisms
- Monitor rate limits
- Consider Discord bot sharding for large servers

---

## Quick Reference

### Essential URLs
- **Discord Developer Portal**: https://discord.com/developers/applications
- **Discord API Documentation**: https://discord.com/developers/docs
- **Supabase Discord Integration**: https://supabase.com/docs/guides/auth/social-login/auth-discord

### Environment Variables Checklist
- [ ] `DISCORD_CLIENT_ID`
- [ ] `DISCORD_CLIENT_SECRET`
- [ ] `DISCORD_BOT_TOKEN`
- [ ] `DISCORD_GUILD_ID`
- [ ] `DISCORD_TEAM_CATEGORY_ID`
- [ ] `N8N_WEBHOOK_URL`

### Support Resources
- Discord Developer Support: https://discord.gg/discord-developers
- Supabase Community: https://discord.gg/supabase
- n8n Community: https://community.n8n.io

---

*Last Updated: January 2025*  
*Document Version: 1.0*
