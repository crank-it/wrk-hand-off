# CLAUDE.md - AI Assistant Context

This document provides comprehensive context for AI assistants working on the WRK Platform project.

## Project Overview

**Project Name**: WRK Platform  
**Purpose**: A B2B SaaS platform connecting Australian/NZ SMEs with dedicated Filipino teams  
**Stage**: Beta - Core features implemented, authentication working  
**Stack**: Next.js 14, TypeScript, NextAuth v5, Prisma, SQLite/PostgreSQL  

## Critical Information

### Authentication System
- **Library**: NextAuth v5 (NOT v4 - this is important!)
- **Strategy**: JWT with credentials provider
- **Key File**: `/lib/auth.ts`
- **Pattern**: Use `auth()` function, NOT `getServerSession()`
- **Protected Routes**: All `/dashboard/*` routes require authentication

### Current Working Features
✅ Sign-in/Sign-up flow  
✅ Dashboard with navigation  
✅ Team management page  
✅ Projects (CRUD operations)  
✅ Tasks (Kanban board)  
✅ Billing & Settings  
✅ Database with seeded data  

### Test Credentials
```
Email: demo@wrk.ph
Password: demo123
```

## Architecture Patterns

### File Structure
```
app/
├── api/                       # API routes
│   ├── auth/[...nextauth]/   # NextAuth endpoints
│   └── dashboard/             # Protected API endpoints
├── dashboard/                 # Protected pages (Server Components)
│   ├── layout.tsx            # Dashboard layout with auth check
│   └── [section]/page.tsx    # Individual dashboard sections
├── signin/page.tsx           # Public sign-in (Client Component)
└── page.tsx                  # Public homepage
```

### Authentication Pattern
```typescript
// In Server Components
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth()
  if (!session) redirect('/signin')
  // ... rest of component
}
```

### Database Access Pattern
```typescript
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

const session = await auth()
const userId = (session.user as any).id

const data = await prisma.model.findMany({
  where: { userId }
})
```

## Database Schema

### Main Models
- **User**: Authentication and profile
- **Project**: Client projects with credit tracking
- **Task**: Project tasks with status management
- **TeamMember**: Filipino team members
- **Service**: Available services (SEO, Web Dev, etc.)
- **ServiceRequest**: Client requests for services

### Key Relationships
- User → many Projects
- Project → many Tasks
- Project → one Service (optional)
- User → many ServiceRequests

## Common Tasks

### Adding a New Dashboard Page
1. Create `/app/dashboard/[name]/page.tsx`
2. Add auth check at top of component
3. Add navigation link in `/components/DashboardNav.tsx`
4. Follow existing patterns for styling

### Creating API Endpoints
1. Create route in `/app/api/dashboard/[resource]/route.ts`
2. Always check authentication first
3. Validate user owns the resource
4. Return consistent error responses

### Working with Forms
- Client Components: Use `'use client'` directive
- Server Actions: Not yet implemented (using API routes)
- Validation: Client-side + server-side
- Error handling: Display user-friendly messages

## Environment Variables

### Required
```env
DATABASE_URL="file:./dev.db"          # SQLite for dev
NEXTAUTH_SECRET="[generate-secret]"   # Required for production
NEXTAUTH_URL="http://localhost:3000"  # App URL
```

### Optional/Future
```env
STRIPE_SECRET_KEY=""                  # Payment processing
S3_BUCKET=""                         # File storage
PUSHER_KEY=""                        # Real-time updates
```

## TypeScript Patterns

### Extending Session Type
```typescript
// When accessing user ID or role
const userId = (session.user as any).id
const role = (session.user as any).role
```

### API Response Types
```typescript
// Success
return NextResponse.json(data)

// Error
return NextResponse.json(
  { error: 'Error message' },
  { status: 400 }
)
```

## UI/UX Patterns

### Design System
- **Colors**: Orange/Red gradient (`from-orange-500 to-red-500`)
- **Cards**: White background with border (`bg-white rounded-xl border border-gray-200`)
- **Buttons**: Gradient primary, white secondary
- **Layout**: Sidebar navigation, main content area

### Component Patterns
- Loading states: Show skeletons or spinners
- Empty states: Helpful message + CTA
- Error states: User-friendly messages
- Success feedback: Toast notifications (planned)

## Known Issues & Workarounds

1. **CSRF Token Warning**: Appears on first sign-in, can be ignored
2. **TypeScript User Type**: Use `as any` for extended user properties
3. **Redirect After Auth**: Use `router.push()` then `router.refresh()`

## Pending Implementation

### High Priority
- [ ] Password reset flow
- [ ] Email verification
- [ ] Real user creation (currently using seeded data)
- [ ] Stripe payment integration

### Medium Priority
- [ ] File uploads to S3
- [ ] Real-time messaging
- [ ] Email notifications
- [ ] Advanced search/filters

### Low Priority
- [ ] Mobile app
- [ ] Video conferencing
- [ ] Advanced analytics
- [ ] Multi-language support

## Development Workflow

### Starting Development
```bash
npm run dev          # Start Next.js
# Runs on http://localhost:3000
```

### Database Changes
```bash
# After modifying schema.prisma
npx prisma generate
npx prisma migrate dev --name [description]
npx prisma db seed  # Re-seed if needed
```

### Testing
- Manual testing via browser
- Check console for errors
- Verify API responses in Network tab
- Use Prisma Studio: `npx prisma studio`

## Debugging Tips

### Common Errors
1. **"Module not found '@/...'**: Check tsconfig.json paths
2. **"auth is not a function"**: Ensure importing from lib/auth.ts
3. **"Unauthorized"**: Check session exists and user ID is correct
4. **Database errors**: Run migrations, check schema

### Useful Commands
```bash
# View database
npx prisma studio

# Check build errors
npm run build

# Lint issues
npm run lint

# Clear Next.js cache
rm -rf .next
```

## API Documentation

### Authentication Endpoints
- `GET /api/auth/providers` - List auth providers
- `POST /api/auth/signin/credentials` - Sign in
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - Sign out

### Dashboard APIs
- `GET /api/dashboard/projects` - List user's projects
- `POST /api/dashboard/projects` - Create project
- `GET /api/dashboard/tasks` - List all tasks
- `POST /api/dashboard/tasks` - Create task
- `PATCH /api/dashboard/tasks` - Update task status

## Code Style Guidelines

- Use TypeScript strictly
- Prefer Server Components when possible
- Keep components focused and small
- Use Tailwind classes, avoid custom CSS
- Follow existing patterns in codebase
- Comment complex logic only

## Getting Help

1. Check this document first
2. Review existing similar code
3. Check Prisma schema for data structure
4. Test in browser with console open
5. Use network tab to debug API calls

## Important Notes for AI Assistants

1. **Always use NextAuth v5 patterns**, not v4
2. **Check authentication** on all protected routes
3. **Follow existing code patterns** for consistency
4. **Test changes** before confirming completion
5. **Update this document** when adding major features

---

**Document Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintained By**: Development Team