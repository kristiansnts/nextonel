# Local Tarball Installation Fix

**Date**: 2025-10-18
**Issue**: `npx shadpanel init` fails because it tries to install `shadpanel@0.1.0` from NPM registry
**Status**: ✅ FIXED

---

## Problem Description

When running `npx shadpanel init`, the CLI was failing during dependency installation with an error like:

```
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/shadpanel/-/shadpanel-0.1.0.tgz
```

### Root Cause

1. **Template**: [templates/config/package.json.template:35](templates/config/package.json.template#L35) contains:
   ```json
   "shadpanel": "{{SHADPANEL_VERSION}}"
   ```

2. **CLI Processing**: [cli/commands/init.ts:63](cli/commands/init.ts#L63) replaces `{{SHADPANEL_VERSION}}` with `packageJson.version` (which is `0.1.0`)

3. **Resulting package.json**:
   ```json
   "shadpanel": "0.1.0"
   ```

4. **Installation**: When `npm install` runs, it tries to fetch `shadpanel@0.1.0` from the NPM registry

5. **Failure**: The package doesn't exist on NPM yet (only as a local `.tgz` file)

---

## Solution

Replace the `shadpanel` version in the generated `package.json` with a `file:` reference to the local tarball before running `npm install`.

### Changes Made

#### 1. Updated `cli/utils/dependencies.ts`

Added `localTarballPath` option to `updatePackageJson()`:

```typescript
export async function updatePackageJson(
  projectDir: string,
  options: {
    authentication: boolean
    shadpanelVersion: string
    localTarballPath?: string  // ← NEW
  }
): Promise<void> {
  const packageJsonPath = path.join(projectDir, "package.json")
  const packageJson = await fs.readJson(packageJsonPath)

  if (options.authentication) {
    packageJson.dependencies["next-auth"] = "^4.24.11"
  }

  // ← NEW: Replace shadpanel version with file path if local tarball exists
  if (options.localTarballPath && await fs.pathExists(options.localTarballPath)) {
    packageJson.dependencies["shadpanel"] = `file:${options.localTarballPath}`
  }

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
}
```

#### 2. Updated `cli/commands/init.ts`

Pass the local tarball path to `updatePackageJson()`:

```typescript
// Get path to local tarball for development/testing
const localTarball = path.resolve(__dirname, "../../shadpanel-0.1.0.tgz")

// Step 7: Update package.json with conditional dependencies
await updatePackageJson(targetDir, {
  authentication: answers.authentication,
  shadpanelVersion: packageJson.version,
  localTarballPath: localTarball,  // ← NEW
})

// Step 8: Install dependencies (now works correctly)
await installDependencies(targetDir, answers.packageManager)
```

---

## How It Works Now

### Before the Fix

```json
{
  "dependencies": {
    "shadpanel": "0.1.0"  // ← Tries to fetch from NPM registry
  }
}
```

```bash
npm install
# → npm ERR! 404 Not Found - GET https://registry.npmjs.org/shadpanel/-/shadpanel-0.1.0.tgz
```

### After the Fix

```json
{
  "dependencies": {
    "shadpanel": "file:/Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz"  // ← Uses local file
  }
}
```

```bash
npm install
# → Successfully installs from local tarball ✅
```

---

## Testing the Fix

### 1. Rebuild the package

```bash
pnpm build:package
npm pack
```

This creates `shadpanel-0.1.0.tgz` with the updated CLI.

### 2. Test the CLI

```bash
cd /tmp
mkdir test-project
cd test-project
node /Users/rpay/Documents/nextonel/dist/cli.js init
```

### 3. Verify the generated package.json

```bash
cat package.json | grep shadpanel
```

Should output:
```json
"shadpanel": "file:/Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz",
```

### 4. Verify installation

```bash
npm install  # or pnpm install, yarn install, bun install
```

Should complete successfully without NPM registry errors.

---

## Future Considerations

### For Production (Published NPM Package)

When the package is published to NPM, we should:

1. **Check if running from NPM**: Detect if the CLI is being run via `npx shadpanel` from the registry
2. **Use registry version**: If published, use the actual version number instead of the local tarball
3. **Fall back to local**: Only use local tarball for development/testing

```typescript
// Detect if running from NPM or local
const isPublished = !await fs.pathExists(localTarball)

await updatePackageJson(targetDir, {
  authentication: answers.authentication,
  shadpanelVersion: packageJson.version,
  localTarballPath: isPublished ? undefined : localTarball,
})
```

### For Development

Keep the current implementation:
- Always use local tarball during development
- Ensures latest changes are tested
- No need to publish to NPM for testing

---

## Related Files

- [cli/commands/init.ts](../cli/commands/init.ts) - Main init command
- [cli/utils/dependencies.ts](../cli/utils/dependencies.ts) - Package management utilities
- [templates/config/package.json.template](../templates/config/package.json.template) - Template with `{{SHADPANEL_VERSION}}` placeholder
- [package.json](../package.json) - Package metadata with version number
- [shadpanel-0.1.0.tgz](../shadpanel-0.1.0.tgz) - Local tarball used for installation

---

## Benefits

✅ **Works Offline**: No need for NPM registry during development
✅ **Tests Latest Code**: Always uses the local build
✅ **Faster Iteration**: No need to publish to test changes
✅ **Clear Error Messages**: Package manager errors are more meaningful
✅ **Consistent Installs**: Same tarball used across all package managers

---

## Summary

The fix ensures that during development, `npx shadpanel init` uses the local `.tgz` file instead of trying to fetch from the NPM registry. This is achieved by:

1. Detecting the local tarball path
2. Replacing the `shadpanel` version in `package.json` with a `file:` reference
3. Allowing the package manager to install from the local file

Once the package is published to NPM, we can add logic to detect if it's running from the registry and use the actual version number instead.
