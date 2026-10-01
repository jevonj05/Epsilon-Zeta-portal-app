# Epsilon Zeta Brothers Portal

Private chapter-management portal for the Epsilon Zeta Chapter.

## V1
- Authorized-roster account activation with NSU email
- Brother profiles and private chapter directory
- Points requests, direct E-Board transactions, corrections and audit history
- Community-service submissions and verified hours
- Events with rotating QR attendance
- E-Board Review Center
- Private dress-code reporting and evidence storage
- Academic semester check-ins and E-Board academic dashboard
- Announcements and in-app notifications
- Committees and private documents
- Polemarch-controlled E-Board access and Polemarch transfer
- Chapter reports with CSV export
- Active-semester configuration

## Local development
1. Copy `.env.example` to `.env.local`.
2. Add the Supabase project URL and publishable key.
3. Run `npm install`.
4. Run `npm run dev`.

## Validation
`npm run typecheck` and `npm run build` are executed by GitHub Actions on every push to `main`.

## Security model
Database RLS is the primary authorization boundary. Sensitive administrative RPCs perform server-side role checks. Only authorized roster members can activate accounts. The Polemarch alone controls E-Board administrative assignments. Chapter files and dress-code evidence use private storage buckets.

No service-role key or other server secret belongs in the repository.
