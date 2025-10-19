import { defineConfig } from "tsup"

/**
 * tsup build configuration for ShadPanel package
 *
 * This configuration builds the package for distribution:
 * - ESM and CJS formats for maximum compatibility
 * - TypeScript declarations (.d.ts files)
 * - Source maps for debugging
 * - Separate CLI entry point for npx commands
 */
export default defineConfig([
  // Main package build
  {
    // Entry points
    entry: {
      index: "src/index.ts",
      "components/index": "src/components/index.ts",
    },

    // Output formats
    format: ["cjs", "esm"],

    // Generate TypeScript declarations
    dts: {
      resolve: true,
    },

    // Use separate tsconfig for build
    tsconfig: "tsconfig.build.json",

    // Don't split chunks
    splitting: false,

    // Generate source maps
    sourcemap: true,

    // Clean dist folder before build
    clean: true,

    // External dependencies (peer dependencies)
    external: [
      "react",
      "react-dom",
      "next",
      "sonner",
      "next-themes",
      "next-auth",
    ],

    // Target environment
    target: "es2017",

    // Bundle dependencies
    noExternal: [
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-icons",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
      "@tanstack/react-table",
      "class-variance-authority",
      "clsx",
      "date-fns",
      "lucide-react",
      "react-day-picker",
      "tailwind-merge",
    ],
  },
  // CLI build
  {
    entry: {
      cli: "cli/index.ts",
    },
    format: ["cjs"],
    dts: false,
    sourcemap: false,
    clean: false,
    target: "node18",
    bundle: true,
    // Add shebang for CLI executable
    banner: {
      js: "#!/usr/bin/env node",
    },
  },
])
