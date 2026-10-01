# Epsilon Zeta Brothers Portal

Private chapter operations portal for the Epsilon Zeta Chapter of Kappa Alpha Psi at Norfolk State University.

## Stack
- Next.js 15 + TypeScript
- Supabase Auth, Postgres, Row Level Security and Storage
- GitHub Actions CI
- Vercel-ready

## Implemented V1
- Roster-gated NSU account activation
- Brother profiles and profile photos
- Role-aware Brother / E-Board / Polemarch permissions
- Polemarch-only E-Board assignment and password-confirmed Polemarch transfer
- Configurable semesters and point rules
- Point submissions, direct E-Board credits/deductions and approval queue
- Service submissions and approval
- Events and rotating 45-second QR attendance
- Attendance review with event points and verified service-hour generation
- Private dress-code reporting with evidence, -10 deduction and +5 valid-reporter reward
- Duplicate dress-code protection
- Private GPA check-ins, semester snapshots and E-Board academic reporting
- Top-five standings and privacy-safe chapter GPA aggregates
- Announcements
- Committees
- Private chapter documents
- CSV roster import and activation/deactivation
- Live reports and dashboard metrics
- Server-side auth route guard plus database RLS

## Local setup
1. `npm install`
2. Create `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`
3. `npm run dev`

The browser client also temporarily accepts `NEXT_PUBLIC_SUPABASE_ANON_KEY` for compatibility with older local configuration.

## Validation
Every push to `main` runs:
- `npm run typecheck`
- `npm run build`

Never commit Supabase secret/service-role keys or `.env.local`.
