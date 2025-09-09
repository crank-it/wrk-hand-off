# WRK Platform - Filipino Team Management System

A comprehensive platform for Australian and New Zealand SMEs to manage their dedicated Filipino teams, projects, and tasks. Built with Next.js 14, TypeScript, Prisma, and NextAuth.

## 🚀 Current Implementation Status

This project has evolved from a boilerplate into a functional team management platform with authentication, dashboard, and project management features.

### ✅ Implemented Features

- **Authentication System** - NextAuth v5 with credentials provider
- **Dashboard** - Full-featured dashboard with 8 sections
- **Team Management** - View and manage Filipino team members
- **Project Management** - Create, view, and track projects
- **Task Management** - Kanban board with task status tracking
- **Billing System** - Credit tracking and pricing plans
- **Settings & Profile** - User account management
- **Help Center** - FAQs and support resources

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Authentication**: NextAuth v5 (JWT strategy)
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Styling**: Tailwind CSS
- **State Management**: Server Components + Client Components
- **API**: RESTful API routes

## 📁 Project Structure

```
wrk-NEXTJS/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   └── dashboard/     # Dashboard API endpoints
│   ├── dashboard/         # Protected dashboard pages
│   │   ├── team/         # Team management
│   │   ├── projects/     # Project management
│   │   ├── tasks/        # Task management
│   │   ├── billing/      # Billing & credits
│   │   ├── settings/     # User settings
│   │   ├── messages/     # Messaging (placeholder)
│   │   └── help/         # Help & support
│   ├── signin/           # Sign-in page
│   └── signup/           # Sign-up page
├── components/            # React components
├── lib/                   # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Seed data script
│   └── dev.db            # SQLite database
└── public/               # Static assets
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wrk-NEXTJS.git
cd wrk-NEXTJS
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your values:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

5. Initialize the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

6. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

7. Open http://localhost:3000 in your browser

## 🔐 Test Credentials

Use these credentials to test the application:

- **Email**: demo@wrk.ph
- **Password**: demo123
- **Role**: CLIENT

Additional test user:
- **Email**: test@example.com
- **Check database for password**

## 📍 Available Routes

### Public Routes
- `/` - Marketing homepage
- `/signin` - User sign-in
- `/signup` - User registration
- `/services` - Service offerings
- `/how-it-works` - Platform explanation
- `/team` - Public team page
- `/portfolio` - Work samples
- `/blog` - Blog posts
- `/contact` - Contact form

### Protected Routes (Requires Authentication)
- `/dashboard` - Main dashboard
- `/dashboard/team` - Team member management
- `/dashboard/projects` - Project list
- `/dashboard/projects/new` - Create new project
- `/dashboard/projects/[id]` - Project details
- `/dashboard/tasks` - Task kanban board
- `/dashboard/billing` - Billing & credits
- `/dashboard/settings` - Account settings
- `/dashboard/messages` - Messages (placeholder)
- `/dashboard/help` - Help & support

## 🗄 Database Schema

The application uses Prisma with the following main models:

- **User** - Application users with authentication
- **Project** - Client projects with credit tracking
- **Task** - Project tasks with status management
- **TeamMember** - Filipino team members with skills
- **Service** - Available services (SEO, Web Dev, etc.)
- **ServiceRequest** - Client service requests
- **Testimonial** - Client testimonials
- **BlogPost** - Blog content

## 🔌 API Endpoints

### Authentication
- `GET/POST /api/auth/*` - NextAuth endpoints
- `POST /api/auth/signup` - User registration

### Dashboard APIs
- `GET/POST /api/dashboard/projects` - Project CRUD
- `GET/POST/PATCH /api/dashboard/tasks` - Task management
- More endpoints documented in `API_ROUTES.md`

## 🎨 UI Components

- Responsive design with Tailwind CSS
- Consistent card-based layouts
- Orange/Red gradient branding
- Loading and empty states
- Form validation
- Toast notifications (planned)

## 🚧 Pending Features

- [ ] Real-time messaging system
- [ ] File uploads to S3
- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Team availability calendar
- [ ] Video conferencing integration
- [ ] Mobile app

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Prisma commands
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations
npm run prisma:studio     # Open Prisma Studio
npm run prisma:seed       # Seed database
```

## 🐛 Known Issues

1. CSRF token warning on first sign-in (can be ignored)
2. Messages section is placeholder only
3. Some dashboard stats are using mock data
4. Password reset flow not implemented

## 📝 License

Private repository - All rights reserved

## 🤝 Contributing

This is a private project. Please contact the team for contribution guidelines.

## 📞 Support

For issues or questions:
- Email: support@wrk.ph
- Documentation: See `/docs` folder
- AI Context: See `CLAUDE.md` for AI assistant information

---

**Last Updated**: December 2024
**Version**: 1.0.0-beta