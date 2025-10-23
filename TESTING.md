# Testing ShadPanel CLI Locally

This guide explains how to test the ShadPanel CLI tool locally before publishing to NPM.

## Prerequisites

- Node.js 18.0.0 or higher
- pnpm (or npm/yarn)

## Quick Start

### 1. Build the CLI

```bash
cd /Users/rpay/Documents/nextonel
pnpm run build:cli
```

This creates `dist/cli.mjs` which is the executable CLI tool.

### 2. Test Locally with npm link

The **recommended** way to test:

```bash
# In the shadpanel project directory
npm link

# Now you can use it anywhere
shadpanel --version
shadpanel --help

# Try the init command
cd ~/Desktop
mkdir my-test-project
cd my-test-project
shadpanel init

# When done testing, unlink
npm unlink -g shadpanel
```

## Testing Methods

### Method 1: npm link (Recommended for Development)

**Best for:** Iterative testing and development

```bash
# One-time setup
cd /Users/rpay/Documents/nextonel
pnpm run build:cli
npm link

# Use anywhere
cd ~/Desktop
shadpanel init my-admin-panel

# Make changes, rebuild, test again
cd /Users/rpay/Documents/nextonel
pnpm run build:cli
# No need to link again, changes are live

# Cleanup
npm unlink -g shadpanel
```

**Pros:**
- ✅ Fast iteration
- ✅ Simulates real npx behavior
- ✅ No need to re-link after rebuilding

**Cons:**
- ⚠️ Remember to unlink when done

### Method 2: Test with Local Package

**Best for:** Testing the final package before publishing

```bash
# 1. Pack the package
cd /Users/rpay/Documents/nextonel
pnpm run build:cli
npm pack

# This creates: shadpanel-0.1.0.tgz

# 2. Test in another directory
cd ~/Desktop
mkdir test-shadpanel
cd test-shadpanel

# 3. Run npx with the local package
npx /Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz init

# Or install globally
npm install -g /Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz
shadpanel init

# Cleanup
npm uninstall -g shadpanel
```

**Pros:**
- ✅ Most realistic test (exactly like npx)
- ✅ Tests the entire package including files array

**Cons:**
- ⚠️ Need to repack after every change

### Method 3: Direct Execution with tsx

**Best for:** Quick debugging during development

```bash
cd /Users/rpay/Documents/nextonel

# Run directly without building
npx tsx cli/index.ts --version
npx tsx cli/index.ts init ../test-project
```

**Pros:**
- ✅ No build step needed
- ✅ Fast for debugging

**Cons:**
- ⚠️ Doesn't test the built output
- ⚠️ Requires tsx to be installed

### Method 4: Test Script

**Best for:** Automated testing

Use the included test script:

```bash
cd /Users/rpay/Documents/nextonel
./test-cli.sh
```

This will:
1. Create a test directory
2. Run the CLI
3. Verify generated files
4. Report success/failure

## Troubleshooting

### Error: Command not found

Make sure you've linked the package:
```bash
npm link
```

### Error: Module not found

Rebuild the CLI:
```bash
pnpm run build:cli
```

### Error: Permission denied

Make the CLI executable:
```bash
chmod +x dist/cli.mjs
```

### Testing After Changes

After making changes to the CLI code:

```bash
# 1. Rebuild
pnpm run build:cli

# 2. Test (if using npm link, no need to relink)
shadpanel init test-project

# OR pack and test
npm pack
npx ./shadpanel-0.1.0.tgz init test-project
```

## What to Test

### Basic Functionality
- [ ] `shadpanel --version` shows correct version
- [ ] `shadpanel --help` shows help text
- [ ] `shadpanel init` prompts for configuration
- [ ] Generated project has correct structure
- [ ] Generated project runs (`npm install && npm run dev`)

### Edge Cases
- [ ] Init in current directory (`.`)
- [ ] Init with project name argument
- [ ] Init with existing directory
- [ ] Init without Git
- [ ] Init with different package managers (npm, pnpm, yarn)

### Authentication Options
- [ ] Init with all auth providers
- [ ] Init with no auth
- [ ] Init with only Google
- [ ] Init with only GitHub
- [ ] Init with only credentials

## Pre-Publishing Checklist

Before running `npm publish`:

- [ ] Build the CLI: `pnpm run build:cli`
- [ ] Verify dist/ directory exists
- [ ] Test with npm link
- [ ] Test with packed tarball
- [ ] Verify package.json version is correct
- [ ] Verify README.md is up to date
- [ ] Run generated project to ensure it works
- [ ] Check that templates/ directory is included
- [ ] Check that components/ directory is included

## Publishing

When ready to publish:

```bash
# 1. Update version
npm version patch  # or minor, or major

# 2. Build CLI
pnpm run build:cli

# 3. Test one more time
npm pack
npx ./shadpanel-0.1.0.tgz init final-test

# 4. Publish
npm login
npm publish

# 5. Test published version
npm unlink -g shadpanel  # if linked
npx shadpanel@latest init test-from-npm
```

## Current Status

✅ CLI builds successfully
✅ CLI runs with `npm link`
✅ Commands work (--version, --help, init)
✅ Package.json configured correctly
✅ Shebang added to built file

**You can now test locally with `npm link` or `npm pack`!**
