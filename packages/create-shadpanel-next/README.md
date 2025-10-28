# create-shadpanel-next

Create a new Next.js admin panel with ShadPanel - a complete admin panel toolkit with authentication, form builders, data tables, and 50+ UI components.

## Usage

Create a new ShadPanel project with a single command:

```bash
npx create-shadpanel-next@latest my-admin-panel
```

Or use your preferred package manager:

```bash
# npm
npx create-shadpanel-next@latest my-app

# pnpm
pnpm create shadpanel-next my-app

# yarn
yarn create shadpanel-next my-app

# bun
bunx create-shadpanel-next my-app
```

You can also use the `init` subcommand:

```bash
npx create-shadpanel-next@latest init my-admin-panel
```

## What's Included

ShadPanel provides everything you need to build a modern admin panel:

### 🎨 UI Components (50+)
- Built on **shadcn/ui** and **Radix UI** primitives
- Fully customizable with **Tailwind CSS v4**
- Dark mode support out of the box
- Responsive design

### 🔐 Authentication
- **NextAuth.js** integration
- Multiple providers support:
  - Google OAuth
  - GitHub OAuth
  - Email/Password (Credentials)
- Protected routes
- Session management

### 📋 Form Builder
- Dynamic form generation
- Multiple field types (text, email, select, checkbox, etc.)
- Built-in validation
- Easy to extend

### 📊 Data Tables
- Powered by **TanStack Table**
- Sorting, filtering, and pagination
- Row selection
- Customizable columns

### 🎯 Features
- Admin dashboard layout
- Sidebar navigation
- User management
- Demo pages and examples
- TypeScript support
- ESLint configuration
- Git initialization

## Installation Types

During setup, you can choose from different installation types:

1. **Full Panel**: Complete admin panel with all features
2. **Components Only**: Just the UI components
3. **Auth Components**: Authentication components only

## Requirements

- **Node.js** 18.x or higher
- **Package Manager**: npm, pnpm, yarn, or bun

## Technology Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Build Tool**: Turbopack
- **React**: v19
- **TypeScript**: v5
- **Authentication**: NextAuth.js v4
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS v4
- **Tables**: TanStack Table v8
- **Icons**: Lucide React

## After Installation

Once your project is created, navigate to the directory and start the development server:

```bash
cd my-admin-panel
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000)

### Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your authentication provider credentials:
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` (if using Google OAuth)
   - `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` (if using GitHub OAuth)

### Demo Credentials

For testing, you can use the hardcoded demo credentials (development only):
- Email: `admin@example.com`
- Password: `admin123`

**Note**: Remove these before deploying to production!

## Project Structure

```
my-admin-panel/
├── app/
│   ├── admin/               # Admin dashboard routes
│   │   ├── dashboard/       # Main dashboard
│   │   ├── login/          # Login page
│   │   └── signup/         # Signup page
│   ├── api/
│   │   └── auth/           # NextAuth API routes
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── app-sidebar.tsx     # Dashboard sidebar
│   └── login-form.tsx      # Auth forms
├── lib/
│   └── utils.ts            # Utility functions
├── hooks/                  # Custom React hooks
├── contexts/               # React contexts
└── public/                 # Static assets
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Documentation

For more detailed documentation, visit the [ShadPanel repository](https://github.com/kristiansnts/shadpanel).

## License

MIT

## Support

For issues, questions, or contributions, please visit our [GitHub repository](https://github.com/kristiansnts/shadpanel).
