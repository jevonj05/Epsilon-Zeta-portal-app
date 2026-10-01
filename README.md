# Epsilon Zeta Brothers Portal

Private, mobile-first chapter management portal for Epsilon Zeta Chapter.

## Milestone 1
Foundation UI + Supabase-ready authentication/profile schema.

## Local setup
1. npm install
2. Copy .env.example to .env.local
3. Add Supabase project URL and anon key
4. Run supabase/schema.sql in Supabase SQL Editor
5. npm run dev

Without Supabase environment variables, the login screen enters the UI demo dashboard for frontend review.

Authorization will be enforced with Supabase Row Level Security. Chapter positions and system privileges remain separate.