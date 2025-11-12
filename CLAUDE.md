# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NetworkPro is a professional networking platform built with Next.js 14 (App Router), TypeScript, and Supabase. It enables users to connect with professionals, discover events, and explore job opportunities.

## Development Commands

### Running the Application
```bash
npm run dev    # Start development server on http://localhost:3000
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (supports email/password, Google OAuth, GitHub OAuth)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Type Safety**: TypeScript with strict mode enabled

### Path Aliases
The project uses `@/*` path alias mapping to `./src/*` (configured in tsconfig.json:20).

### Core Data Architecture

The application follows a **layered architecture**:

1. **Database Layer** (`supabase/schema.sql`): PostgreSQL schema with Row Level Security (RLS) policies
2. **API Layer** (`src/lib/api.ts`): Centralized data access functions for all database operations
3. **Hook Layer** (`src/hooks/`): Custom React hooks that consume the API layer
4. **Component Layer** (`src/components/`): UI components that use hooks for data

### Key Data Entities

The system revolves around 8 main tables:
- **users**: Base user profiles (extends Supabase auth.users)
- **professionals**: Extended professional profiles with skills, certifications, experience
- **events**: Networking events and conferences
- **jobs**: Job listings and opportunities
- **connections**: User-to-user connections (requester/addressee relationship)
- **messages**: Direct messaging between users
- **favorites**: Saved items (can reference professionals, jobs, or events)
- **event_registrations**: Event attendance tracking

### Data Access Patterns

All database operations go through `src/lib/api.ts`, which provides:
- Type-safe CRUD operations for each entity
- Consistent error handling (console.error + return empty arrays/null)
- Array field normalization (ensures skills, requirements, etc. are always arrays)

Example pattern:
```typescript
// API layer handles Supabase queries
export async function getProfessionals(): Promise<Professional[]>

// Hooks consume API functions
export function useProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  // ... uses getProfessionals()
}
```

### Authentication Flow

Authentication is managed via Supabase Auth:
- `src/lib/supabase.ts`: Creates the Supabase client (requires env vars)
- `src/hooks/useAuth.ts`: Provides auth state, user object, and signOut function
- `src/components/Auth.tsx`: Auth UI component using `@supabase/auth-ui-react`
- Session management via `supabase.auth.onAuthStateChange()` listener

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

To initialize the database:
1. Run `supabase/schema.sql` in Supabase SQL Editor
2. Optionally run `supabase/seed.sql` for sample data
3. Configure OAuth providers in Supabase dashboard (Authentication > Providers)

### Component Structure

- **UI Components** (`src/components/ui/`): shadcn/ui components (Radix UI primitives)
- **Feature Components** (`src/components/`): Domain-specific components (NavBar, Auth, Cards)
- **App Router Pages** (`src/app/`): File-based routing with layouts

### Theming

The app uses next-themes for dark mode support:
- Theme provider configured in `src/app/layout.tsx:21`
- Uses `suppressHydrationWarning` to prevent hydration mismatch
- Theme colors defined in `src/app/globals.css`

### Type Definitions

All shared types are centralized in `src/types/index.ts`. Types mirror database schema but are frontend-friendly (all fields use camelCase, optional fields marked with `?`).

## Common Development Workflows

### Adding a New Feature Entity

1. Add table schema to `supabase/schema.sql`
2. Run schema in Supabase SQL Editor
3. Add TypeScript interface to `src/types/index.ts`
4. Add API functions to `src/lib/api.ts` (follow existing CRUD patterns)
5. Create custom hook in `src/hooks/` if needed
6. Create UI components and pages

### Modifying Database Schema

Always update schema via Supabase SQL Editor, not through code. The app expects Row Level Security (RLS) policies to be configured on all tables.

### Working with Arrays

Database array fields (skills, requirements, certifications, languages, preferences) are stored as PostgreSQL TEXT[] arrays. The API layer normalizes these to always return arrays, even if null in the database (see src/lib/api.ts:15-20, 109-112).
