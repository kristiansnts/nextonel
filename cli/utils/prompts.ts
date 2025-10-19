import prompts from "prompts"
import path from "path"
import fs from "fs-extra"

export type InstallationType = "full-panel" | "auth-components" | "components-only"

export interface InitAnswers {
  installationType: InstallationType
  projectName: string
  packageManager: "npm" | "pnpm" | "yarn" | "bun"
  typescript: boolean
  authentication: boolean
  authProviders: string[]
  demos: boolean
  demoTypes: string[]
  customTheme: boolean
  initGit: boolean
}

export async function promptInitQuestions(
  initialProjectName?: string
): Promise<InitAnswers | null> {
  const defaultProjectName = initialProjectName || "my-admin-panel"

  const questions = [
    {
      type: "select" as const,
      name: "installationType",
      message: "What do you want to install?",
      choices: [
        {
          title: "Full Panel with Auth (Recommended for fresh Next.js installation)",
          value: "full-panel",
          description: "Complete admin panel with authentication, sidebar, and demo pages"
        },
        {
          title: "Auth + Components",
          value: "auth-components",
          description: "Authentication system + UI components without full panel structure"
        },
        {
          title: "Components Only",
          value: "components-only",
          description: "Just the UI components (Form Builder, Data Table, etc.)"
        },
      ],
      initial: 0,
    },
    {
      type: "text" as const,
      name: "projectName",
      message: (prev: any, answers: any) => {
        // Different message based on installation type
        if (answers.installationType === "full-panel") {
          return "What is your project name?"
        } else {
          return "What is your project name? (use '.' for current directory)"
        }
      },
      initial: (prev: any, answers: any) => {
        // Suggest current directory for non-full-panel installations
        return answers.installationType === "full-panel" ? defaultProjectName : "."
      },
      validate: (value: string, answers: any) => {
        if (!value) return "Project name is required"
        if (value.includes(" ")) return "Project name cannot contain spaces"

        // Allow current directory (.) for components-only and auth-components
        if (value === ".") {
          // Check if answers exists and has installationType
          if (answers && answers.installationType) {
            if (answers.installationType === "components-only" || answers.installationType === "auth-components") {
              return true
            } else {
              return "Cannot install full panel in current directory. Please specify a new directory name."
            }
          }
          // If answers not available yet, allow it for now (will be validated later if needed)
          return true
        }

        // Check if directory exists (for new directories)
        if (fs.existsSync(path.resolve(process.cwd(), value))) {
          return `Directory "${value}" already exists`
        }
        return true
      },
    },
    {
      type: "select" as const,
      name: "packageManager",
      message: "Which package manager do you want to use?",
      choices: [
        { title: "pnpm", value: "pnpm" },
        { title: "npm", value: "npm" },
        { title: "yarn", value: "yarn" },
        { title: "bun", value: "bun" },
      ],
      initial: 0,
    },
    {
      type: "confirm" as const,
      name: "typescript",
      message: "Do you want to use TypeScript?",
      initial: true,
    },
    {
      type: (prev: any, answers: any) => {
        // Only ask for auth if not full-panel (full-panel includes auth by default)
        return answers.installationType === "full-panel" ? null : "confirm"
      },
      name: "authentication",
      message: "Do you want to include authentication (NextAuth.js)?",
      initial: (prev: any, answers: any) => answers.installationType === "auth-components",
    },
    {
      type: (prev: any, answers: any) => {
        // Show auth providers if:
        // 1. Full panel (always has auth)
        // 2. Auth-components (always has auth)
        // 3. Components-only AND user chose to add auth
        const showAuthProviders =
          answers.installationType === "full-panel" ||
          answers.installationType === "auth-components" ||
          (answers.installationType === "components-only" && answers.authentication)
        return showAuthProviders ? "multiselect" : null
      },
      name: "authProviders",
      message: "Which authentication providers do you want?",
      choices: [
        { title: "Email/Password (Credentials)", value: "credentials", selected: true },
        { title: "Google OAuth", value: "google" },
        { title: "GitHub OAuth", value: "github" },
      ],
      hint: "Space to select. Return to submit",
      instructions: false,
    },
    {
      type: (prev: any, answers: any) => {
        // Only show demos option for full-panel
        return answers.installationType === "full-panel" ? "confirm" : null
      },
      name: "demos",
      message: "Do you want to include demo pages?",
      initial: true,
    },
    {
      type: (prev: boolean, answers: any) => {
        return prev && answers.installationType === "full-panel" ? "multiselect" : null
      },
      name: "demoTypes",
      message: "Which demos do you want to include?",
      choices: [
        { title: "Form Builder Demo", value: "form", selected: true },
        { title: "Data Table Demo", value: "table", selected: true },
        { title: "Notification Demo", value: "notification", selected: true },
      ],
      hint: "Space to select. Return to submit",
      instructions: false,
    },
    {
      type: "confirm" as const,
      name: "customTheme",
      message: "Do you want to customize the theme?",
      initial: false,
    },
    {
      type: "confirm" as const,
      name: "initGit",
      message: "Initialize a git repository?",
      initial: true,
    },
  ]

  try {
    const answers = await prompts(questions, {
      onCancel: () => {
        throw new Error("User cancelled the operation")
      },
    })

    // Post-validation: Ensure full-panel is not installed in current directory
    if (answers.installationType === "full-panel" && answers.projectName === ".") {
      console.error("\nError: Cannot install full panel in current directory. Please specify a new directory name.")
      process.exit(1)
    }

    // Set authentication based on installation type
    if (answers.installationType === "full-panel" || answers.installationType === "auth-components") {
      answers.authentication = true
    }

    // Set demos based on installation type
    if (answers.installationType === "full-panel" && answers.demos === undefined) {
      answers.demos = true
    }

    // Set defaults for conditional questions if not answered
    if (!answers.authProviders) {
      answers.authProviders = []
    }
    if (!answers.demoTypes) {
      answers.demoTypes = []
    }

    return answers as InitAnswers
  } catch (error) {
    return null
  }
}

export async function promptAppName(): Promise<string> {
  const answer = await prompts({
    type: "text",
    name: "appName",
    message: "What is your application name?",
    initial: "My Admin Panel",
  })

  return answer.appName || "My Admin Panel"
}
