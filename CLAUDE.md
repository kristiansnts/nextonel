# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ShadPanel** is a Next.js 15 admin panel CLI tool published to NPM. Users run `npx shadpanel init` to scaffold complete admin panels with authentication, form builders, data tables, and 50+ UI components.

This repository serves two purposes:
1. **Demo Application**: A working Next.js app showcasing all ShadPanel features
2. **CLI Package Source**: Contains the CLI tool and templates for scaffolding new projects

## Project Type

This is an **npx-based CLI tool**, NOT an installable npm package. Users do NOT install it as a dependency. They use it via `npx shadpanel init` to create new projects.

## Development Commands

### Running the demo application
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build production bundle with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint
```

The development server runs on http://localhost:3000 by default.

## CLI Architecture

### CLI Tool
- **Location**: `/cli/` directory
- **Entry Point**: `cli/index.ts`
- **Purpose**: Scaffolds new Next.js admin panel projects
- **Usage**: `npx shadpanel init`

### Templates
- **Location**: `/templates/` directory
- **Contents**: Template files copied to user's project during `npx shadpanel init`
- **Includes**: Components, layouts, pages, auth configuration, etc.

### Components (Templates)
- **Location**: `/components/` directory
- **Purpose**: Component templates copied during scaffolding
- **Includes**: UI components, form builders, data tables, sidebars, etc.

## Authentication Architecture

### NextAuth.js Configuration
- **Route Handler**: `/app/api/auth/[...nextauth]/route.ts` - Central NextAuth configuration
- **Providers**: Google OAuth, GitHub OAuth, and Credentials (email/password)
- **Custom Sign-in Page**: `/admin/login` (configured in NextAuth pages)
- **Hardcoded Demo Credentials**: `admin@example.com` / `admin123` (for development only)

### Authentication State Management
The app uses a custom provider configuration system that allows runtime toggling of auth providers:

- **Hook**: `hooks/use-auth-providers.ts` - Manages auth provider state in localStorage
- **Context**: `contexts/auth-providers-context.tsx` - Provides auth config throughout the app
- **Config Interface**: Tracks enabled/disabled state for google, github, and credentials providers

### Protected Routes
- **Admin Layout**: `app/admin/layout.tsx` - Wraps all admin routes with authentication
- **Public Pages**: `/admin/login` and `/admin/signup` are excluded from auth checks
- **Redirect Logic**: Unauthenticated users are redirected to `/admin/login`

## Project Structure

### Route Organization
```
app/
├── layout.tsx                    # Root layout with font and providers
├── page.tsx                      # Home page (redirects to /admin/login)
├── admin/
│   ├── layout.tsx               # Admin auth wrapper
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Signup page
│   ├── dashboard/page.tsx       # Main admin dashboard
│   └── auth-config/page.tsx     # Auth provider configuration UI
└── api/
    └── auth/[...nextauth]/route.ts  # NextAuth API route
```

### Component Organization
- **ui/**: shadcn/ui components (button, input, label, separator, dialog, tooltip, etc.)
- **app-sidebar.tsx**: Admin dashboard sidebar navigation
- **auth-provider-config.tsx**: UI for toggling auth providers
- **login-form.tsx**: Multi-provider login form component
- **signup-form.tsx**: User registration form
- **providers.tsx**: Root providers wrapper (SessionProvider + AuthProvidersProvider)

### CLI Organization
```
cli/
├── index.ts           # Main CLI entry point
├── commands/          # CLI commands
└── utils/             # CLI utilities
```

### Templates Organization
```
templates/
├── app/               # Next.js app directory templates
├── components/        # Component templates
├── hooks/            # React hooks templates
├── contexts/         # Context providers templates
└── lib/              # Utilities templates
```

### Key Architectural Patterns

1. **Provider Composition**: The app uses nested providers at the root level:
   - `SessionProvider` (NextAuth) for authentication state
   - `AuthProvidersProvider` (custom) for auth configuration

2. **Client-Side Auth Guards**: The `/app/admin/layout.tsx` implements client-side route protection using `useSession()` and redirects based on auth status.

3. **Type Extensions**: `types/next-auth.d.ts` extends NextAuth types to include user ID in session.

## Styling & UI

- **Tailwind CSS v4** with PostCSS plugin (`@tailwindcss/postcss`)
- **shadcn/ui** component library (New York style variant)
- **Path Aliases**: `@/*` points to project root
- **CSS Variables**: Uses CSS custom properties for theming
- **Lucide Icons**: Icon library for UI components
- **Geist Font Family**: Google Fonts (Geist Sans & Geist Mono)

## Environment Variables

Required environment variables (see `.env.example`):
- `NEXTAUTH_URL` - Application URL (default: http://localhost:3000)
- `NEXTAUTH_SECRET` - Secret key for NextAuth session encryption
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - GitHub OAuth credentials
- `NEXT_APP_NAME` - Application name

## Technology Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Build Tool**: Turbopack (enabled via `--turbopack` flag)
- **React**: v19.1.0
- **TypeScript**: v5
- **Authentication**: NextAuth.js v4
- **UI Components**: Radix UI primitives + shadcn/ui
- **Styling**: Tailwind CSS v4

## Publishing to NPM

To publish updates to the CLI:

```bash
# 1. Update version in package.json
npm version patch  # or minor, or major

# 2. Login to NPM (if not already)
npm login

# 3. Publish
npm publish
```

Users will then be able to use the latest version via:
```bash
npx shadpanel@latest init
```

## Important Notes

- This is an **npx CLI tool**, not an installable package
- The `app/` directory is a demo application showcasing all features
- The `cli/` directory contains the CLI tool source
- The `templates/` and `components/` directories contain files copied during scaffolding
- All admin routes require authentication except `/admin/login` and `/admin/signup`
- Auth provider configuration is stored in browser localStorage (client-side only)
- The root page (`/`) redirects to `/admin/login` via client-side `useEffect`
- TypeScript strict mode is enabled
- **DO NOT remove any files from `app/`, `components/`, `templates/`, or `cli/` directories** as they are essential for the demo and CLI functionality
