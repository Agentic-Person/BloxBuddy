# Supabase Setup Guide for Blox Buddy

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `blox-buddy`
   - Database password: (save this securely!)
   - Region: Choose closest to your users
5. Click "Create Project"
6. Wait for project to initialize (2-3 minutes)

## Step 2: Get Your API Keys

Once project is ready:
1. Go to Settings → API
2. Copy these values to your `/app/.env.local`:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## Step 3: Run Database Migrations

1. Go to SQL Editor in Supabase Dashboard
2. Click "New Query"
3. Copy entire contents of `/supabase/migrations/001_initial_schema.sql`
4. Paste into SQL Editor
5. Click "Run"
6. Should see "Success. No rows returned"

## Step 4: Configure Discord OAuth

1. Go to Authentication → Providers in Supabase
2. Find Discord and click to expand
3. Enable Discord provider
4. You'll need Discord OAuth credentials:

### Getting Discord OAuth Credentials:
1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Click "New Application"
3. Name it "Blox Buddy"
4. Go to OAuth2 → General
5. Copy `CLIENT ID` and `CLIENT SECRET`
6. Add Redirect URL from Supabase (looks like: `https://[your-project].supabase.co/auth/v1/callback`)
7. Save changes in Discord

### Back in Supabase:
1. Paste Discord Client ID
2. Paste Discord Client Secret
3. Click "Save"

## Step 5: Update Environment Variables

Create `/app/.env.local` with your actual values:

```env
# From Supabase Dashboard
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-key...

# From Discord Developer Portal  
NEXT_PUBLIC_DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
```

## Step 6: Test Authentication

1. Restart your Next.js dev server:
   ```bash
   cd app
   npm run dev
   ```

2. Visit http://localhost:3000/login
3. Click "Continue with Discord"
4. Should redirect to Discord for authorization
5. After authorizing, should redirect back to dashboard

## Step 7: Verify Database

In Supabase Dashboard:
1. Go to Table Editor
2. You should see these tables:
   - `profiles`
   - `learning_progress`
   - `teams`
   - `team_members`
   - `content_items`
   - `content_health_logs`

## Troubleshooting

### "Invalid API Key" Error
- Double-check your `.env.local` values
- Make sure no extra spaces or quotes
- Restart dev server after changing env variables

### Discord OAuth Not Working
- Verify redirect URL matches exactly in Discord and Supabase
- Check Discord app is not in "Bot" mode
- Ensure Discord provider is enabled in Supabase

### Database Migration Failed
- Check for syntax errors in SQL
- Run migration in smaller chunks if needed
- Check Supabase logs for specific errors

### No Profile Created After Login
- Check the trigger `on_auth_user_created` exists
- Verify the `handle_new_user` function was created
- Check Supabase logs for trigger errors

## Next Steps

After successful setup:
1. ✅ Authentication is working
2. ✅ Database schema is ready
3. Next: Build user onboarding flow
4. Next: Implement progress tracking
5. Next: Add team features

## Security Reminders

- **NEVER** commit `.env.local` to git
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- Use Row Level Security (RLS) policies
- Regular backup your database
- Monitor usage in Supabase dashboard

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Discord OAuth Documentation](https://discord.com/developers/docs/topics/oauth2)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)